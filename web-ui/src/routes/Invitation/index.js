import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { navigate } from '@reach/router';
import { useForm } from 'react-hook-form';
import { useInvitationState, useInvitationActions, useTranslation, Status } from 'positive-store';

import A from 'components/A';
import Checkbox from 'components/Checkbox';
import SanityIllustration from 'components/SanityIllustration';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import Text from 'components/Text';
import Page from 'components/Page';
import PillButton from 'components/buttons/PillButton';
import TextButton from 'components/buttons/TextButton';
import useInvitationAcceptProcess from 'routes/Invitation/useInvitationAcceptProcess';
import useUrl from 'utils/useUrl';
import { SpinnerView } from 'components/Spinner';
import { groupType } from 'api/Group';
import { organizationRoles } from 'config';
import { spacing } from 'theme';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useSession } from 'context/SessionContext/SessionContext';
import { useToast } from 'context/ToastContext';

const Invitation = () => {
  const { status: invitationStatus, invitation } = useInvitationState();
  const { fetchInvitation } = useInvitationActions();

  const form = useForm();

  const { trackEvent } = useAnalytics();
  const { loginProcess, user } = useSession();

  const invitationAcceptProcess = useInvitationAcceptProcess();

  const { t } = useTranslation();

  const { addToast } = useToast();

  const url = useUrl();
  const token = url.query['token'];
  const email = url.query['email'];
  const invitationAcceptFlag = url.query['invitation-accept-flag'];

  let status = 'invalid';
  if (
    invitationStatus.acceptInvitation === Status.loading ||
    invitationStatus.deleteInvitation === Status.loading ||
    invitationStatus.fetchInvitation === Status.loading ||
    !loginProcess.isResolved
  ) {
    status = 'loading';
  } else if (invitation) {
    status = invitation.status;
  } else if (!user) {
    status = 'login-required';
  }

  useEffect(() => {
    if (!token) return;

    fetchInvitation({ token });
  }, [token, fetchInvitation]);

  const acceptInvitation = () => {
    invitationAcceptProcess.acceptInvitation({ invitation });
    trackEvent({ category: 'Invitation', action: 'Accept Invitation' });
  };

  useEffect(() => {
    if (invitation && invitationAcceptFlag) {
      acceptInvitation();
    }
  }, [invitation, invitationAcceptFlag, acceptInvitation]);

  useEffect(() => {
    if (invitationAcceptProcess.status === 'success') {
      if (invitation.group) {
        addToast(t('route.invitation.welcome_to_the_group', { groupName: invitation.group.name }));
      } else {
        addToast(t('route.invitation.welcome_to_positive'));
      }

      // Navigate into group only if group is a class or if user is a manager,
      // otherwise trigger fetchGroups here
      if (
        (invitation.group &&
          invitation.groupId &&
          invitation.group.type !== groupType.organization) ||
        invitation.role === organizationRoles.manager
      ) {
        navigate(`/see-the-good?group-id=${invitation.groupId}`);
      } else {
        navigate(`/see-the-good`);
      }
    }
  }, [invitationAcceptProcess.status]);

  const signUp = () => {
    const { consent } = form.getValues();
    if (consent) {
      login({ signUpFlag: true });
    } else {
      addToast(t('route.invitation.errors.consent_missing'), true);
    }
  };

  const login = ({ signUpFlag = false }) => {
    url.set('query', { token, 'invitation-accept-flag': true });
    loginProcess.login({ targetUrl: url.href, withEmail: email, signUpFlag });

    if (signUpFlag) {
      trackEvent({ category: 'Invitation', action: 'Click Sign Up' });
    } else {
      trackEvent({ category: 'Invitation', action: 'Click Login' });
    }
  };

  return token ? (
    <StyledPage>
      <Helmet>
        <title>{t('route.invitation')} | Positive</title>
      </Helmet>

      {status === 'loading' ? (
        <SpinnerView />
      ) : (
        <Fragment>
          <Heading as="h1">
            {t(
              status !== 'invalid'
                ? 'route.invitation.header'
                : 'route.invitation.errors.invitation_not_found'
            )}
          </Heading>

          <SanityIllustration
            marginTop="xl"
            slug="situation-group-work"
            alt={t('route.see_the_good.actions.spot_strength')}
            sizes={'320px'}
          />

          {status === 'waiting' && (
            <Fragment>
              <StyledText forwardedAs="p" align="center">
                {invitation.creator && <b>{invitation.creator.name}</b>}
                {` ${t('route.invitation.message')} `}
                {invitation.group && <b>{invitation.group.name}.</b>}
              </StyledText>

              <PillButton
                marginTop="xl"
                label={t('route.invitation.actions.join_group')}
                onClick={acceptInvitation}
              />
            </Fragment>
          )}

          {status === 'login-required' && (
            <Fragment>
              <StyledCheckbox name="consent" register={form.register}>
                <Text as="p">
                  {`${t('route.invitation.actions.consent')} `}
                  <A href={t('route.invitation.actions.consent.terms_of_service.url')}>
                    {t('route.invitation.actions.consent.terms_of_service')}
                  </A>
                  {` ${t('route.invitation.actions.consent.and')} `}
                  <A href={t('route.invitation.actions.consent.privacy_policy.url')}>
                    {t('route.invitation.actions.consent.privacy_policy')}
                  </A>
                  .
                </Text>
              </StyledCheckbox>

              <PillButton
                marginTop="xl"
                label={t('route.invitation.actions.sign_up.msg')}
                onClick={signUp}
              />

              <Flex marginTop="lg" alignCenter>
                <Text>{t('route.invitation.existing_account')}</Text>

                <TextButton marginLeft="sm" onClick={login}>
                  {t('app.actions.login')}
                </TextButton>
              </Flex>
            </Fragment>
          )}

          {status === 'accepted' && (
            <Fragment>
              <StyledText forwardedAs="p" align="center">
                {t('route.invitation.actions.join_group.msg')}
              </StyledText>

              <PillButton
                marginTop="xl"
                label={`${t('route.see_the_good')}!`}
                onClick={() => navigate('/see-the-good')}
              />
            </Fragment>
          )}

          {status === 'invalid' && (
            <Fragment>
              <StyledText forwardedAs="p" align="center">
                {t('route.invitation.errors.invitation_not_found_msg')}
              </StyledText>
            </Fragment>
          )}
        </Fragment>
      )}
    </StyledPage>
  ) : null;
};

const StyledPage = styled(Page)`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - ${spacing('navbar')});
  justify-content: center;
`;

const StyledText = styled(Text)`
  margin-top: ${spacing('xl')};
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: ${spacing('xxl')};
`;

export default Invitation;
