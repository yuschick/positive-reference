import React from 'react';
import { useGroupState, useMomentState, Status } from 'positive-store';

import RequireGroup from 'routes/SeeTheGood/Require/RequireGroup';
import RequireMoments from 'routes/SeeTheGood/Require/RequireMoments';
import { SpinnerView } from 'components/Spinner';

const Require = ({ requireGroup = false, requireMoments = false, children }) => {
  const { selectedGroup } = useGroupState();
  const { moments, status } = useMomentState();

  const groupOK = !requireGroup || !!selectedGroup;
  const momentsOK = !requireMoments || (moments && moments.length > 0);
  const momentsLoading = !requireMoments
    ? false
    : moments.length || status.fetchMoments === Status.loading;

  if (groupOK && momentsOK) {
    return children;
  } else if (momentsLoading) {
    return <SpinnerView />;
  } else if (!groupOK) {
    return <RequireGroup />;
  } else {
    return <RequireMoments />;
  }
};

export default Require;
