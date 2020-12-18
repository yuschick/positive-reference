import React, { useRef, Fragment } from 'react';
import styled from 'styled-components';
import { useGroupState, Status, useTranslation } from 'positive-store';

import { SpinnerView } from 'components/Spinner';
import CrowTip from 'components/CrowTip/CrowTip';
import CrowTipBanner from 'components/CrowTip/CrowTipBanner';
import Heading from 'components/Heading';
import Page from 'components/Page';
import PillButton from 'components/buttons/PillButton';
import Input from 'components/Input';
import useCreateGroupForm from 'routes/SeeTheGood/Require/useCreateGroupForm';
import useEffectOnMountOnly from 'utils/useEffectOnMountOnly';
import { nameMaxLength, nameMinLength } from 'api/Group';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

import { breakpoint, spacing } from 'theme';

const RequireGroup = () => {
  const inputRef = useRef();
  const { trackEvent } = useAnalytics();

  const { status, restrictedAccount } = useGroupState();

  const { form, reset, submitGroup } = useCreateGroupForm();
  const { t } = useTranslation();
  const isMobileBreakpoint = useMobileBreakpoint();

  const { register, handleSubmit, errors } = form;

  useEffectOnMountOnly(() => {
    reset();
    if (!isMobileBreakpoint) {
      inputRef.current && inputRef.current.focus();
    }
  }, [reset, isMobileBreakpoint, inputRef]);

  const onSubmitTrigger = () => {
    submitGroup();
    trackEvent({
      category: 'Group',
      action: 'Submit New Group',
    });
  };

  return status.fetchGroups === Status.loading ? (
    <SpinnerView />
  ) : (
    <Fragment>
      {isMobileBreakpoint && <StyledCrowTipBanner tips={[t('route.see_the_good.no_groups.tip')]} />}

      <StyledPage>
        <Heading as="h1" align="center">
          {t('route.see_the_good.no_groups.page_title')}
        </Heading>

        {!restrictedAccount && (
          <Fragment>
            <StyledInput
              refKey={e => {
                register(e, {
                  required: true,
                  minLength: nameMinLength,
                  maxLength: nameMaxLength,
                });
                inputRef.current = e;
              }}
              id="group-name"
              name="name"
              label={t('route.see_the_good.no_groups.group_name')}
              placeholder={t('route.see_the_good.no_groups.placeholder')}
              error={
                errors.name &&
                t('route.see_the_good.errors.invalid_input_length', {
                  min: nameMinLength,
                  max: nameMaxLength,
                })
              }
              large
            />

            <PillButton
              marginTop="xl"
              label={t('route.see_the_good.no_groups.actions.create_group')}
              onClick={handleSubmit(onSubmitTrigger)}
            />

            {!isMobileBreakpoint && (
              <StyledCrowTip tips={[t('route.see_the_good.no_groups.tip')]} />
            )}
          </Fragment>
        )}
      </StyledPage>
    </Fragment>
  );
};

const StyledCrowTipBanner = styled(CrowTipBanner)`
  margin-bottom: ${spacing('lg')};
`;

const StyledCrowTip = styled(CrowTip)`
  margin-top: ${spacing('xxl')};
`;

const StyledPage = styled(Page)`
  align-items: center;
  display: flex;
  height: calc(100vh - ${spacing('navbar')});
  flex-direction: column;

  @media (min-width: ${breakpoint('sm')}) {
    justify-content: center;
  }
`;

const StyledInput = styled(Input)`
  max-width: 400px;
`;

export default RequireGroup;
