import React from 'react';
import styled from 'styled-components';

import IconButton from 'components/buttons/IconButton';
import Heading from 'components/Heading';

import { color, spacing } from 'theme';
import { ICONS } from 'types/icon';

interface Props {
  title: string;
  icon?: ICONS;
  close?: () => void;
  action?: () => void;
}

const PanelHeader: React.FC<Props> = ({ title, icon = 'close', close, action }) => (
  <HeaderGrid>
    <StyledIconButton
      data-test-id="panel-action-button"
      iconName={icon}
      onClick={action || close}
      primary
    />

    <StyledHeading forwardedAs="h1" appearAs="h4">
      {title}
    </StyledHeading>
  </HeaderGrid>
);

const HeaderGrid = styled.header`
  align-items: center;
  background: ${color('hoverGreen')};
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr auto 1fr;
  min-height: ${spacing('navbar')};
  padding: 0 ${spacing('md')};
`;

const StyledIconButton = styled(IconButton)`
  background-color: ${color('hoverGreen')};
  border: 1px solid transparent;

  &:hover {
    background-color: ${color('activeGreen')};
  }

  &:focus {
    border: 1px solid ${color('white')};
  }
`;

const StyledHeading = styled(Heading)<{ appearAs: string }>`
  color: ${color('white')};
`;

export default PanelHeader;
