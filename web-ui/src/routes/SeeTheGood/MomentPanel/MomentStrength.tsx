import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useStrengthState, StrengthSlug, useTranslation } from 'positive-store';
import { remove } from 'lodash';

import CrowTipArrow from 'components/CrowTip/CrowTipArrow';
import CrowTipBanner from 'components/CrowTip/CrowTipBanner';
import Heading from 'components/Heading';
import StrengthButton from 'components/StrengthButton';
import { onlyKeepLiveObjects } from 'utils/sanity';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { spacing } from 'theme';

interface Props {
  strengthSlug?: string;
  onStrengthClick: ({ strengthSlug }: { strengthSlug: StrengthSlug }) => void;
}

const StrengthContainer: React.FunctionComponent<Props> = ({ strengthSlug, onStrengthClick }) => {
  const { stgStrengths } = useStrengthState();
  const isMobileBreakpoint = useMobileBreakpoint();
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
      <CrowTipBanner
        tipId="see-the-good.modal.step-1.tip"
        tips={[
          t('route.see_the_good.modal.step_1.tip_1'),
          t('route.see_the_good.modal.step_1.tip_2'),
        ]}
      >
        <StyledCrowTipArrow rotation={200} />
      </CrowTipBanner>

      <StrengthsContainer isMobileBreakpoint={isMobileBreakpoint}>
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
                  selected={str.slug === strengthSlug}
                  onClick={() => onStrengthClick({ strengthSlug: str.slug })}
                />
              ))}
            </CoreContainer>
          </StrengthButton.Group>
        )}

        <StyledHeading forwardedAs="h5" appearAs="h4" align="center">
          {t('route.see_the_good.modal.step_1.more_strengths')}
        </StyledHeading>

        <StrengthButton.Group name="goal-strength">
          <SecondaryContainer>
            {sortedStrengths?.map(str => (
              <StrengthButton.Button
                key={str.slug}
                strength={str}
                selected={str.slug === strengthSlug}
                onClick={() => onStrengthClick({ strengthSlug: str.slug })}
                small
              />
            ))}
          </SecondaryContainer>
        </StrengthButton.Group>
      </StrengthsContainer>
    </Fragment>
  );
};

const StyledCrowTipArrow = styled(CrowTipArrow)`
  position: absolute;
  bottom: -80px;
  left: 40px;
  pointer-events: none;
`;

const StyledHeading = styled(Heading)<{ appearAs: string; align: string }>`
  margin: ${spacing('xxxl')} 0 ${spacing('lg')} 0;
`;

const StrengthsContainer = styled.div<{ isMobileBreakpoint: boolean }>`
  padding: ${({ isMobileBreakpoint }) => (isMobileBreakpoint ? spacing('lg') : spacing('xl'))};
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

const SecondaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${spacing('xl')} ${spacing('sm')};
`;

export default StrengthContainer;
