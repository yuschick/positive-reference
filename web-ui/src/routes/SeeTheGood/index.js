import React, { useState, Fragment, useEffect } from 'react';
import { navigate, Router, useLocation } from '@reach/router';
import {
  useStrengthActions,
  useAudienceState,
  useGroupState,
  useMomentActions,
  useMomentState,
  GroupType,
} from 'positive-store';

import CreateMomentButton from './CreateMomentButton';
import Group from './Group';
import Feed from './Feed';
import Summary from './Summary';
import MomentPanel, { MomentAction } from './MomentPanel';

import { routes } from 'config';

import ConfettiContainer from 'components/ConfettiContainer';
import Goals from 'routes/SeeTheGoodGoals';
import { isSeeTheGoodGroupPath } from 'utils/helpers';
import useSelectedGroupRoles from 'utils/useSelectedGroupRoles';
import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';

const SeeTheGood = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState();

  const { selectedGroup, selectedGroupId } = useGroupState();
  const { fetchStrengths } = useStrengthActions();
  const { defaultAudienceSlug } = useAudienceState();
  const { firstMomentFlag, moments } = useMomentState();
  const { fetchMoments, setFirstMomentFlag } = useMomentActions();

  const { pathname } = useLocation();
  const { roleValues } = useSelectedGroupRoles();

  const userIsViewer = selectedGroup?.userRole === roleValues.viewer;

  useEffect(() => {
    fetchStrengths({ audience: defaultAudienceSlug });
  }, [fetchStrengths, defaultAudienceSlug]);

  useEffect(() => {
    if (!selectedGroupId) return;

    fetchMoments({ groupId: selectedGroupId });
  }, [selectedGroupId, fetchMoments]);

  // // Dismiss first moment celebration when navigating away from Feed
  useEffectExceptOnMount(() => {
    setFirstMomentFlag(false);
  }, [pathname]);

  // If Feed and Insights are hidden, navigate to Group page (if not already there).
  if (!isSeeTheGoodGroupPath(pathname) && selectedGroup?.type === GroupType.organization) {
    navigate('/see-the-good/group');
  }

  const showCreateMomentButton = !userIsViewer && !pathname.includes('goals') && !!moments.length;

  return (
    <Fragment>
      {showCreateMomentButton && (
        <CreateMomentButton onClick={() => setShowModal(true)} isPositioned />
      )}

      <Router>
        <Feed
          default
          path={routes.seeTheGood.rootPath()}
          openMomentPanel={() => setShowModal(true)}
          editMoment={moment => {
            setSelectedMoment(moment);
            setShowModal(true);
          }}
        />

        {selectedGroupId && (
          <Fragment>
            <Summary
              path={routes.seeTheGood.summary()}
              openMomentPanel={() => setShowModal(true)}
            />

            <Group path={routes.seeTheGood.group()} />

            <Goals path={routes.seeTheGood.goals()} />
          </Fragment>
        )}
      </Router>

      <MomentPanel
        isOpen={showModal}
        moment={selectedMoment}
        setSelectedMoment={setSelectedMoment}
        actionType={selectedMoment ? MomentAction.edit : MomentAction.create}
        close={() => setShowModal(false)}
      />

      {firstMomentFlag && (
        <ConfettiContainer isActive={firstMomentFlag} onEnd={() => setFirstMomentFlag(false)} />
      )}
    </Fragment>
  );
};

export default SeeTheGood;
