import React, { useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { FocusOn } from 'react-focus-on';

import Portal from 'components/Portal';
import Backdrop from './Backdrop';

import { breakpoint, color } from 'theme';

enum DIRECTIONS {
  LEFT = 'left',
  RIGHT = 'right',
}

type Directions = DIRECTIONS.LEFT | DIRECTIONS.RIGHT;

interface Props {
  id: string;
  isOpen: boolean;
  transitionDuration?: number;
  slideFrom?: Directions;
  fullscreen?: boolean;
  dataTestId?: string;
  close: () => void;
}

const PanelContainer: React.FC<Props> = ({
  id,
  isOpen,
  transitionDuration = 400,
  slideFrom = DIRECTIONS.RIGHT,
  fullscreen = false,
  dataTestId,
  close,
  children,
}) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <Portal id={id}>
      <Backdrop
        forwardRef={backdropRef}
        isShown={isOpen}
        transitionDuration={transitionDuration}
        close={close}
      />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        nodeRef={sliderRef}
        in={isOpen}
        classNames="slider"
        timeout={transitionDuration}
      >
        <SlidingWrapper
          data-test-id={dataTestId}
          ref={sliderRef}
          fullscreen={fullscreen}
          slideFrom={slideFrom}
          timeout={transitionDuration}
        >
          <StyledFocusOn onEscapeKey={close} shards={[backdropRef]}>
            <SliderGrid role="dialog">
              {React.Children.map(children as React.ReactElement[], function(
                child: React.ReactElement
              ) {
                return child && React.cloneElement(child, { close });
              })}
            </SliderGrid>
          </StyledFocusOn>
        </SlidingWrapper>
      </CSSTransition>
    </Portal>
  );
};

const SlidingWrapper = styled.div<{ timeout: number; slideFrom: Directions; fullscreen: boolean }>`
  --transformValue: ${({ slideFrom }) => (slideFrom === DIRECTIONS.LEFT ? '-100%' : '100%')};

  bottom: 0;
  height: 100%;
  left: ${({ slideFrom }) => (slideFrom === DIRECTIONS.LEFT ? 0 : undefined)};
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  position: fixed;
  right: ${({ slideFrom }) => (slideFrom === DIRECTIONS.RIGHT ? 0 : undefined)};
  top: 0;
  transition: transform ${({ timeout }) => timeout}ms ease;
  will-change: transform;
  width: 100%;

  &.slider-appear,
  &.slider-enter,
  &.slider-exit-done {
    transform: translateX(var(--transformValue));
  }

  &.slider-appear-active,
  &.slider-enter-active {
    transform: translateX(0%);
  }
  &.slider-appear-done,
  &.slider-enter-done,
  &.slider-exit {
    transform: translateX(0%);
  }
  &.slider-exit-active {
    transform: translateX(var(--transformValue));
  }

  @media (min-width: ${breakpoint('sm')}) {
    min-width: ${({ fullscreen }) => (fullscreen ? '100%' : '400px')};
    width: ${({ fullscreen }) => (fullscreen ? '100%' : '480px')};
  }

  @media (prefers-reduced-motion) {
    transition: none;
  }
`;

const StyledFocusOn = styled(FocusOn)`
  height: 100%;
`;

const SliderGrid = styled.aside`
  background: ${color('backdropGrey')};
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: min-content minmax(0, 1fr) min-content; // minmax needed for Safari bug
  height: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  transform: translateY(0);
  width: 100%;
`;

export default PanelContainer;
