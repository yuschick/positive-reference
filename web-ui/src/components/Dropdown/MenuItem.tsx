import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Text from 'components/Text';

import { ICONS } from 'types/icon';
import { COLOR_NAME } from 'types/theme';
import { breakpoint, color, spacing } from 'theme';

interface Props {
  title: string;
  iconName?: ICONS;
  isSelected?: boolean;
  isAction?: boolean;
  isAlert?: boolean;
  dataTestId?: string;
  onClick: () => void;
  closeMenu: () => void;
}

const MenuItem: React.FC<Props> = ({
  title,
  isSelected = false,
  isAction = false,
  isAlert = false,
  dataTestId,
  onClick,
  closeMenu,
}) => {
  const menuItem = useRef<HTMLLIElement | null>(null);
  const textColor: COLOR_NAME = isAction
    ? 'green'
    : isAlert
    ? 'red'
    : isSelected
    ? 'white'
    : 'black';
  const backgroundColor: COLOR_NAME = isSelected ? 'green' : 'white';
  const backgroundHoverColor: COLOR_NAME = isAlert ? 'pink' : isSelected ? 'green' : 'lightGreen';

  useEffect(() => {
    if (!menuItem?.current) return;
    const menuItemRef = menuItem.current;

    menuItemRef.addEventListener(
      'keypress',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          onClick();
          closeMenu();
        }
      },
      {
        passive: true,
      }
    );

    return () =>
      menuItemRef.removeEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          onClick();
          closeMenu();
        }
      });
  });

  return (
    <ItemContainer
      data-test-id={dataTestId}
      ref={menuItem}
      aria-label={title}
      bg={backgroundColor}
      bgHover={backgroundHoverColor}
      isSelected={isSelected}
      onClick={() => {
        onClick();
        closeMenu();
      }}
    >
      <Text appearAs="h3" color={textColor} bold={false}>
        {title}
      </Text>
    </ItemContainer>
  );
};

export const ItemContainer = styled.li.attrs(({ isSelected }: { isSelected: boolean }) => ({
  tabIndex: isSelected ? -1 : 0,
}))<{
  bg: COLOR_NAME;
  bgHover: COLOR_NAME;
  isSelected: boolean;
}>`
  align-items: center;
  background: ${({ bg }) => color(bg)};
  border-bottom: 1px solid ${color('lightGrey')};
  cursor: ${({ isSelected }) => (isSelected ? 'default' : 'pointer')};
  display: flex;
  padding: ${spacing('md')} ${spacing('xl')};
  transition: background 0.3s ease-out;

  &:hover,
  &:focus {
    background-color: ${({ bgHover }) => color(bgHover)};
    outline: ${({ bgHover }) => color(bgHover)};
  }

  &:last-of-type {
    border: 0;
  }

  @media (min-width: ${breakpoint('sm')}) {
    border: 0;
  }
`;

export default MenuItem;
