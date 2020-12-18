import styled, { css } from 'styled-components/macro';

import Button from 'components/Button';
import { color, font, fontSize } from 'theme';

const primaryStyles = css`
  color: ${color('white')};
  background-color: ${color('green')};
  border-color: ${color('green')};

  svg {
    color: ${color('white')};
  }

  &:hover,
  &:focus {
    background-color: ${color('hoverGreen')};
    border-color: ${color('hoverGreen')};
  }
  &:active {
    background-color: ${color('activeGreen')};
    border-color: ${color('activeGreen')};
  }
`;

const primaryDangerStyles = css`
  color: ${color('white')};
  background-color: ${color('red')};
  border-color: ${color('red')};

  svg {
    color: ${color('white')};
  }

  &:hover,
  &:focus {
    background-color: ${color('hoverRed')};
    border-color: ${color('hoverRed')};
  }
  &:active {
    background-color: ${color('activeRed')};
    border-color: ${color('activeRed')};
  }
`;

const secondaryStyles = css`
  color: ${color('green')};
  background-color: ${color('white')};
  border-color: ${color('green')};

  svg {
    color: ${color('green')};
  }

  &:hover,
  &:focus {
    color: ${color('white')};
    background-color: ${color('hoverGreen')};
    border-color: ${color('hoverGreen')};

    svg {
      color: ${color('white')};
    }
  }

  &:active {
    color: ${color('white')};
    background-color: ${color('activeGreen')};
    border-color: ${color('activeGreen')};

    svg {
      color: ${color('white')};
    }
  }
`;

const secondaryDangerStyles = css`
  color: ${color('red')};
  border-color: ${color('red')};
  background-color: ${color('white')};

  svg {
    color: ${color('red')};
  }

  &:hover,
  &:focus {
    color: ${color('white')};
    background-color: ${color('hoverRed')};
    border-color: ${color('hoverRed')};

    svg {
      color: ${color('white')};
    }
  }

  &:active {
    color: ${color('white')};
    background-color: ${color('activeRed')};
    border-color: ${color('activeRed')};

    svg {
      color: ${color('white')};
    }
  }
`;

const StyledButton = styled(Button)<{
  [x: string]: any;
}>`
  font-size: ${fontSize('sm')};
  font-family: ${font('bold')};
  transition: all 0.3s ease-in-out;

  svg {
    transition: all 0.3s ease-in-out;
  }

  ${({ secondary, danger }) => {
    if (secondary) {
      return danger ? secondaryDangerStyles : secondaryStyles;
    } else {
      return danger ? primaryDangerStyles : primaryStyles;
    }
  }};

  &:disabled,
  &:disabled:hover,
  &:disabled:focus,
  &:disabled:active {
    color: ${({ secondary }) => color(secondary ? 'disabled' : 'white')};
    background-color: ${({ secondary }) => color(secondary ? 'white' : 'disabled')};
    border-color: ${color('disabled')};

    svg {
      color: ${({ secondary }) => color(secondary ? 'disabled' : 'white')};
    }
  }
`;

export default StyledButton;
