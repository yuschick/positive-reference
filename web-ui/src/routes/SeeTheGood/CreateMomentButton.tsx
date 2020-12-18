import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'positive-store';

import IconButton from 'components/buttons/IconButton';

import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { breakpoint, spacing } from 'theme';

interface Props {
  isPositioned?: boolean;
  onClick: () => void;
}

const CreateMomentButton: React.FunctionComponent<Props> = ({ isPositioned = false, onClick }) => {
  const { t } = useTranslation();
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <StyledIconButton
      data-test-id="create-moment-button"
      isPositioned={isPositioned}
      aria-controls="moment-modal"
      aria-label={t('route.see_the_good.actions.spot_strength')}
      iconName="add"
      large={!isMobileBreakpoint}
      medium={isMobileBreakpoint}
      onClick={onClick}
      primary
    />
  );
};

const StyledIconButton = styled(IconButton)<{ isPositioned: boolean }>`
  ${({ isPositioned }) =>
    isPositioned
      ? css`
          bottom: calc(${spacing('xxl')} + ${spacing('lg')});
          position: absolute;
          right: ${spacing('lg')};
          z-index: 1;

          @media (min-width: ${breakpoint('sm')}) {
            bottom: ${spacing('xl')};
            right: ${spacing('xl')};
          }
        `
      : css`
          position: static;
        `};
`;

export default CreateMomentButton;
