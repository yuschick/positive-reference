import React from 'react';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { useGroupState, GroupType, useTranslation } from 'positive-store';

import { appMaxWidth, breakpoint, color, fontSize, spacing } from 'theme';

import GroupModal from './Group/GroupModal';

import { ICONS_LIGHT } from 'types/icon';
import Link from 'components/Link';
import Text from 'components/Text';
import GroupMenu from 'components/GroupMenu';
import { useGroupModal } from 'context/GroupModalContext/GroupModalContext';
import Icon from 'components/Icon';

interface Props {}

const MenuBar: React.FunctionComponent<Props> = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { createNewGroup } = useGroupModal() as { createNewGroup: () => void };
  const { selectedGroup, hasSelectableGroups } = useGroupState();

  const paths: Record<
    string,
    { route: string; name: string; icon: ICONS_LIGHT; isVisible: boolean }
  > = {
    feed: {
      route: '/see-the-good',
      name: 'feed',
      icon: 'houseEntrance',
      isVisible: selectedGroup?.type === GroupType.class,
    },
    goals: {
      route: '/see-the-good/goals',
      name: 'goals',
      icon: 'buttonRecord',
      isVisible: true,
    },
    insights: {
      route: '/see-the-good/summary',
      name: 'insights',
      icon: 'barGraph',
      isVisible: selectedGroup?.type === GroupType.class,
    },
    group: {
      route: '/see-the-good/group',
      name: selectedGroup?.type === GroupType.organization ? 'organization' : 'group',
      icon: 'groupUsers',
      isVisible: true,
    },
  };

  return selectedGroup ? (
    <Wrapper>
      <NavBar>
        {Object.keys(paths)
          .filter(p => paths[p].isVisible)
          .map(p => {
            const path = paths[p];

            return (
              <StyledLink key={path.route} to={path.route} selected={pathname === path.route}>
                <Icon name={path.icon} alt={path.name} light />
                <Text as="p" appearAs="h4">
                  {t(`route.see_the_good.menu.${path.name}`)}
                </Text>
              </StyledLink>
            );
          })}

        {hasSelectableGroups && (
          <GroupMenuWrapper>
            <GroupMenu onCreateGroup={createNewGroup} />
          </GroupMenuWrapper>
        )}
      </NavBar>

      <GroupModal />
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  background: ${color('white')};
  border-top: 1px solid ${color('lightGrey')};
  bottom: 0;
  height: ${spacing('xxl')};
  position: fixed;
  width: 100%;
  z-index: 1;

  @media (min-width: ${breakpoint('sm')}) {
    border-bottom: 1px solid ${color('lightGrey')};
    border-top: 0;
    height: ${spacing('navbar')};
    position: sticky;
    top: ${spacing('navbar')};
  }
`;

const NavBar = styled.nav`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${appMaxWidth};
  padding: 0 ${spacing('md')};
  position: relative;
  width: 100%;

  @media (min-width: ${breakpoint('sm')}) {
    justify-content: center;
    padding: 0 ${spacing('lg')};
  }
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-gap: ${spacing('xs')};
  padding: ${spacing('sm')} ${spacing('md')};
  place-items: center;

  p {
    font-size: ${fontSize('xxs')};
    text-transform: capitalize;
  }

  p,
  svg {
    color: ${({ selected }) => color(selected ? 'green' : 'grey')};
    transition: color 0.2s ease-in-out;
  }

  :hover {
    p,
    svg {
      color: ${color('hoverGreen')};
    }
  }

  @media (min-width: ${breakpoint('sm')}) {
    p {
      font-size: ${fontSize('xs')};
      text-transform: uppercase;
    }

    span {
      display: none;
    }
  }
`;

const GroupMenuWrapper = styled.div`
  display: none;
  height: 100%;
  position: absolute;
  right: ${spacing('lg')};
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: ${breakpoint('sm')}) {
    display: block;
  }
`;

export default MenuBar;
