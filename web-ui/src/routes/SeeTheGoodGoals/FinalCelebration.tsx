import React from 'react';
import styled from 'styled-components';
import { FocusOn } from 'react-focus-on';
import { useStrengthState, useMomentState, useTranslation } from 'positive-store';

import { borderRadius, boxShadow, spacing } from 'theme';

import Portal from 'components/Portal';
import Heading from 'components/Heading';
import MomentCard from 'components/MomentCard';
import IconButton from 'components/buttons/IconButton';
import ConfettiContainer from 'components/ConfettiContainer';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  goalId: string;
  close: () => void;
}

const FinalCelebration: React.FunctionComponent<Props> = ({ goalId, close }) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();

  const { strengths } = useStrengthState();
  const { moments } = useMomentState();

  const goalMoments = moments.filter(m => m.goalId === goalId);
  const completedMoment = goalMoments[0];
  const strength = strengths.find(s => s.slug === completedMoment.strengthSlug);

  return (
    <Portal id="final-celebration" targetId="root">
      <FocusOn onEscapeKey={close}>
        <CelebrationContainer data-test-id="final-celebration">
          <ConfettiContainer isActive isContinuous />
          <EditButton
            data-test-id="final-celebration-close-button"
            aria-label={t('app.actions.close')}
            iconName="close"
            onClick={() => {
              trackEvent({
                category: 'Goals',
                action: 'Close final celebration view',
              });

              close();
            }}
          />
          <div>
            <StyledHeading forwardedAs="h1" appearAs="h1-jumbo" align="center">
              {t('route.see_the_good.goals.celebrations.complete')}
            </StyledHeading>

            <FocusOn onClickOutside={close}>
              <CardWrapper>
                <MomentCard
                  moment={completedMoment}
                  strength={strength}
                  isEditable={false}
                  isCompletedGoalMoment
                />
              </CardWrapper>
            </FocusOn>
          </div>
        </CelebrationContainer>
      </FocusOn>
    </Portal>
  );
};

const CelebrationContainer = styled.section`
  background: rgba(255, 255, 255, 0.9);
  bottom: 0;
  display: grid;
  left: 0;
  padding: ${spacing('lg')};
  place-items: center;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 5;
`;

const EditButton = styled(IconButton)`
  left: ${spacing('lg')};
  position: absolute;
  top: ${spacing('lg')};
`;

const StyledHeading = styled(Heading)<{ align: string; appearAs: string }>`
  margin-bottom: ${spacing('lg')};
`;

const CardWrapper = styled.div`
  border-radius: ${borderRadius('sm')};
  box-shadow: ${boxShadow('shallow')};

  article {
    > * {
      cursor: default;
    }

    .icon-button {
      display: none;
    }
  }
`;

export default FinalCelebration;
