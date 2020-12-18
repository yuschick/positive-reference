import React, { useState } from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import Text from './Text';

import { borderRadius, color, spacing } from 'theme';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  isOpen?: boolean;
  showLabel: string;
  hideLabel: string;
  className?: string;
  trackingCategory: string;
  trackingName: string;
}

const ShowHideSection: React.FunctionComponent<Props> = ({
  isOpen = false,
  showLabel,
  hideLabel,
  className,
  trackingCategory,
  trackingName,
  children,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(isOpen);
  const { trackEvent } = useAnalytics();

  return (
    <SectionContainer className={className}>
      <LabelButton
        data-test-id="show-hide-button"
        onClick={() => {
          trackEvent({
            category: trackingCategory,
            action: `${isOpened ? 'Close' : 'Open'} ${trackingName.toLowerCase()} section`,
          });
          setIsOpened(!isOpened);
        }}
        aria-controls="show-hide-content"
      >
        <Text color="green">{isOpened ? hideLabel : showLabel}</Text>
        <StyledIcon name="chevronDown" color="green" isOpen={isOpened} />
      </LabelButton>
      {isOpened && (
        <div id="show-hide-content" aria-expanded={isOpened}>
          {children}
        </div>
      )}
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  display: grid;
  grid-gap: ${spacing('md')};
`;

const LabelButton = styled.button`
  align-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${borderRadius('xs')};
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 ${spacing('sm')};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${color('activeGreen')};
    outline: none;
  }
`;

const StyledIcon = styled(Icon)<{ isOpen: boolean }>`
  margin-left: ${spacing('md')};
  transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  transition: transform 0.3s ease;
`;

export default ShowHideSection;
