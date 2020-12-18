import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useStrengthState, StrengthSlug, Strength, useTranslation } from 'positive-store';
import { remove } from 'lodash';

import { spacing } from 'theme';

import Heading from 'components/Heading';
import ShowHideSection from 'components/ShowHideSection';
import StrengthButton from 'components/StrengthButton';

import { onlyKeepLiveObjects } from 'utils/sanity';

interface Props {
  strength?: Strength;
  onSelect: (strengthSlug: StrengthSlug) => void;
}

const StrengthContainer: React.FunctionComponent<Props> = ({ strength, onSelect }) => {
  const { stgStrengths } = useStrengthState();
  const { t } = useTranslation();

  const sortedStrengths = stgStrengths
    ?.map(strength => onlyKeepLiveObjects('inSeeTheGood', [strength])[0])
    ?.filter(strength => strength)
    ?.sort((a, b) => a.name.localeCompare(b.name));

  const coreStrengths = sortedStrengths
    ? [
        ...remove(sortedStrengths, s => s.slug === StrengthSlug.selfRegulation),
        ...remove(sortedStrengths, s => s.slug === StrengthSlug.perseverance),
        ...remove(sortedStrengths, s => s.slug === StrengthSlug.kindness),
      ]
    : [];

  return (
    <Fragment>
      <Heading as="h4" align="center">
        {t('route.see_the_good.modal.step_1.power_strengths')}
      </Heading>

      {coreStrengths.length > 2 && (
        <StrengthButton.Group name="goal-strength">
          <CoreContainer>
            {coreStrengths.map(str => (
              <StrengthButton.Button
                key={str.slug}
                strength={str}
                selected={str.slug === strength?.slug}
                onClick={() => onSelect(str.slug)}
              />
            ))}
          </CoreContainer>
        </StrengthButton.Group>
      )}

      <StyledShowHideSection
        isOpen={strength && !coreStrengths.find(s => s.slug === strength.slug)}
        showLabel={t('app.actions.show_more')}
        hideLabel={t('app.actions.show_less')}
        trackingCategory="Goals"
        trackingName="Goal strengths"
      >
        <StyledHeading forwardedAs="h5" appearAs="h4" align="center">
          {t('route.see_the_good.modal.step_1.more_strengths')}
        </StyledHeading>

        <StrengthButton.Group name="goal-strength">
          <SecondaryContainer>
            {sortedStrengths?.map(str => (
              <StrengthButton.Button
                key={str.slug}
                strength={str}
                selected={str.slug === strength?.slug}
                onClick={() => onSelect(str.slug)}
                small
              />
            ))}
          </SecondaryContainer>
        </StrengthButton.Group>
      </StyledShowHideSection>
    </Fragment>
  );
};

const StyledHeading = styled(Heading)<{ appearAs: string; align: string }>`
  margin: 0 0 ${spacing('lg')} 0;
`;

const CoreContainer = styled.div`
  display: grid;
  grid-gap: ${spacing('lg')};
  grid-template-columns: 1fr 1fr;
  justify-content: space-evenly;
  margin-top: ${spacing('lg')};
  text-align: center;

  label {
    margin: 0 auto;
    width: max-content;
  }

  label:first-child {
    grid-column: span 2;
  }
`;

const StyledShowHideSection = styled(ShowHideSection)`
  margin-top: ${spacing('xxxl')};
`;

const SecondaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${spacing('xl')} ${spacing('sm')};
`;

export default StrengthContainer;
