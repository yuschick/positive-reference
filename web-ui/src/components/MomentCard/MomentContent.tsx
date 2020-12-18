import React, { useState } from 'react';
import styled from 'styled-components';
import { useSettingsState, Moment, Strength, useTranslation } from 'positive-store';

import { breakpoint, color, spacing } from 'theme';

import { formatDate } from 'api/Moment';
import Text from 'components/Text';
import IconButton from 'components/buttons/IconButton';
import MomentDetails from 'routes/SeeTheGood/MomentDetails/MomentDetails';
import GroupCountButton from 'routes/SeeTheGood/Feed/GroupCountButton';

interface Props {
  moment: Moment;
  strength: Strength;
  isEditable: boolean;
  onEdit: ({ moment }: { moment: Moment }) => void;
}

const MomentContent: React.FunctionComponent<Props> = ({
  moment,
  strength,
  isEditable,
  onEdit,
}) => {
  const [showGroupData, setShowGroupData] = useState<boolean>(false);
  const { t } = useTranslation();
  const { language, locale } = useSettingsState();

  const formatMomentDate = ({ moment }: { moment: Moment }) =>
    formatDate({
      date: moment.createdAt,
      language,
      locale,
      localize: t,
    });

  return (
    <MomentContentContainer>
      <MomentDataRow area="details">
        <MomentDetails moment={moment} strength={strength} />
      </MomentDataRow>

      {moment.description && (
        <MomentDataRow area="description">
          <Text as="p">{moment.description}</Text>
        </MomentDataRow>
      )}

      <MomentDataRow area="date">
        <TimeStampRow>
          <TimeStampRow>
            {moment.goal?.length > 1 ? (
              <TimeStampList
                id={`${moment.goalId}-timestamps`}
                isOpen={showGroupData}
                aria-hidden={!showGroupData}
              >
                {moment.goal.map((m: Moment) => (
                  <li key={m.id}>
                    <Text as="p" appearAs="h5">
                      {formatMomentDate({ moment: m })}
                    </Text>
                  </li>
                ))}
              </TimeStampList>
            ) : (
              <Text as="p" appearAs="h5">
                {formatMomentDate({ moment })}
              </Text>
            )}

            {moment.goal?.length > 1 && (
              <GroupCountButton
                moment={moment}
                strength={strength}
                isOpen={showGroupData}
                onClick={() => setShowGroupData(!showGroupData)}
              />
            )}
          </TimeStampRow>

          {isEditable && (
            <EditButton
              className="icon-button"
              iconName="edit"
              ariaLabel={t('route.see_the_good.modal.actions.edit_post')}
              isOpen={showGroupData}
              onClick={() => {
                onEdit({ moment });
              }}
            />
          )}
        </TimeStampRow>
      </MomentDataRow>
    </MomentContentContainer>
  );
};

const MomentContentContainer = styled.div`
  border-left: 1px solid ${color('lightGrey')};
  display: grid;
  grid-area: details;
  grid-gap: ${spacing('md')};
  grid-template-areas:
    'details'
    'description'
    'date';
  grid-template-rows: auto 1fr auto;
  height: 100%;
  padding: ${spacing('xl')} ${spacing('lg')} ${spacing('md')} ${spacing('lg')};

  @media (min-width: ${breakpoint('xs')}) and (max-width: 860px) {
    border-left: 0;
  }
`;

const MomentDataRow = styled.div<{ area: string }>`
  border-top: 1px solid ${color('lightGrey')};
  grid-area: ${({ area }) => area};
  padding-top: ${spacing('md')};

  &:first-child {
    border: 0;
    padding: 0;
  }
`;

const TimeStampRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;

  button {
    align-self: flex-start;
    margin-top: 2px;
  }
`;

const TimeStampList = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  margin: 0;
  overflow: hidden;
  margin-right: ${spacing('sm')};
  padding: 0;

  li:first-child p {
    line-height: 38px;
  }

  li:not(:first-child) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }

  li + li {
    margin-top: ${spacing('sm')};
  }
`;

const EditButton = styled(IconButton)<{ isOpen: boolean }>`
  --openPos: calc(100% - calc(${spacing('md')} * 2));

  position: absolute;
  right: 0;
  top: ${({ isOpen }) => (isOpen ? 'var(--openPos)' : '50%')};
  transform: ${({ isOpen }) => !isOpen && 'translateY(-50%)'};
  transition: none;
`;

export default MomentContent;
