import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'positive-store';

import CrowJoySticker from 'components/CrowTip/CrowJoySticker';
import Flex from 'components/Flex';
import TextButton from 'components/buttons/TextButton';
import Text from 'components/Text';
import useCrowTips from './useCrowTips';
import { breakpointModify, color, font, fontSize, spacing } from 'theme';

interface Props {
  tips: string[];
  tipId?: string;
  className?: string;
  onDismiss?: () => void;
}

const CrowTipBanner: React.FC<Props> = ({ tips, tipId, className, children, onDismiss }) => {
  const { isDismissed, dismiss } = useCrowTips();
  const { t } = useTranslation();

  if (onDismiss === undefined && tipId !== undefined) {
    onDismiss = () => dismiss(tipId);
  }

  return !isDismissed(tipId) ? (
    <StyledContainer className={className} pointer={!!onDismiss} onClick={onDismiss}>
      <CrowJoySticker small />

      <StyledFlex column alignCenter>
        {tips.map(tip => (
          <Text key={uuidv4()} appearAs="tip-small">
            {tip}
          </Text>
        ))}

        {onDismiss && <StyledTextButton>{t('app.actions.got_it')}</StyledTextButton>}
      </StyledFlex>

      {children}
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(Flex)`
  align-items: center;
  background-color: ${color('yellow')};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};
  flex-shrink: 0;
  justify-content: center;
  padding: ${spacing('lg')};
  position: relative;
  width: 100%;

  @media (max-width: ${breakpointModify('sm', -1)}) {
    padding: ${spacing('md')} ${spacing('lg')} ${spacing('md')} ${spacing('md')};
  }
`;

const StyledTextButton = styled(TextButton)`
  border: 1px solid transparent;
  color: ${color('black')};
  font-family: ${font('bold')};
  font-size: ${fontSize('xs')};
  letter-spacing: 0.075em;
  margin-top: ${spacing('md')};
  padding: ${spacing('sm')} ${spacing('md')};
  text-transform: uppercase;

  ${StyledContainer}:hover, ${StyledContainer}:focus & {
    color: ${color('hoverGreen')};
  }
  &:focus {
    border: 1px solid ${color('black')};
  }
`;

const StyledFlex = styled(Flex)`
  margin-left: ${spacing('md')};

  span + span {
    margin-top: ${spacing('sm')};
  }
`;

export default CrowTipBanner;
