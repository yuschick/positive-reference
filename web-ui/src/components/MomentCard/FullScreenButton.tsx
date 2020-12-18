import React from 'react';
import styled from 'styled-components';

import IconButton from 'components/buttons/IconButton';
import { spacing } from 'theme';

interface Props {
  onClick: (event: MouseEvent) => void;
}

const FillScreenButton: React.FC<Props> = ({ onClick }) => (
  <StyledButton
    className="icon-button"
    iconName="fullscreenEnter"
    onClick={(event: MouseEvent) => onClick(event)}
    dark
  />
);

const StyledButton = styled(IconButton)`
  position: absolute;
  right: ${spacing('lg')};
  top: ${spacing('md')};
`;

export default FillScreenButton;
