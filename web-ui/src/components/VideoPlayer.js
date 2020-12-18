import React from 'react';
import ReactPlayer from 'react-player';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import { color } from 'theme';

const VideoPlayer = ({ className, aspectRatio = 1280 / 720, border, boxShadow, ...props }) => {
  return (
    <StyledContainer
      className={className}
      aspectRatio={aspectRatio}
      border={border}
      boxShadow={boxShadow}
    >
      <ReactPlayer {...props} width="100%" height="100%" style={{ position: 'absolute' }} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Div)`
  padding-bottom: ${props => `${100 / props.aspectRatio}%`};
  position: relative;
  width: 100%;

  ${({ border }) =>
    border &&
    css`
      border: solid 4px ${color('yellow')};
      box-sizing: content-box;
    `}
`;

export default VideoPlayer;
