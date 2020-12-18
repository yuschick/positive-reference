import React from 'react';
import styled from 'styled-components';
import { Moment, Strength } from 'positive-store';

import MomentMedia from './MomentMedia';
import MomentContent from './MomentContent';

import { borderRadius, breakpoint, color, spacing } from 'theme';

interface Props {
  moment: Moment;
  strength: Strength;
  isTempMoment?: boolean;
  isEditable?: boolean;
  isCompletedGoalMoment?: boolean;
  onFullScreen?: ({ moment }: { moment: Moment }) => void;
  onEdit?: ({ moment }: { moment: Moment }) => void;
}

const MomentCard: React.FunctionComponent<Props> = ({
  moment,
  strength,
  isTempMoment = false,
  isEditable = false,
  isCompletedGoalMoment = false,
  onFullScreen,
  onEdit,
}) => {
  return (
    <MomentGrid data-test-id="moment-card">
      <MomentMedia
        moment={moment}
        strength={strength}
        isTempMoment={isTempMoment}
        isCompletedGoalMoment={isCompletedGoalMoment}
        onFullScreen={() => !!onFullScreen && onFullScreen({ moment })}
      />

      <MomentContent
        moment={moment}
        strength={strength}
        isEditable={isEditable}
        onEdit={() => !!onEdit && onEdit({ moment })}
      />
    </MomentGrid>
  );
};

const MomentGrid = styled.article`
  background: ${color('white')};
  border: 1px solid ${color('lightGrey')};
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  display: grid;
  grid-template-areas:
    'media'
    'details';
  height: auto;
  overflow: hidden;
  width: 100%;

  & + article {
    margin-top: ${spacing('xl')};
  }

  .icon-button {
    opacity: 0;
    pointer-events: none;
  }

  .icon-button {
    opacity: 1;
    pointer-events: auto;
  }

  @media (min-width: ${breakpoint('xs')}) and (max-width: 860px) {
    border: 1px solid ${color('lightGrey')};
    border-radius: ${borderRadius('sm')};
    grid-template-areas: 'media details';
    margin: 0 auto;
    width: 90%;
  }

  @media (min-width: 860px) {
    align-items: center;
    border: 1px solid ${color('lightGrey')};
    border-radius: ${borderRadius('sm')};
    grid-template-areas: 'media details';
    grid-template-columns: 500px 340px;
    grid-template-rows: 1fr;
    width: auto;

    .icon-button {
      opacity: 0;
      pointer-events: none;
    }

    &:hover,
    &:focus-within {
      .icon-button {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;

export default MomentCard;
