import React from 'react';

import { StyledButton, StyledIcon } from 'components/buttons/IconButton/styles';
import { ICONS, ICONS_LIGHT, ICONS_BOLD } from 'types/icon';

interface Props {
  className?: string;
  iconName: ICONS | ICONS_LIGHT | ICONS_BOLD;
  ariaLabel: string;
  disabled?: boolean;
  dark?: boolean;
  danger?: boolean;
  primary?: boolean;
  medium?: boolean;
  large?: boolean;
  light?: boolean;
  bold?: boolean;
  onClick: () => void;
  [x: string]: any;
}

const IconButton: React.FC<Props> = ({
  iconName,
  ariaLabel,
  onClick,
  className = '',
  disabled = false,
  dark = false,
  danger = false,
  primary = dark,
  medium = false,
  large = false,
  light = false,
  bold = false,
  ...props
}) => {
  const buttonSize = large ? '96px' : medium ? '60px' : '38px';
  const iconSize = large ? '40px' : medium ? '28px' : undefined;

  return (
    <StyledButton
      className={className}
      width={buttonSize}
      height={buttonSize}
      type="button"
      disabled={disabled}
      ariaLabel={ariaLabel || iconName}
      dark={dark}
      danger={danger}
      primary={primary}
      onClick={onClick}
      {...props}
    >
      {iconName && <StyledIcon size={iconSize} light={light} bold={bold} name={iconName} />}
    </StyledButton>
  );
};

export default IconButton;
