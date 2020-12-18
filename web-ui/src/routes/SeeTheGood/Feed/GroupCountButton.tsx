import React from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { Moment, Strength, useTranslation } from 'positive-store';

import { font } from 'theme';

interface Props {
  moment: Moment;
  strength: Strength;
  isOpen: boolean;
  onClick: () => void;
}

const GroupCountButton: React.FunctionComponent<Props> = ({
  moment,
  strength,
  isOpen,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <GroupCount
      aria-label={t(
        `route.see_the_good.feed.actions.grouped_timestamps.${isOpen ? 'hide' : 'show'}`
      )}
      aria-controls={`${moment.goalId}-timestamps`}
      color={strength.color}
      isOpen={isOpen}
      onClick={onClick}
    >
      {moment.goal.length}
    </GroupCount>
  );
};

const GroupCount = styled.button<{ color: string; isOpen: boolean }>`
  background: ${({ color, isOpen }) => (isOpen ? darken(0.2, color) : color)};
  border: 3px solid transparent;
  border-radius: 50%;
  display: inline-grid;
  font-family: ${font('bold')};
  height: 32px;
  place-items: center;
  text-align: center;
  transition: background 0.3s ease;
  width: 32px;

  &:hover,
  &:focus {
    background: ${({ color, isOpen }) => (isOpen ? color : lighten(0.1, color))};
  }

  &:focus {
    border-color: ${({ color }) => color};
  }

  &:active {
    background: ${({ color }) => darken(0.2, color)};
  }
`;

export default GroupCountButton;
