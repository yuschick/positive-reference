import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';

import Portal from 'components/Portal';
import { toggleBodyElementClass } from 'utils/helpers';

const ModalContainer = ({
  id,
  isOpen,
  children,
  closeOnEscKey = true,
  backdropOpacity = 0.4,
  transitionDuration = 300,
  onCloseTrigger,
  onMount,
  onHide,
}) => {
  useEffect(() => {
    isOpen && toggleBodyElementClass('overflow-hidden', true);
    return () => toggleBodyElementClass('overflow-hidden', false);
  }, [isOpen]);

  useEffect(() => {
    closeOnEscKey && isOpen && document.addEventListener('keydown', onKeyDown, false);
    return () => document.removeEventListener('keydown', onKeyDown, false);
  }, [isOpen]);

  const onTransitionEnd = () => {
    onHide && onHide();
  };

  const onKeyDown = event => {
    event.keyCode === 27 && onCloseTrigger();
  };

  const transitionClassNames = 'backdrop';

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      in={isOpen}
      classNames={transitionClassNames}
      timeout={transitionDuration}
      onEnter={onMount}
      onExited={onTransitionEnd}
    >
      <Portal id={id}>
        <StyledBackdrop
          isOpen={isOpen}
          opacity={backdropOpacity}
          transitionClassNames={transitionClassNames}
          transitionDuration={`${transitionDuration}ms`}
          role="button"
          tabIndex={-1}
          onClick={onCloseTrigger}
        />

        {children}
      </Portal>
    </CSSTransition>
  );
};

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

  &.${props => props.transitionClassNames}-appear,
    &.${props => props.transitionClassNames}-enter,
    &.${props => props.transitionClassNames}-exit-done {
    opacity: 0;
  }

  &.${props => props.transitionClassNames}-appear-active,
    &.${props => props.transitionClassNames}-enter-active {
    opacity: 1;
    transition: opacity ${props => props.transitionDuration};
    will-change: opacity;
  }
  &.${props => props.transitionClassNames}-appear-done,
    &.${props => props.transitionClassNames}-enter-done,
    &.${props => props.transitionClassNames}-exit {
    opacity: 1;
  }
  &.${props => props.transitionClassNames}-exit-active {
    opacity: 0;
    transition: opacity ${props => props.transitionDuration};
    will-change: opacity;
  }
`;

ModalContainer.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeOnEscKey: PropTypes.bool,
  backdropOpacity: PropTypes.number,
  transitionDuration: PropTypes.number,
  onCloseTrigger: PropTypes.func.isRequired,
  onHide: PropTypes.func,
};

export default ModalContainer;
