import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Color } from 'types/theme';

interface Props {
  color?: Color;
  small?: boolean;
  center?: boolean;
  className?: string;
}

const Spinner: React.FunctionComponent<Props> = ({
  color = Color.green,
  small = false,
  center = false,
  className,
}) => {
  return <StyledSpinner className={className} small={small} color={color} center={center} />;
};

const lds_dual_ring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<{ small: boolean; color: Color; center: boolean }>`
  height: ${({ small }) => (small ? '22px' : '44px')};
  vertical-align: bottom;
  width: ${({ small }) => (small ? '22px' : '44px')};

  ${({ center }) => center && `margin: 0 auto; text-align: center;`}

  &:after {
    animation: ${lds_dual_ring} 2000ms ease-in-out infinite;
    border-color: ${({ color, theme }) =>
      `${theme.color[color]} ${theme.color[color]} ${theme.color[color]} transparent`};
    border-radius: 50%;
    border-style: solid;
    border-width: ${({ small }) => (small ? '3px' : '5px')};
    content: ' ';
    display: block;
    height: ${({ small }) => (small ? '22px' : '44px')};
    width: ${({ small }) => (small ? '22px' : '44px')};
  }
`;

export default Spinner;
