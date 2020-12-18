import React, { Fragment, useEffect } from 'react';
import { navigate, Router, useLocation } from '@reach/router';
import {
  useSettingsState,
  useStrengthState,
  useStrengthActions,
  useTranslation,
} from 'positive-store';

import { SpinnerView } from 'components/Spinner';
import withErrorBoundary from 'utils/withErrorBoundary';
import LearnCategory from 'routes/Learn/LearnCategory';
import LearnLanding from 'routes/Learn/LearnLanding';
import LearnLesson from 'routes/Learn/LearnLesson';
import { routes } from 'config';
import { useLessons } from 'context/LessonContext/LessonContext';
import { useToast } from 'context/ToastContext';
import MenuBar from './MenuBar';

const Learn = () => {
  const { language } = useSettingsState();
  const { getCategory, getLesson } = useLessons();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { addToast } = useToast();
  const { strengths } = useStrengthState();
  const { fetchStrengths } = useStrengthActions();

  useEffect(() => {
    if (strengths.length) return;
    fetchStrengths(undefined);
  }, [strengths, fetchStrengths]);

  useEffect(() => {
    const params = pathname.substr(1).split('/');
    const categoryId = params[1];
    const lessonId = params[2];

    const categoryUnavailable = categoryId && !getCategory(categoryId);
    const lessonUnavailable = lessonId && !getLesson(lessonId);

    if (categoryUnavailable || lessonUnavailable) {
      navigate(`/learn/${categoryUnavailable ? '' : categoryId}`);
      addToast(t('app.errors.content_unavailable'), true);
    }
  }, [language]);

  return !strengths.length ? (
    <SpinnerView />
  ) : (
    <Fragment>
      <MenuBar />
      <Router>
        <LearnLanding default path={routes.learn.rootPath()} />
        <LearnCategory path={routes.learn.category({ categoryId: ':categoryId' })} />
        <LearnLesson
          path={routes.learn.lesson({ categoryId: ':categoryId', lessonId: ':lessonId' })}
        />
      </Router>
    </Fragment>
  );
};

export default withErrorBoundary(Learn);
