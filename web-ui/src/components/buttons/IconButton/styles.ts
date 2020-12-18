import styled, { css } from 'styled-components';

import Button from 'components/Button';
import Icon from 'components/Icon';
import { color } from 'theme';

const StyledIcon = styled(Icon)``;

const primaryStyles = css`
  background-color: ${color('green')};

  ${StyledIcon} {
    color: ${color('white')};
  }

  &:hover,
  :focus {
    background-color: ${color('hoverGreen')};
  }

  &:active {
    background-color: ${color('activeGreen')};
  }
`;

const primaryDangerStyles = css`
  background-color: ${color('red')};

  ${StyledIcon} {
    color: ${color('white')};
  }

  &:hover,
  :focus {
    background-color: ${color('hoverRed')};
  }

  &:active {
    background-color: ${color('activeRed')};
  }
`;

const primaryDarkStyles = css`
  background-color: rgba(0, 0, 0, 0.24);

  ${StyledIcon} {
    color: ${color('white')};
  }

  &:hover,
  :focus {
    background-color: ${color('hoverGreen')};
  }

  &:active {
    background-color: ${color('activeGreen')};
  }
`;

const secondaryStyles = css`
  background-color: ${color('white')};

  ${StyledIcon} {
    color: ${color('green')};
  }

  &:hover,
  :focus {
    background-color: ${color('hoverGreen')};

    ${StyledIcon} {
      color: ${color('white')};
    }
  }

  &:active {
    background-color: ${color('activeGreen')};

    ${StyledIcon} {
      color: ${color('white')};
    }
  }
`;

const secondaryDangerStyles = css`
  background-color: ${color('white')};

  ${StyledIcon} {
    color: ${color('red')};
  }

  &:hover,
  :focus {
    background-color: ${color('hoverRed')};

    ${StyledIcon} {
      color: ${color('white')};
    }
  }

  &:active {
    background-color: ${color('activeRed')};

    ${StyledIcon} {
      color: ${color('white')};
    }
  }
`;

const StyledButton = styled(Button)<{ [x: string]: any }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: all 0.3s ease-in-out;

  &:disabled,
  &:disabled:hover,
  &:disabled:focus,
  &:disabled:active {
    opacity: 0.5;
  }

  ${({ primary, danger, dark }) => {
    if (primary) {
      return danger ? primaryDangerStyles : dark ? primaryDarkStyles : primaryStyles;
    } else {
      return danger ? secondaryDangerStyles : secondaryStyles;
    }
  }};
`;

export { StyledButton, StyledIcon };
