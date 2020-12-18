import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import IconButton from 'components/buttons/IconButton';
import { color } from 'theme';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

const Dialog = ({ title, contentContainerProps, children, footer, onCloseTrigger, ...props }) => {
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <Flex
      fixed
      top="50%"
      left={!isMobileBreakpoint ? 'calc(50% - 240px)' : '0'}
      right="0"
      width={!isMobileBreakpoint ? '480px' : undefined}
      transform="translate(0%, -50%)"
      margin="none lg"
      column
      alignCenter
      backgroundColor="backdropGrey"
      borderRadius="sm"
      {...props}
    >
      <Flex
        relative
        fullWidth
        height="xxl"
        center
        backgroundColor="white"
        bottomBorder
        borderRadius="sm sm none none"
      >
        <StyledIconButton absolute left="sm" iconName="close" onClick={onCloseTrigger} />

        <Heading as="h1" appearAs="h2">
          {title}
        </Heading>
      </Flex>

      <Div fullWidth padding="xl" textAlign="center" {...contentContainerProps}>
        {children}
      </Div>

      {footer && (
        <Flex fullWidth padding="md" center topBorder>
          {footer}
        </Flex>
      )}
    </Flex>
  );
};

const StyledIconButton = styled(IconButton)`
  background-color: ${color('white')};

  svg {
    color: ${color('grey')};
  }

  &:hover,
  &:active,
  &:focus {
    background-color: ${color('grey')};

    svg {
      color: ${color('white')};
    }
  }
`;

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  contentContainerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  onCloseTrigger: PropTypes.func.isRequired,
};

export default Dialog;
