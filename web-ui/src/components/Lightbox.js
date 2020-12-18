import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Flex from 'components/Flex';
import ModalContainer from 'components/ModalContainer';

const Lightbox = ({ modalId, isOpen, children, ...props }) => {
  const transitionDuration = 150;

  return (
    <ModalContainer id={modalId} isOpen={isOpen} {...props}>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={isOpen}
        classNames="lightbox"
        timeout={transitionDuration}
      >
        <Container fixed top="0px" full center transitionDuration={`${transitionDuration}ms`}>
          {children}
        </Container>
      </CSSTransition>
    </ModalContainer>
  );
};

const Container = styled(Flex)`
  &.lightbox-appear,
  &.lightbox-enter,
  &.lightbox-exit-done {
    opacity: 0;
    transform: scale(0.9);
  }

  &.lightbox-appear-active,
  &.lightbox-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all ${props => props.transitionDuration};
    will-change: opacity, transform;
  }
  &.lightbox-appear-done,
  &.lightbox-enter-done,
  &.lightbox-exit {
    opacity: 1;
    transform: scale(1);
  }
  &.lightbox-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: all ${props => props.transitionDuration};
    will-change: opacity, transform;
  }

  pointer-events: none;
  > * {
    pointer-events: auto;
  }
`;

Lightbox.propTypes = {
  modalId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Lightbox;
