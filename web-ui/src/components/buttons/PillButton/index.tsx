import React from 'react';
import styled from 'styled-components';

import Icon from 'components/Icon';
import Spinner from 'components/Spinner';
import { spacing } from 'theme';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

import StyledButton from 'components/buttons/PillButton/styles';
import { ICONS } from 'types/icon';
import { Color } from 'types/theme';

interface Props {
  className?: string;
  label: string;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  title?: string;
  iconName?: ICONS;
  iconLight?: boolean;
  iconBold?: boolean;
  spinner?: boolean;
  onClick: (props?: any) => void;
  [x: string]: any;
}

const PillButton: React.FC<Props> = ({
  className,
  label,
  secondary = false,
  danger = false,
  disabled = false,
  title,
  iconName,
  iconLight,
  iconBold,
  spinner,
  onClick,
  ...props
}) => (
  <StyledButton
    className={className}
    type="button"
    secondary={secondary}
    danger={danger}
    disabled={disabled}
    ariaLabel={label}
    title={title}
    inlineFlex
    alignCenter
    justifyCenter
    minWidth={useMobileBreakpoint() ? '165px' : '295px'}
    padding="sm md"
    border="2px solid transparent"
    borderRadius="xl"
    onClick={onClick}
    {...props}
  >
    {spinner && <StyledSpinner small color={Color.white} />}

    {iconName && !spinner && (
      <StyledIcon size="18px" name={iconName} light={iconLight} bold={iconBold} />
    )}

    {label}
  </StyledButton>
);

const StyledIcon = styled(Icon)`
  margin-right: ${spacing('md')};
`;

const StyledSpinner = styled(Spinner)`
  margin-right: ${spacing('sm')};
`;

export default PillButton;
