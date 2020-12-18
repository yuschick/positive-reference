import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Moment, Strength, useTranslation } from 'positive-store';

import Text from 'components/Text';
import TextArea from 'components/TextArea';
import TextButton from 'components/buttons/TextButton';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { spacing } from 'theme';

interface Props {
  moment: Moment;
  strength: Strength;
  updateMoment: ({ description }: { description?: string }) => void;
}

const MomentDescription: React.FunctionComponent<Props> = ({ moment, strength, updateMoment }) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();

  const top5Examples = strength.goalTemplates.find(
    goalTemplate => goalTemplate.slug === 'top-5-examples'
  );

  return (
    <Fragment>
      <TextArea
        id="moment-description"
        value={moment.description || ''}
        placeholder={t('route.see_the_good.modal.step_2.desc')}
        onChange={(event?: React.ChangeEvent<HTMLTextAreaElement>) =>
          updateMoment({ ...moment, description: event?.target.value })
        }
      />

      <fieldset>
        <legend>
          <StyledText forwardedAs="p" appearAs="h5">
            {t('route.see_the_good.modal.step_2.examples')}
          </StyledText>
        </legend>

        {top5Examples?.actions.map(action => (
          <ExampleButton
            key={action}
            marginBottom="sm"
            textAlign="left"
            onClick={() => {
              updateMoment({
                ...moment,
                description: moment.description ? moment.description + ` ${action}` : action,
              });
              trackEvent({ category: 'Moment', action: 'Select Example', name: action });
            }}
          >
            {action}
          </ExampleButton>
        ))}
      </fieldset>
    </Fragment>
  );
};

const StyledText = styled(Text)<{ appearAs: string }>`
  margin-bottom: ${spacing('md')};
`;

const ExampleButton = styled(TextButton)`
  text-align: left;

  + button {
    margin-top: ${spacing('sm')};
  }
`;
export default MomentDescription;
