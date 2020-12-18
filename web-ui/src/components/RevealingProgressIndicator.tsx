import React from 'react';
import styled from 'styled-components';

import { color, font, fontSize, spacing } from 'theme';

import Text from 'components/Text';
import ScreenReaderText from 'components/ScreenReaderText';

type Progress = {
  current: number;
  total: number;
};

interface Props {
  label: string;
  color: string;
  progress: Progress;
  showProgress?: boolean;
}

const RevealingProgressIndicator: React.FunctionComponent<Props> = ({
  label,
  color,
  progress,
  showProgress = true,
  children,
}) => {
  return (
    <Container>
      <ScreenReaderText>{label}</ScreenReaderText>

      {children && <ChildrenContainer>{children}</ChildrenContainer>}

      <SVGWrapper
        color={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 60"
        progress={progress}
      >
        <circle cx="30" cy="30" r="15.9155" />
      </SVGWrapper>

      {showProgress && (
        <ProgressIndicator color={color}>
          <Text>
            {progress.current}/{progress.total}
          </Text>
        </ProgressIndicator>
      )}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: ${spacing('sm')};
  position: relative;
  width: 100%;
`;

const ChildrenContainer = styled.div`
  height: 100%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const SVGWrapper = styled.svg<{ color: string; progress: Progress }>`
  --percentage: ${({ progress }) => 1 - progress.current / progress.total};
  --strokeOffsetValue: calc(100 - calc(var(--percentage) * 100));

  height: 100%;
  position: absolute;
  transform: rotate(90deg) scaleX(-1);
  width: 100%;

  circle {
    fill: transparent;
    stroke: ${color('white')};
    stroke-dasharray: 100 100;
    stroke-dashoffset: var(--strokeOffsetValue);
    stroke-width: 25px;
    transition: stroke-dashoffset 1s ease;
  }
`;

const ProgressIndicator = styled.div<{ color: string }>`
  align-items: center;
  background: ${({ color }) => color};
  border-radius: 50%;
  color: ${color('black')};
  display: flex;
  font-family: ${font('bold')};
  font-size: ${fontSize('sm')};
  justify-content: center;
  left: 50%;
  min-height: 40px;
  min-width: 40px;
  padding: ${spacing('sm')};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default RevealingProgressIndicator;
