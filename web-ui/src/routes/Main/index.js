import React, { Fragment, useEffect, useState } from 'react';
import { Router, navigate, useLocation } from '@reach/router';
import { useGroupState, useGroupActions } from 'positive-store';

import AccountSettingsModal from 'components/Header/MainMenuBar/UserMenu/AccountSettingsModal';
import ConfettiContainer from 'components/ConfettiContainer';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Invitation from 'routes/Invitation';
import Landing from 'routes/Landing';
import Learn from 'routes/Learn';
import Login from 'routes/Login';
import LogLevel from 'utils/logger/LogLevel';
import SeeTheGood from 'routes/SeeTheGood';
import Teach from 'routes/Teach';
import Settings from 'routes/Settings';
import useAccountSettingsModal from 'components/Header/MainMenuBar/UserMenu/AccountSettingsModal/useAccountSettingsModal';
import { useSession } from 'context/SessionContext/SessionContext';
import { environment, routes } from 'config';
import useEffectOnMountOnly from 'utils/useEffectOnMountOnly';
import GoogleTranslateFix from 'utils/googleTranslateFix';
import { SpinnerView } from 'components/Spinner';

const Main = () => {
  /* TODO: Update this when the store is converted to statuses vs booleans */
  const [groupsFetched, setGroupsFetched] = useState(false);
  const { groups, restrictedAccount } = useGroupState();
  const { fetchGroups, setSelectedGroupId, setSelectedGroup } = useGroupActions();

  const accountSettingsModal = useAccountSettingsModal();
  const { user, loginProcess } = useSession();
  const { pathname } = useLocation();

  useEffectOnMountOnly(() => {
    GoogleTranslateFix();
  }, []);

  useEffectOnMountOnly(() => {
    fetchGroups().then(() => {
      if (!groups.length) {
        setSelectedGroupId(undefined);
        setSelectedGroup(undefined);
      }
      setGroupsFetched(true);
    });
  }, [groups, fetchGroups, setSelectedGroupId, setSelectedGroup, setGroupsFetched]);

  // HTML element is invisible by default to avoid flickering of unstyled content (FOUC).
  // At this point we can safely remove the 'invisible' class and show the content.
  useEffect(() => {
    document.querySelector('html').classList.toggle('invisible', false);
  }, []);

  useEffect(() => {
    document.getElementById('root').scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    if (user && restrictedAccount && pathname === routes.rootPath()) {
      navigate('/see-the-good');
    }
  }, [pathname]);

  // If user name does not exist (like right after signing up), prompt for the name
  // without a way to dismiss it. We need the name!
  useEffect(() => {
    if (user && (!user.givenName || !user.familyName)) {
      accountSettingsModal.updateState({ isOpen: true });
    }
  }, [user]);

  return !groupsFetched ? (
    <SpinnerView />
  ) : (
    <Fragment>
      <Header />

      <Router primary={false}>
        {user ? (
          <Fragment>
            {!restrictedAccount && <Landing default path={routes.rootPath()} />}

            <SeeTheGood path={routes.seeTheGood.rootPath()} />

            {!restrictedAccount && <Learn path={routes.learn.rootPath()} />}

            {!restrictedAccount && <Teach path={routes.teach.rootPath()} />}

            <Invitation path="invitation" />

            {environment !== 'production' && <Settings path={routes.settings.rootPath()} />}
          </Fragment>
        ) : (
          <Fragment>
            <Login default path={routes.rootPath()} />

            <Invitation path="invitation" />
          </Fragment>
        )}

        <LogLevel path="log-level/:name" />
        <LogLevel path="log-level" />
      </Router>

      {!user && loginProcess.isResolved && <Footer />}

      {user && <AccountSettingsModal fullscreen {...accountSettingsModal} />}
    </Fragment>
  );
};

export default Main;
