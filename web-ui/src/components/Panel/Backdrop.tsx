import React, { RefObject } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

interface StyledProps {
  isShown: boolean;
  opacity?: number;
  transitionDuration?: number;
}

interface Props extends StyledProps {
  forwardRef: RefObject<HTMLDivElement>;
  close?: () => void;
  onMount?: () => void;
  onTransitionEnd?: () => void;
}

const Backdrop: React.FunctionComponent<Props> = ({
  forwardRef,
  isShown,
  opacity = 0.4,
  transitionDuration = 400,
  close,
  onMount,
  onTransitionEnd,
}) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      nodeRef={forwardRef}
      in={isShown}
      classNames="backdrop"
      timeout={transitionDuration}
      onEnter={onMount}
      onExited={onTransitionEnd}
    >
      <StyledBackdrop
        ref={forwardRef}
        isShown={isShown}
        opacity={opacity}
        transitionDuration={transitionDuration}
        onClick={close}
      />
    </CSSTransition>
  );
};

const StyledBackdrop = styled.div<StyledProps>`
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  left: 0;
  min-height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;

  &.backdrop-appear,
  &.backdrop-enter,
  &.backdrop-exit-done {
    opacity: 0;
  }

  &.backdrop-appear-active,
  &.backdrop-enter-active {
    opacity: 1;
    transition: opacity ${({ transitionDuration }) => transitionDuration}ms;
    will-change: opacity;
  }
  &.backdrop-appear-done,
  &.backdrop-enter-done,
  &.backdrop-exit {
    opacity: 1;
  }
  &.backdrop-exit-active {
    opacity: 0;
    transition: opacity ${({ transitionDuration }) => transitionDuration}ms;
    will-change: opacity;
  }
`;

export default Backdrop;
