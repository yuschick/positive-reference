import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';
import { color, spacing } from 'theme';

const StyledButton = styled(Button)`
  color: ${color('green')};
  transition: color 0.3s ease-in-out;

  svg {
    margin-right: ${spacing('sm')};
    color: ${color('green')};
  }

  &:hover {
    color: ${color('hoverGreen')};

    svg {
      color: ${color('hoverGreen')};
    }
  }

  &:active,
  &:focus {
    color: ${color('activeGreen')};

    svg {
      color: ${color('activeGreen')};
    }
  }
`;

const TextButton = ({ children, ...props }) => (
  <StyledButton flex center fontSize="body" {...props}>
    {children}
  </StyledButton>
);

TextButton.propTypes = {
  onClick: PropTypes.func,
};

TextButton.defaultProps = {
  onClick: null,
};

export default TextButton;
