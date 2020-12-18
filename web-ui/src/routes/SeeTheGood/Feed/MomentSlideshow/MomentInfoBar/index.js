import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useSettingsState, useTranslation } from 'positive-store';

import { formatDate } from 'api/Moment';
import Flex from 'components/Flex';
import Text from 'components/Text';
import MomentDetails from 'routes/SeeTheGood/MomentDetails/MomentDetails';
import Rule from 'components/Rule';
import StrengthSticker from 'components/StrengthSticker';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { breakpoint, fontSize, spacing } from 'theme';
import GroupCountButton from 'routes/SeeTheGood/Feed/GroupCountButton';

const DescriptionAndDate = ({ moment, strength, ...props }) => {
  const [showGroupData, setShowGroupData] = useState(false);
  const { t } = useTranslation();
  const { language, locale } = useSettingsState();

  const formatMomentDate = moment =>
    formatDate({
      date: moment.createdAt,
      language,
      locale,
      localize: t,
    });

  return (
    <Flex column {...props}>
      {moment.description && (
        <DescriptionText forwardedAs="p" color="white">
          {moment.description}
        </DescriptionText>
      )}

      {moment.goal && moment.goal.length && (
        <GroupButtonWrapper>
          <GroupCountButton
            moment={moment}
            strength={strength}
            isOpen={showGroupData}
            onClick={() => setShowGroupData(!showGroupData)}
          />
        </GroupButtonWrapper>
      )}

      <TimestampList isOpen={showGroupData}>
        {moment.goal &&
          moment.goal.length &&
          moment.goal.map(m => (
            <li key={m.id}>
              <DateText appearAs="h5" color="grey">
                {formatMomentDate(m)}
              </DateText>
            </li>
          ))}
      </TimestampList>
    </Flex>
  );
};

const MomentInfoBar = ({ isVisible, moment, strength, ...props }) => {
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <Flex
      column={isMobileBreakpoint}
      fullWidth
      padding={isMobileBreakpoint ? 'lg' : 'xl'}
      backgroundColor="rgba(0, 0, 0, 0.9)"
      transform={`translateY(${isVisible ? '0' : '100%'})`}
      transition="transform 0.3s ease-in-out"
      overflowY="scroll"
      {...props}
    >
      {isMobileBreakpoint ? (
        <Fragment>
          <MomentDetails
            marginBottom="lg"
            moment={moment}
            strength={strength}
            flexShrink="0"
            large={false}
            darkMode
            disableStrengthDialog
          />

          <DescriptionAndDate moment={moment} strength={strength} isMobileBreakpoint={true} />
        </Fragment>
      ) : (
        <Fragment>
          <Flex flexBasis="44%" justifyContent="flex-end">
            <StrengthSticker
              size="sm"
              alignSelf="flex-start"
              marginTop="-10px"
              marginRight="md"
              strength={strength}
            />

            <MomentDetails
              moment={moment}
              strength={strength}
              large
              limitWidth
              darkMode
              includeSticker={false}
              disableStrengthDialog
            />
          </Flex>

          <Flex flexBasis="12%" alignSelf="stretch" justifyCenter>
            <Rule vertical white />
          </Flex>

          <DescriptionAndDate
            moment={moment}
            flexBasis="44%"
            marginRight="40px"
            overflowY="scroll"
            strength={strength}
          />
        </Fragment>
      )}
    </Flex>
  );
};

const DescriptionText = styled(Text)`
  font-size: inherit;
  margin-bottom: ${spacing('md')};
  max-width: 480px;

  @media (min-width: ${breakpoint('sm')}) {
    font-size: ${fontSize('md')};
  }
`;

const DateText = styled(Text)`
  font-size: inherit;

  @media (min-width: ${breakpoint('sm')}) {
    font-size: ${fontSize('sm')};
  }
`;

const GroupButtonWrapper = styled.div`
  margin-bottom: ${spacing('sm')};
`;

const TimestampList = styled.ul`
  list-style: none;

  li:not(:first-child) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`;

export default MomentInfoBar;
