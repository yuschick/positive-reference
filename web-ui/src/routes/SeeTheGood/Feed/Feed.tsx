import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  useStrengthState,
  useGroupState,
  useMomentState,
  useMomentActions,
  useGoalState,
  useGoalActions,
  Status,
  Moment,
  useTranslation,
} from 'positive-store';

import { classRoles } from 'config';
import { breakpoint, spacing } from 'theme';

import MomentSlideshow from './MomentSlideshow';

import MomentCard from 'components/MomentCard';
import Page from 'components/Page';
import LazyLoader from 'components/LazyLoader';
import Spinner, { SpinnerView } from 'components/Spinner';
import { CrowTip, CrowTipBanner } from 'components/CrowTip';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

import { useSession } from 'context/SessionContext/SessionContext';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import MenuBar from 'routes/SeeTheGood/MenuBar';
import RequireGroup from 'routes/SeeTheGood/Require/RequireGroup';
import RequireMoments from 'routes/SeeTheGood/Require/RequireMoments';
import { useUpdateCurrentMomentID } from 'context/MomentSlideshowContext/MomentSlideshowContext';

interface Props {
  editMoment: ({ moment }: { moment: Moment }) => void;
  openMomentPanel: () => void;
}

const Feed: React.FunctionComponent<Props> = ({ editMoment, openMomentPanel }) => {
  const [groupedMoments, setGroupedMoments] = useState<Moment[]>([]);

  const updateSlideshowMomentID = useUpdateCurrentMomentID();
  const isMobileBreakpoint = useMobileBreakpoint();

  const { goals } = useGoalState();
  const { fetchGoals } = useGoalActions();
  const { selectedGroup, selectedGroupId, groups } = useGroupState();
  const { stgStrengths, strengths } = useStrengthState();
  const {
    moments,
    firstMomentFlag,
    moreMomentsExist,
    status,
    tempMoments,
    cursor,
  } = useMomentState();
  const { setFirstMomentFlag, fetchMoments } = useMomentActions();
  const { t } = useTranslation();

  const { user } = useSession() as { user: any };
  const { trackEvent } = useAnalytics();

  const isManager = selectedGroup?.userRole === classRoles.manager;

  const onFullscreenClick = ({ moment }: { moment: Moment }) => {
    trackEvent({ category: 'See the Good', action: 'Enter moment fullscreen' });
    updateSlideshowMomentID(moment.id);
  };

  const onMomentEditClick = ({ moment }: { moment: Moment }) => {
    editMoment(moment);
    trackEvent({ category: 'See the Good', action: 'Open edit moment modal' });
  };

  const loadMoreMoments = () => {
    if (selectedGroup && cursor) {
      fetchMoments({ groupId: selectedGroupId, cursor });
    }
  };

  const onLoadMoreMomentsTrigger = ({ momentID }: { momentID: string }) => {
    if (moreMomentsExist) {
      updateSlideshowMomentID(momentID);
      loadMoreMoments();
    }
  };

  useEffect(() => {
    if (!selectedGroupId) return;
    fetchGoals({ groupId: selectedGroupId });
  }, [selectedGroupId, fetchGoals]);

  useEffect(() => {
    if (!moments.length) return;
    const baseMoments = [...moments];
    const allGoalIds: string[] = [];

    const grouped = baseMoments
      .map(moment => {
        if (moment.goalId && !allGoalIds.includes(moment.goalId)) {
          allGoalIds.push(moment.goalId);
          const allGoalMoments = baseMoments.filter(m => m.goalId === moment.goalId);
          const goal = goals.find(g => g.id === moment.goalId);
          const isGoalComplete = goal && goal.actTargetCount >= allGoalMoments.length;

          return {
            ...moment,
            goal: allGoalMoments,
            isGoalComplete,
          };
        }

        if (!moment.goalId) return moment;

        return false;
      })
      .filter(m => m);

    setGroupedMoments(grouped);
  }, [moments, goals]);

  return !strengths.length || status.fetchMoments === Status.loading ? (
    <SpinnerView />
  ) : (
    <Fragment>
      <Helmet>
        <title>{`${t('route.see_the_good')} | Positive`}</title>
      </Helmet>

      <MenuBar />

      {!groups.length && <RequireGroup />}

      {selectedGroup && !moments.length && <RequireMoments openMomentPanel={openMomentPanel} />}

      {!!groups.length && !!moments.length && (
        <StyledPage>
          {firstMomentFlag &&
            (isMobileBreakpoint ? (
              <CrowTipBanner
                tips={[
                  t('route.see_the_good.feed.first_moment_tip', { groupName: selectedGroup.name }),
                ]}
                onDismiss={() => setFirstMomentFlag(false)}
              />
            ) : (
              <StyledCrowTip
                tips={[
                  t('route.see_the_good.feed.first_moment_tip', { groupName: selectedGroup.name }),
                ]}
                hideArrow
                onDismiss={() => setFirstMomentFlag(false)}
              />
            ))}

          <MomentsContainer>
            {tempMoments
              .filter(tempId => moments.find(momentId => tempId === momentId))
              .map(tmp => {
                const strength = stgStrengths?.find(s => s.slug === tmp.strengthSlug);

                return (
                  strength && (
                    <MomentCard key={tmp.id} moment={tmp} strength={strength} isTempMoment />
                  )
                );
              })}
            {groupedMoments.map(moment => {
              const isOwner = moment.creatorId === user.id;
              const strength = stgStrengths?.find(s => s.slug === moment.strengthSlug);

              return (
                strength && (
                  <MomentCard
                    key={moment.id}
                    moment={moment}
                    strength={strength}
                    isEditable={isManager || isOwner}
                    onFullScreen={onFullscreenClick}
                    onEdit={onMomentEditClick}
                    isCompletedGoalMoment={moment.isGoalComplete}
                  />
                )
              );
            })}

            {moreMomentsExist && (
              <LazyLoader onAppear={loadMoreMoments}>
                <SpinnerWrapper>
                  <Spinner center />
                </SpinnerWrapper>
              </LazyLoader>
            )}
          </MomentsContainer>
        </StyledPage>
      )}

      <MomentSlideshow
        moments={groupedMoments}
        onLoadMoreTrigger={onLoadMoreMomentsTrigger}
        onCloseTrigger={() => updateSlideshowMomentID(undefined)}
      />
    </Fragment>
  );
};

const StyledPage = styled(Page)`
  padding: 0;
  padding-bottom: ${spacing('xxxl')};
  width: 100%;

  @media (min-width: ${breakpoint('sm')}) {
    max-width: max-content;
    padding: ${spacing('lg')} ${spacing('lg')} ${spacing('xxxl')};
    width: auto;
  }
`;

const StyledCrowTip = styled(CrowTip)`
  margin: 0 auto ${spacing('xxl')} auto;
`;

const MomentsContainer = styled.section`
  max-width: 842px;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  margin: 0 auto;
  padding: ${spacing('lg')};
`;

export default Feed;
