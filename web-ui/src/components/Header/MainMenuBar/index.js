import React from 'react';
import { useLocation } from '@reach/router';
import { useTheme } from 'styled-components';
import { useGroupState } from 'positive-store';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import { color, spacing } from 'theme';

import Flex from 'components/Flex';
import Text from 'components/Text';
import GroupMenu from 'components/GroupMenu';
import Link from 'components/Link';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

import { useGroupModal } from 'context/GroupModalContext/GroupModalContext';
import { useSession } from 'context/SessionContext/SessionContext';
import UserMenu from 'components/Header/MainMenuBar/UserMenu';

import { ReactComponent as Logo } from 'assets/logos/logo-white.svg';
import { ReactComponent as LogoIcon } from 'assets/logos/logo-white-icon.svg';

const MainMenuBar = props => {
  const { user } = useSession();
  const { restrictedAccount } = useGroupState();
  const { createNewGroup } = useGroupModal();

  const { pathname } = useLocation();
  const { appMaxWidth, spacingValue } = useTheme();
  const { t } = useTranslation();
  const isMobileBreakpoint = useMobileBreakpoint();

  const paths = [
    {
      path: '/',
      isActive: pathname === '/',
    },
    {
      path: '/see-the-good',
      name: t('route.see_the_good'),
      isActive: pathname.indexOf('/see-the-good') === 0,
    },
  ];

  if (!restrictedAccount) {
    paths.push(
      {
        path: '/learn',
        name: t('route.learn'),
        isActive: pathname.indexOf('/learn') === 0,
      },
      {
        path: '/teach',
        name: t('route.teach'),
        isActive: pathname.indexOf('/teach') === 0,
      }
    );
  }

  return (
    <Flex relative fullWidth height="navbar" center backgroundColor="hoverGreen" {...props}>
      <Flex
        width={appMaxWidth}
        paddingRight="lg"
        fullHeight
        alignCenter
        justifyContent="space-between"
      >
        <RootLink
          key={paths[0].path}
          selected={paths[0].isActive || restrictedAccount}
          to={!restrictedAccount ? paths[0].path : undefined}
        >
          {isMobileBreakpoint ? (
            <LogoIcon style={{ width: '66px', height: `${spacingValue.navbar}px` }} />
          ) : (
            <Logo style={{ width: '152px', height: `${spacingValue.navbar}px` }} />
          )}
        </RootLink>

        {user && !isMobileBreakpoint && (
          <NavMenu>
            {paths.slice(1).map(({ path, name, isActive }) => (
              <StyledLink key={path} to={path} selected={isActive}>
                <Text appearAs="h4" color="white">
                  {name}
                </Text>
              </StyledLink>
            ))}
          </NavMenu>
        )}

        {isMobileBreakpoint && <GroupMenu onCreateGroup={createNewGroup} />}

        <UserMenu paths={paths.slice(1)} />
      </Flex>
    </Flex>
  );
};

const NavMenu = styled.nav`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const StyledLink = styled(Link).attrs(({ selected }) => ({
  tabIndex: selected ? '-1' : 0,
}))`
  align-items: center;
  background: ${({ selected }) => selected && color('green')};
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  display: flex;
  height: 100%;
  padding: 0 ${spacing('lg')};

  &:focus {
    background: ${color('green')};
    outline: 1px solid ${color('green')};
  }
`;

const RootLink = styled(StyledLink)`
  background: transparent;
`;

export default MainMenuBar;
