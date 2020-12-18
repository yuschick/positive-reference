import React, { Fragment, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useComponentSize from '@rehooks/component-size';
import { useStrengthState, useExerciseState, useAudienceState, Slide } from 'positive-store';

import slidesToReactComponents from './slidesToReactComponents';

import Text from 'components/Text';
import Heading from 'components/Heading';
import Spinner from 'components/Spinner';

import { breakpoint, color, font, spacing } from 'theme';

interface Props {
  slides: Slide[];
  slideIndex: number;
  containerRef: any;
  fullScreen: boolean;
}

const SLIDESHOW_SIZE = { width: 1280, height: 800 };

const ExerciseSlides: React.FunctionComponent<Props> = ({
  slides: rawSlides = [],
  slideIndex,
  containerRef,
  fullScreen,
}) => {
  const containerSize = useComponentSize(containerRef);

  const [slides, setSlides] = useState<Slide[]>([]);

  const { activeStrength } = useStrengthState();
  const { activeExercise } = useExerciseState();
  const { activeAudience } = useAudienceState();

  const transform = useMemo(() => {
    const containerAspectRatio = containerSize.width / containerSize.height;
    const slideshowAspectRatio = SLIDESHOW_SIZE.width / SLIDESHOW_SIZE.height;

    const scale =
      containerAspectRatio < slideshowAspectRatio
        ? containerSize.width / SLIDESHOW_SIZE.width
        : containerSize.height / SLIDESHOW_SIZE.height;

    const scaleString = `scale(${scale > 1 ? 1 : scale}, ${scale > 1 ? 1 : scale})`;

    return scaleString;
  }, [containerSize]);

  useEffect(() => {
    if (!rawSlides.length || !activeExercise.slides) return;

    const coverComponent = (
      <Fragment>
        <Heading as="h3">{activeStrength.name}</Heading>
        <Heading as="h1">{activeExercise.title}</Heading>
        <Text as="p">{activeExercise.description}</Text>
      </Fragment>
    );

    const slideComponents = slidesToReactComponents(
      activeExercise.slides || [],
      activeAudience.slug
    );

    activeExercise.showCover && slideComponents.unshift(coverComponent);

    setSlides(slideComponents);
  }, [rawSlides]);

  return (
    <Container transform={transform} fullScreen={fullScreen}>
      {!slides?.length ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        slides[slideIndex]
      )}
    </Container>
  );
};

const SpinnerContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div<{ transform: string; fullScreen: boolean }>`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  height: ${({ fullScreen }) => (!fullScreen ? '100%' : `${SLIDESHOW_SIZE.height}px`)};
  justify-content: center;
  justify-self: center;
  max-height: 100%;
  max-width: 100%;
  padding: 94px 48px;
  position: relative;
  transform-origin: left center;
  width: ${({ fullScreen }) => (!fullScreen ? '100%' : `${SLIDESHOW_SIZE.width}px`)};

  transform: ${({ transform }) => transform};

  @media (max-width: ${breakpoint('md')}) {
    text-align: center;
  }

  > div:not(.right-half)::not(.left-half) {
    display: flex;
    flex: 1;
    flex-direction: column;
    grid-area: 1/1;
    justify-content: center;
    width: 100%;

    > div {
      overflow: hidden;
      /* 16:9 aspect ratio */
      padding-top: 56.25%;
      position: relative;

      iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    }
  }

  div[data-vimeo-initialized='true'] {
    iframe {
      height: ${({ fullScreen }) => (!fullScreen ? '100%' : `${SLIDESHOW_SIZE.height}px`)};
      width: ${({ fullScreen }) => (!fullScreen ? '100%' : `${SLIDESHOW_SIZE.width}px`)};
    }
  }

  h1,
  h2,
  h3,
  p,
  li,
  blockquote {
    color: ${color('black')};
  }

  h1,
  h2 {
    font-size: min(max(2.75rem, 3vw), 3.1111rem);
    text-transform: none;
    line-height: 1;

    @supports (font-size: clamp(1rem, 5vw, 1.5rem)) {
      font-size: clamp(2.75rem, 5vw, 3.1111rem);
    }
  }

  h1 {
    margin: ${spacing('md', 'none')};
  }

  h2,
  h3,
  p,
  ul,
  li,
  blockquote {
    margin: ${spacing('sm', 'none', 'sm', 'none')};
  }

  h3 {
    font-size: min(max(1.25rem, 5vw), 1.3333rem);
    letter-spacing: 0.035em;
    text-transform: uppercase;

    @supports (font-size: clamp(1rem, 5vw, 1.5rem)) {
      font-size: clamp(1.25rem, 5vw, 1.3333rem);
    }
  }

  p,
  a,
  li,
  blockquote {
    font-size: min(max(1.7778rem, 3vw), 2.15rem);
    line-height: 1.25;

    @supports (font-size: clamp(1rem, 5vw, 1.5rem)) {
      font-size: clamp(1.7778rem, 3vw, 2.15rem);
    }
  }

  p {
    white-space: pre-wrap;
  }

  a {
    color: ${color('green')};
    text-decoration: none;
    cursor: pointer;
  }

  li {
    text-align: left;
  }

  blockquote {
    font-family: ${font('italic')};
    font-style: italic;
  }

  img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  .background-image {
    left: 0;
    position: absolute;
    top: 0;
    z-index: -1;
  }

  .right-half,
  .left-half {
    height: 100%;
    margin-left: calc(50% + ${spacing('xl')});
    padding-left: ${spacing('xxl')};
    padding-right: ${spacing('lg')};
    text-align: center;
    width: 50%;
  }

  .left-half {
    margin-left: 0;
    margin-right: calc(50% + ${spacing('xl')});
    padding-left: ${spacing('lg')};
    padding-right: ${spacing('xxl')};
  }
`;

export default ExerciseSlides;
