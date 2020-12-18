import styled from 'styled-components';

import IconButton from 'components/buttons/IconButton';
import { color } from 'theme';

const StyledIconButton = styled(IconButton)`
  background-color: ${color('hoverGreen')};

  &:hover,
  &:active,
  &:focus {
    background-color: ${color('activeGreen')};
  }
`;

export { StyledIconButton };
