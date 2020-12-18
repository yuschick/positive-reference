import React, { Fragment, useEffect } from 'react';
import { Router, useLocation, navigate } from '@reach/router';
import {
  useAudienceState,
  useAudienceActions,
  useStrengthActions,
  useSettingsState,
  Status,
  useTranslation,
} from 'positive-store';

import Teach from './Teach';

import { routes } from 'config';

import { SpinnerView } from 'components/Spinner';
import { useToast } from 'context/ToastContext';
import TeachExercise from 'routes/TeachExercise';
import withErrorBoundary from 'utils/withErrorBoundary';

const TeachRoute = () => {
  const { pathname } = useLocation();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const { language } = useSettingsState();
  const { status, rawAudiences, audiences, activeAudience } = useAudienceState();

  const { fetchAudiences, setActiveAudienceSlug } = useAudienceActions();
  const { fetchStrengths } = useStrengthActions();

  const [requestedAudienceSlug, requestedStrengthSlug] = pathname
    .substr(1)
    .split('/')
    .slice(1, 2);

  useEffect(() => {
    if (rawAudiences.length) return;
    fetchAudiences(language);
  }, [rawAudiences, fetchAudiences]);

  useEffect(() => {
    if (requestedStrengthSlug || !activeAudience || !audiences.length) return;

    const requestedAudience = audiences.find(({ slug }) => slug === requestedAudienceSlug);

    if (requestedAudience) {
      setActiveAudienceSlug(requestedAudience.slug);
      fetchStrengths({ audience: requestedAudience.slug });
    } else {
      navigate(`/teach/${activeAudience.slug}`, { replace: true });
      fetchStrengths({ audience: activeAudience.slug });

      if (requestedAudienceSlug) {
        addToast(t('app.errors.content_unavailable'), true);
      }
    }
  }, [
    requestedAudienceSlug,
    requestedStrengthSlug,
    setActiveAudienceSlug,
    activeAudience,
    fetchStrengths,
    audiences,
    navigate,
    addToast,
  ]);

  return status.fetchAudiences === Status.loading || !activeAudience ? (
    <SpinnerView />
  ) : (
    <Fragment>
      <Router primary={false}>
        <Teach default path={routes.teach.rootPath()} />
        <Teach
          path={routes.teach.audience({
            audienceSlug: ':audienceSlug',
          })}
        />
        <TeachExercise
          path={routes.teach.strength({
            audienceSlug: ':audienceSlug',
            strengthSlug: ':strengthSlug',
          })}
        />

        <TeachExercise
          path={routes.teach.exercise({
            audienceSlug: ':audienceSlug',
            strengthSlug: ':strengthSlug',
            exerciseSlug: ':exerciseSlug',
          })}
        />
      </Router>
    </Fragment>
  );
};

export default withErrorBoundary(TeachRoute);
