import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useLocation, navigate } from '@reach/router';
import {
  useStrengthState,
  useStrengthActions,
  useExerciseActions,
  useExerciseState,
  Strength,
  Status,
  useTranslation,
} from 'positive-store';

import MenuBar from './MenuBar';
import ExerciseMenu from './ExerciseMenu';
import ExerciseSlides from './ExerciseSlides';
import TeacherGuide from './TeacherGuide';
import Controls from './Controls';

import { AboveBreakpoint, BelowBreakpoint } from 'components/MediaQueries';
import MenuLabel from 'components/Dropdown/MenuLabel';
import Panel from 'components/Panel';
import { SpinnerView } from 'components/Spinner';

import { useToast } from 'context/ToastContext';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { breakpoint, color, spacing } from 'theme';
import { StrengthSlug } from '../../../../positive-store/dist';

const TeachExercise: React.FunctionComponent = () => {
  const slidesContainerRef = useRef<HTMLElement>();
  const fullscreen = useFullScreenHandle();
  const isMobileBreakpoint = useMobileBreakpoint('md');
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { addToast } = useToast();

  const [showMenu, setShowMenu] = useState<boolean>(!isMobileBreakpoint);
  const [showGuide, setShowGuide] = useState<boolean>(!isMobileBreakpoint);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const { activeStrength, strengths, xmasCalendar, positiveCV } = useStrengthState();
  const { setActiveStrengthSlug } = useStrengthActions();
  const { status, activeExercise, exercises, exerciseSections } = useExerciseState();
  const { fetchExercises, setActiveExerciseSlug } = useExerciseActions();

  const [requestedAudienceSlug, requestedStrengthSlug, requestedExerciseSlug] = pathname
    .substr(1)
    .split('/')
    .slice(1, 4);

  useEffect(() => {
    if (!strengths.length) return;

    let requestedStrength: Strength | undefined;

    if (requestedStrengthSlug === 'xmas-calendar') {
      if (!xmasCalendar) return;

      requestedStrength = xmasCalendar;
    } else if (requestedStrengthSlug === 'positive-cv') {
      if (!positiveCV) return;

      requestedStrength = positiveCV;
    } else {
      requestedStrength = strengths.find(
        ({ slug }: { slug: StrengthSlug }) => slug === requestedStrengthSlug
      );
    }

    if (!requestedStrength || requestedStrength.numExercises === 0) {
      navigate('/teach');
      addToast(t('app.errors.content_unavailable'), true);
      return;
    }

    if (requestedStrength && (!activeStrength || activeStrength.slug !== requestedStrengthSlug)) {
      setActiveStrengthSlug(requestedStrength.slug);
    }
  }, [
    strengths,
    xmasCalendar,
    positiveCV,
    requestedStrengthSlug,
    setActiveStrengthSlug,
    addToast,
    navigate,
  ]);

  useEffect(() => {
    if (!activeStrength) return;
    fetchExercises({ strengthSlug: activeStrength.slug });
  }, [activeStrength, fetchExercises]);

  useEffect(() => {
    if (!exercises.length) return;

    const requestedExercise = exercises.find(
      ({ slug }: { slug: string }) => slug === requestedExerciseSlug
    );

    if (requestedExercise) {
      setActiveExerciseSlug(requestedExercise.slug);
    } else {
      navigate(
        `/teach/${requestedAudienceSlug}/${requestedStrengthSlug}/${exerciseSections[0].exercises[0].slug}`,
        { replace: true }
      );

      if (requestedExerciseSlug) {
        addToast(t('app.errors.content_unavailable'), true);
      }
    }
  }, [
    exercises,
    exerciseSections,
    requestedAudienceSlug,
    requestedStrengthSlug,
    requestedExerciseSlug,
    setActiveExerciseSlug,
    addToast,
    navigate,
  ]);

  useEffect(() => {
    if (!activeExercise) return;
    setSlideIndex(0);
  }, [activeExercise, setSlideIndex]);

  useEffect(() => {
    setShowGuide(!isMobileBreakpoint);
    setShowMenu(!isMobileBreakpoint);
  }, [isMobileBreakpoint, setShowMenu, setShowGuide]);

  return status.fetchExercises === Status.loading || !activeStrength || !activeExercise ? (
    <SpinnerView />
  ) : (
    <Fragment>
      <Helmet>
        <title>{`${activeStrength.name} | Positive`}</title>
      </Helmet>

      <MenuBar />

      <BelowBreakpoint breakpoint="md">
        <MobileBar>
          <MenuLabel label={activeExercise.title} color="green" onClick={() => setShowMenu(true)} />
        </MobileBar>

        <Panel.Container
          id="exercise-menu-modal"
          isOpen={showMenu}
          close={() => setShowMenu(false)}
        >
          <Panel.Header title={t('route.teach.exercises')} />
          <StyledContent>
            <ExerciseMenu isOpen={showMenu} onClick={() => setShowMenu(false)} />
          </StyledContent>
        </Panel.Container>
      </BelowBreakpoint>

      <ExerciseContainer>
        <AboveBreakpoint breakpoint="md">
          <ExerciseMenu isOpen={showMenu} />
        </AboveBreakpoint>

        <FullScreen handle={fullscreen} onChange={() => setIsFullscreen(!isFullscreen)}>
          <SlidesContainer ref={slidesContainerRef}>
            <ExerciseSlides
              containerRef={slidesContainerRef}
              slides={activeExercise?.slides}
              slideIndex={slideIndex}
              fullScreen={isFullscreen}
            />
            <Controls
              toggleMenu={() => setShowMenu(!showMenu)}
              isMenuOpen={showMenu}
              isGuideOpen={showGuide}
              toggleTeacherGuide={() => setShowGuide(!showGuide)}
              slideIndex={slideIndex}
              totalSlides={
                activeExercise?.showCover
                  ? activeExercise?.slides.length + 1
                  : activeExercise?.slides.length
              }
              changeSlide={setSlideIndex}
              isFullscreen={isFullscreen}
              toggleFullscreen={() => (isFullscreen ? fullscreen.enter() : fullscreen.exit())}
            />
            <ProgressBar
              progress={
                activeExercise?.showCover
                  ? slideIndex / activeExercise?.slides.length
                  : slideIndex / (activeExercise?.slides.length - 1)
              }
            />
          </SlidesContainer>
        </FullScreen>

        <BelowBreakpoint breakpoint="md">
          <Panel.Container
            id="teacher-guide-modal"
            isOpen={showGuide}
            close={() => setShowGuide(false)}
          >
            <Panel.Header title={t('route.teach.teacher_guide')} />
            <StyledContent>
              <TeacherGuide isOpen={showGuide} />
            </StyledContent>
          </Panel.Container>
        </BelowBreakpoint>

        <AboveBreakpoint breakpoint="md">
          <TeacherGuide isOpen={showGuide} />
        </AboveBreakpoint>
      </ExerciseContainer>
    </Fragment>
  );
};

const ExerciseContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  height: calc(100% - calc(${spacing('navbar')} * 3));
  position: relative;
  width: 100%;

  @supports (height: 100vh) {
    height: calc(100vh - calc(${spacing('navbar')} * 3));
  }

  @media (min-width: ${breakpoint('md')}) {
    grid-template-columns: min-content minmax(calc(100% - calc(280px + 360px)), 100%) min-content;
    height: calc(100% - calc(${spacing('navbar')} * 2));

    @supports (height: 100vh) {
      height: calc(100vh - calc(${spacing('navbar')} * 2));
    }
  }
`;

const SlidesContainer = styled.article<{ ref: any }>`
  background: ${color('backdropGrey')};
  display: grid;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  z-index: 1;

  @media (min-width: ${breakpoint('md')}) {
    background: ${color('white')};
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  background: ${color('green')};
  bottom: 0;
  height: ${spacing('sm')};
  left: 0;
  position: absolute;
  transition: width 0.5s cubic-bezier(0.7, 0, 0.3, 1);
  width: calc(${({ progress }) => progress} * 100%);
`;

const MobileBar = styled.div`
  align-items: center;
  background: ${color('white')};
  display: flex;
  height: ${spacing('navbar')};
  justify-content: center;
`;

const StyledContent = styled(Panel.Content)`
  padding: 0;
`;

export default TeachExercise;
