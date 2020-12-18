import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import Icon from 'components/Icon';
import Flex from 'components/Flex';
import Text from 'components/Text';
import ScreenReaderText from 'components/ScreenReaderText';

import useKeyDown from 'utils/useKeyDown';
import { color, font, fontSize, spacing } from 'theme';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  isMenuOpen: boolean;
  isGuideOpen: boolean;
  slideIndex: number;
  totalSlides: number;
  isFullscreen: boolean;
  toggleMenu: () => void;
  toggleTeacherGuide: () => void;
  toggleFullscreen: () => void;
  changeSlide: (num: number) => void;
}

const Controls: React.FunctionComponent<Props> = ({
  isMenuOpen,
  isGuideOpen,
  slideIndex,
  totalSlides,
  isFullscreen,
  toggleMenu,
  toggleTeacherGuide,
  toggleFullscreen,
  changeSlide,
}) => {
  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();

  useKeyDown(
    ['ArrowRight', 'Space'],
    () => slideIndex !== totalSlides - 1 && changeSlide(slideIndex + 1)
  );
  useKeyDown(['ArrowLeft'], () => slideIndex > 0 && changeSlide(slideIndex - 1));

  return (
    <Container>
      {isFullscreen ? (
        <ControlButton
          onClick={() => {
            trackEvent({
              category: 'Teach Exercise',
              action: `${isMenuOpen ? 'Hide' : 'Open'} exercise menu`,
            });
            toggleMenu();
          }}
          aria-controls="exercise-menu"
        >
          <Icon
            name="hamburgerMenu"
            color="white"
            size="18px"
            alt={t(`route.teach.exercise_controls.exercise_menu.${isMenuOpen ? 'hide' : 'show'}`)}
          />
        </ControlButton>
      ) : (
        <div />
      )}
      <Flex center>
        <NavContainer center>
          <ControlButton
            disabled={slideIndex === 0}
            onClick={() => {
              trackEvent({
                category: 'Teach Exercise',
                action: 'Click previous slide',
              });
              changeSlide(slideIndex - 1);
            }}
          >
            <Icon
              name="chevronLeft"
              color="white"
              size="18px"
              alt={t('route.teach.exercise_controls.slide.previous')}
            />
          </ControlButton>
          <SlideCount as="p">
            <ScreenReaderText>{t('route.teach.exercise_controls.slide.progress')}</ScreenReaderText>
            {slideIndex + 1}/{totalSlides ? totalSlides : '-'}
          </SlideCount>
          <ControlButton
            disabled={slideIndex === totalSlides - 1}
            onClick={() => {
              trackEvent({
                category: 'Teach Exercise',
                action: 'Click next slide',
              });
              changeSlide(slideIndex + 1);
            }}
          >
            <Icon
              name="chevronRight"
              color="white"
              size="18px"
              alt={t('route.teach.exercise_controls.slide.next')}
            />
          </ControlButton>
        </NavContainer>
        <ControlButton
          onClick={() => {
            trackEvent({
              category: 'Teach Exercise',
              action: `${isFullscreen ? 'Enter' : 'Exit'} fullscreen`,
            });
            toggleFullscreen();
          }}
        >
          <Icon
            name={isFullscreen ? 'fullscreenEnter' : 'fullscreenExit'}
            color="white"
            size="18px"
            alt={t(`route.teach.exercise_controls.fullscreen.${isFullscreen ? 'enter' : 'exit'}`)}
          />
        </ControlButton>
      </Flex>
      {isFullscreen ? (
        <ControlButton
          onClick={() => {
            trackEvent({
              category: 'Teach Exercise',
              action: `${isGuideOpen ? 'Hide' : 'Open'} teacher guide`,
            });
            toggleTeacherGuide();
          }}
          aria-controls="teacher-guide"
        >
          <Icon
            name="learn"
            color="white"
            size="18px"
            alt={t(`route.teach.exercise_controls.teacher_guide.${isGuideOpen ? 'hide' : 'show'}`)}
          />
        </ControlButton>
      ) : (
        <div />
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  bottom: ${spacing('md')};
  display: flex;
  height: 38px;
  left: 0;
  justify-content: space-between;
  padding: 0 ${spacing('md')};
  position: absolute;
  width: 100%;
`;

const ControlButton = styled.button<{ isHidden?: boolean }>`
  align-items: center;
  background: ${color('green')};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 38px;
  width: 38px;

  &:hover,
  &:focus {
    background: ${color('hoverGreen')};
  }

  &:active {
    transform: scale(0.9);

    &:disabled {
      transform: none;
    }
  }

  &:disabled {
    background: ${color('lightGreen')};
    cursor: not-allowed;
  }
`;

const NavContainer = styled(Flex)`
  margin-right: ${spacing('md')};
`;

const SlideCount = styled(Text)`
  color: ${color('activeGrey')};
  font-family: ${font('bold')};
  font-size: ${fontSize('sm')};
  letter-spacing: 3px;
  margin: 0 ${spacing('md')};
  min-width: 40px;
  text-align: center;
`;

export default Controls;
