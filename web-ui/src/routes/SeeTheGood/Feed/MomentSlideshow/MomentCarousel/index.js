import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  CarouselProvider,
  Slide,
  Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// noinspection ES6UnusedImports
import styled from 'styled-components/macro';
import { useStrengthState, useMomentState } from 'positive-store';

import { apiBaseUrl } from 'config';
import Div from 'components/Div';
import Flex from 'components/Flex';
import IconButton from 'components/buttons/IconButton';
import MomentInfoBar from 'routes/SeeTheGood/Feed/MomentSlideshow/MomentInfoBar';
import StrengthImage from 'components/StrengthImage';
import useKeyDown from 'utils/useKeyDown';
import { Video } from 'components/Element';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

const BUTTON_CSS = `
            pointer-events: auto;
            transition: opacity 0.3s ease-in-out;

            &:disabled {
              opacity: 0;
              pointer-events: none;
            }
          `;

const CurrentSlideContext = React.createContext({});

const CurrentSlideProvider = ({ children }) => {
  const carouselContext = useContext(CarouselContext);

  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);

  useEffect(() => {
    const onChange = () => setCurrentSlide(carouselContext.state.currentSlide);
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <CurrentSlideContext.Provider value={{ currentSlide }}>{children}</CurrentSlideContext.Provider>
  );
};

const VideoPlayer = ({ src, paused, setPaused, ...props }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      paused && videoRef.current.pause();
      !paused && videoRef.current.play();
    }
  }, [paused]);

  return (
    <Flex center {...props}>
      <Video
        refKey={videoRef}
        full
        src={src}
        preload="metadata"
        outline="none"
        onEnded={() => setPaused(true)}
      />

      <Flex absolute top="0" full center onClick={() => setPaused(!paused)}>
        {paused && <IconButton iconName="play" large bold dark />}
      </Flex>
    </Flex>
  );
};

const CarouselSlide = ({
  width,
  height,
  moment,
  strength,
  index,
  infoIsVisible,
  isMobileBreakpoint,
}) => {
  const [videoIsPaused, setVideoIsPaused] = useState(true);

  const { currentSlide } = useContext(CurrentSlideContext);

  const isVisible = currentSlide > -1 && index < currentSlide + 2 && index > currentSlide - 2;

  useEffect(() => {
    if (currentSlide !== index) setVideoIsPaused(true);
  }, [currentSlide]);

  return (
    <Slide index={index}>
      {isVisible && (
        <Fragment>
          {moment.mediaUrl ? (
            <Fragment>
              {moment.mediaType === 'image' ? (
                <Div
                  absolute
                  top="0"
                  full
                  backgroundImage={`url(${apiBaseUrl}${moment.mediaUrl})`}
                  backgroundSize="contain"
                  backgroundPosition="center"
                  overflow="hidden"
                />
              ) : (
                <VideoPlayer
                  absolute
                  top="0"
                  full
                  src={moment.mediaUrl}
                  paused={videoIsPaused}
                  setPaused={setVideoIsPaused}
                />
              )}
            </Fragment>
          ) : (
            <Flex absolute full center backgroundColor={strength.color}>
              <StrengthImage
                slug={moment.strengthSlug}
                alt={moment.strengthSlug}
                sizes={`${Math.min(width, height)}px`}
                maxWidth="100%"
                maxHeight="100%"
              />
            </Flex>
          )}

          <MomentInfoBar
            isVisible={infoIsVisible}
            moment={moment}
            strength={strength}
            absolute
            bottom="0"
            maxHeight={isMobileBreakpoint ? '50%' : '40%'}
          />
        </Fragment>
      )}
    </Slide>
  );
};

const CarouselContent = ({ width, height, moments, onLoadMoreTrigger }) => {
  const [infoIsVisible, setInfoIsVisible] = useState(true);

  const { strengths } = useStrengthState();
  const carouselContext = useContext(CarouselContext);

  const { moreMomentsExist } = useMomentState();

  const isMobileBreakpoint = useMobileBreakpoint();

  const changeSlideIndex = delta => {
    const storeState = carouselContext.getStoreState();
    const nextSlide = Math.max(Math.min(storeState.currentSlide + delta, moments.length - 1), 0);

    carouselContext.setStoreState({
      ...storeState,
      currentSlide: nextSlide,
    });
  };

  useKeyDown(['ArrowRight', 'Space'], () => changeSlideIndex(1));
  useKeyDown(['ArrowLeft'], () => changeSlideIndex(-1));

  useEffect(() => {
    const onChange = () => {
      const momentIndex = carouselContext.state.currentSlide;
      const endIsReached = momentIndex === 0;

      if (endIsReached && moreMomentsExist) {
        carouselContext.unsubscribe(onChange);
        onLoadMoreTrigger({
          momentID: moments[carouselContext.state.currentSlide].id,
        });
      }
    };
    carouselContext.subscribe(onChange);

    return () => carouselContext.unsubscribe(onChange);
  }, [moments]);

  return (
    <>
      <Slider>
        <CurrentSlideProvider>
          {moments.map((moment, index) => {
            const strength = strengths.find(s => s.slug === moment.strengthSlug);

            return (
              <CarouselSlide
                key={moment.id}
                width={width}
                height={height}
                moment={moment}
                strength={strength}
                index={index}
                infoIsVisible={infoIsVisible}
                isMobileBreakpoint={isMobileBreakpoint}
              />
            );
          })}
        </CurrentSlideProvider>
      </Slider>

      {!isMobileBreakpoint && (
        <Flex
          absolute
          top="0"
          right="lg"
          bottom="0"
          left="lg"
          alignCenter
          justifyContent="space-between"
          pointerEvents="none"
        >
          <ButtonBack css={BUTTON_CSS}>
            <IconButton tagName="div" type={null} iconName="chevronLeft" dark={true} />
          </ButtonBack>

          <ButtonNext css={BUTTON_CSS}>
            <IconButton tagName="div" type={null} iconName="chevronRight" dark={true} />
          </ButtonNext>
        </Flex>
      )}

      <IconButton
        absolute
        bottom="lg"
        right="lg"
        iconName="info"
        primary
        dark={!infoIsVisible}
        onClick={() => {
          setInfoIsVisible(!infoIsVisible);
        }}
      />
    </>
  );
};

const MomentCarousel = ({ width, height, moments, initialMomentIndex = 0, onLoadMoreTrigger }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={width}
      naturalSlideHeight={height}
      totalSlides={moments.length}
      currentSlide={initialMomentIndex}
    >
      <CarouselContent
        width={width}
        height={height}
        moments={moments}
        onLoadMoreTrigger={onLoadMoreTrigger}
      />
    </CarouselProvider>
  );
};

export default MomentCarousel;
