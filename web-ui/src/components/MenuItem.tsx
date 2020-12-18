import React from 'react';
import styled, { css } from 'styled-components';

import Flex from 'components/Flex';
import Text from 'components/Text';
import Icon from 'components/Icon';
import IconButton from 'components/buttons/IconButton';
import { color, spacing } from 'theme';

import { ICONS } from 'types/icon';
import { COLOR_NAME } from 'types/theme';

interface BasicProps {
  title: string;
  description: string;
  className?: string;
  iconName?: ICONS;
  isSelected?: boolean;
  isAction?: boolean;
  isAlert?: boolean;
  onClick: () => void;
}

interface IconButtonProps extends BasicProps {
  iconButtonName: ICONS;
  iconButtonAriaLabel?: string;
  onIconButtonClick: () => void;
}

interface MenuProps extends BasicProps {
  iconButtonName?: undefined;
  iconButtonAriaLabel?: never;
  onIconButtonClick?: never;
}

type Props = IconButtonProps | MenuProps;

const MenuItem: React.FC<Props> = ({
  title,
  description,
  className,
  iconName,
  iconButtonName,
  iconButtonAriaLabel,
  isSelected = false,
  isAction = false,
  isAlert = false,
  onIconButtonClick,
  onClick,
}) => {
  const textColor: COLOR_NAME = isAction
    ? 'green'
    : isAlert
    ? 'red'
    : isSelected
    ? 'white'
    : 'black';
  const backgroundColor: COLOR_NAME = isSelected ? 'green' : 'white';
  const backgroundHoverColor: COLOR_NAME = isAlert ? 'pink' : isSelected ? 'green' : 'lightGreen';

  return (
    <StyledFlex
      className={className}
      alignCenter
      ariaLabel={title}
      bg={backgroundColor}
      bgHover={backgroundHoverColor}
      hasIcon={iconButtonName}
      isSelected={isSelected}
      onClick={onClick}
    >
      {iconName && <StyledIcon name={iconName} color={textColor} />}

      <Flex flexSelf="1" column>
        <Text appearAs="h3" color={textColor} bold={false}>
          {title}
        </Text>

        {description && (
          <Text as="p" color={textColor}>
            {description}
          </Text>
        )}
      </Flex>

      {iconButtonName && onIconButtonClick && (
        <IconButton
          marginLeft="md"
          iconName={iconButtonName}
          ariaLabel={iconButtonAriaLabel || title}
          onClick={onIconButtonClick}
        />
      )}
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex).attrs((props): { ariaLabel: string } => ({
  ariaLabel: props.ariaLabel,
}))<{
  bg: COLOR_NAME;
  bgHover: COLOR_NAME;
  hasIcon: string;
  isSelected: boolean;
}>`
  background: ${({ bg }) => color(bg)};
  cursor: ${({ isSelected }) => (isSelected ? 'default' : 'pointer')};
  padding: ${spacing('md')} ${spacing('xl')};
  transition: background 0.2s ease-out;

  ${({ hasIcon }) =>
    hasIcon &&
    css`
      padding: ${spacing('md')};
      padding-left: ${spacing('xl')};
    `};

  &:hover {
    background-color: ${({ bgHover }) => color(bgHover)};
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${spacing('md')};
`;

MenuItem.displayName = 'MenuItem';

export default MenuItem;
