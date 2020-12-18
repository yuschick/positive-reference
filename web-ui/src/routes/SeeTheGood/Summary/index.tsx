import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useGroupState, useMomentState, useMomentActions, useTranslation } from 'positive-store';

import MenuBar from '../MenuBar';

import Page from 'components/Page';
import Progress from 'routes/SeeTheGood/Summary/Progress';

import RequireGroup from 'routes/SeeTheGood/Require/RequireGroup';
import RequireMoments from 'routes/SeeTheGood/Require/RequireMoments';

interface Props {
  openMomentPanel: () => void;
}

const Summary: React.FunctionComponent<Props> = ({ openMomentPanel }) => {
  const { t } = useTranslation();
  const { groups, selectedGroup, selectedGroupId } = useGroupState();
  const { moments } = useMomentState();
  const { fetchMoments } = useMomentActions();

  useEffect(() => {
    if (!selectedGroupId) return;
    fetchMoments({ groupId: selectedGroupId });
  }, [selectedGroupId, fetchMoments]);

  return (
    <Fragment>
      <Helmet>
        <title>{`${t('route.see_the_good')} | Positive`}</title>
      </Helmet>

      <MenuBar />

      {!groups.length && <RequireGroup />}
      {selectedGroup && !moments.length && <RequireMoments openMomentPanel={openMomentPanel} />}
      {!!groups.length && !!moments.length && (
        <Page>
          <Progress fullWidth title={t('route.see_the_good.progress')} />
        </Page>
      )}
    </Fragment>
  );
};

export default Summary;
