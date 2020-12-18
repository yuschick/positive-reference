import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'positive-store';

import CrowJoySticker from 'components/CrowTip/CrowJoySticker';
import CrowTipArrow from './CrowTipArrow';
import TextButton from 'components/buttons/TextButton';
import Text from 'components/Text';
import useCrowTips from './useCrowTips';
import { font, fontSize, spacing } from 'theme';

interface Props {
  tips: string[];
  tipId?: string;
  hideArrow?: boolean;
  className?: string;
  flip?: boolean;
  onDismiss?: () => void;
}

const CrowTip: React.FC<Props> = ({
  tips,
  tipId,
  hideArrow = false,
  className,
  flip = false,
  children,
  onDismiss,
}) => {
  const { isDismissed, dismiss } = useCrowTips();
  const { t } = useTranslation();

  if (onDismiss === undefined && tipId !== undefined) {
    onDismiss = () => dismiss(tipId);
  }

  return !isDismissed(tipId) ? (
    <CrowTipContainer className={className}>
      <CrowContainer flip={flip}>
        {!hideArrow && <StyledCrowTipArrow flip rotation={-20} />}

        <CrowJoySticker />
      </CrowContainer>

      {tips.map(tip => (
        <Text key={uuidv4()} appearAs="tip">
          {tip}
        </Text>
      ))}

      {onDismiss && (
        <StyledTextButton onClick={onDismiss}>{t('app.actions.got_it')}</StyledTextButton>
      )}

      {children}
    </CrowTipContainer>
  ) : null;
};

const CrowTipContainer = styled.div`
  position: relative;
  max-width: 350px;
  text-align: center;

  span + span {
    display: block;
    margin-top: ${spacing('md')};
  }
`;

const CrowContainer = styled.div<{ flip: boolean }>`
  position: absolute;

  ${({ flip }) =>
    flip
      ? css`
          right: 0;
          transform: translateX(110%) scaleX(-1);
        `
      : css`
          left: 0;
          transform: translateX(-110%);
        `}
`;

const StyledCrowTipArrow = styled(CrowTipArrow)`
  flex-shrink: 0;
  left: 75px;
  position: absolute;
  top: -75px;
`;

const StyledTextButton = styled(TextButton)`
  cursor: pointer;
  font-family: ${font('bold')};
  font-size: ${fontSize('sm')};
  letter-spacing: 0.075em;
  margin: ${spacing('lg')} auto 0 auto;
  text-transform: uppercase;
`;

export default CrowTip;
