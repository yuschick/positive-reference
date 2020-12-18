import React from 'react';
import styled from 'styled-components';

import MainMenuBar from 'components/Header/MainMenuBar';
import UnauthenticatedHeader from 'components/Header/UnauthenticatedHeader';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { useSession } from 'context/SessionContext/SessionContext';

const Header = () => {
  const { loginProcess, user } = useSession();
  const isMobileBreakpoint = useMobileBreakpoint();

  return loginProcess.isResolved ? (
    <MainHeader>
      {user ? (
        <MainMenuBar zIndex={!isMobileBreakpoint ? 1 : undefined} />
      ) : (
        <UnauthenticatedHeader />
      )}
    </MainHeader>
  ) : null;
};

const MainHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
`;

export default Header;
