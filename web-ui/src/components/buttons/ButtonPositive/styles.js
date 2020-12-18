import styled, { css } from 'styled-components/macro';

import { color, font, fontSize } from 'theme';

const buttonFontSize = '4rem';

const withCountsStyles = css`
  border-color: transparent;
  color: ${color('white')};
  background-color: ${color('green')};
  font-size: ${buttonFontSize};
`;

const StyledButton = styled.button`
  border: 2px solid ${color('green')};
  border-radius: 100%;
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
  color: ${color('green')};
  font-family: ${font('extraBold')};
  text-align: center;
  line-height: 120px;
  transition: all 0.3s ease-in-out;

  span {
    font-size: ${fontSize('sm')};
  }

  ${({ count }) => (count > 0 ? withCountsStyles : null)};

  .positive-number {
    line-height: 120px;
    span {
      font-size: ${buttonFontSize};
    }
  }

  .on-hover {
    display: flex;
    justify-content: center;
    font-size: ${buttonFontSize};
    font-family: ${font('extraBold')};
  }

  &:hover,
  &:active,
  &:focus {
    border-color: transparent;
    color: ${color('white')};
  }

  &:hover,
  &:focus {
    background-color: ${color('hoverGreen')};
  }

  &:active {
    background-color: ${color('activeGreen')};
  }

  &:hover .on-hover {
    transform: translateX(-5px);
  }
`;

export default StyledButton;
