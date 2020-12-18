import React from 'react';
import PropTypes from 'prop-types';

import Flex from 'components/Flex';
import { color, theme } from 'theme';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

const Card = ({
  yellowBorder = false,
  fullWidthOnMobile = true,
  clickable = false,
  children,
  onIconClick,
  ...props
}) => {
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <Flex
      relative
      padding="lg"
      column
      alignCenter
      borderColor={yellowBorder ? theme.color.yellow : theme.color.lightGrey}
      borderWidth={yellowBorder ? '4px' : '1px'}
      borderStyle={isMobileBreakpoint && fullWidthOnMobile ? 'solid none' : 'solid'}
      borderRadius={isMobileBreakpoint && fullWidthOnMobile ? 'none' : 'sm'}
      color="black"
      backgroundColor="white"
      cursor={clickable ? 'pointer' : undefined}
      transition="background-color 0.2s ease-out"
      css={clickable ? `&:hover { background-color: ${color('lightGreen')}; }` : undefined}
      {...props}
    >
      {children}
    </Flex>
  );
};

Card.propTypes = {
  clickable: PropTypes.bool,
  yellowBorder: PropTypes.bool,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func,
};

export default Card;
