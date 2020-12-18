import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import SanityIllustration from 'components/SanityIllustration';
import { color } from 'theme';

interface Props {
  flip?: boolean;
  small?: boolean;
  className?: string;
}

interface Position {
  top: string;
  left: string;
}

const CrowJoySticker: React.FC<Props> = ({ flip = false, small = false, className }) => {
  const { t } = useTranslation();

  const transform = `scaleX(${flip ? '-1' : '1'})`;
  const scale = small ? 0.4 : 1;
  const stickerSize = `${160 * scale}px`;
  const imageSize = `${170 * scale}px`;
  const imageTop = `${20 * scale}px`;
  const imageLeft = `${-10 * scale}px`;

  return (
    <StyledContainer size={stickerSize} transform={transform} className={className}>
      <StyledSanityIllustration
        top={imageTop}
        left={imageLeft}
        slug="joy"
        alt={t('app.crow_tip')}
        sizes={imageSize}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ size: string; transform: string }>`
  position: relative;
  width: ${props => props.size};
  height: ${props => props.size};
  flex-shrink: 0;
  border-radius: 100%;
  background-color: ${color('yellow')};
  overflow: hidden;
  transform: ${props => props.transform};
`;

const StyledSanityIllustration = styled(SanityIllustration)<Position>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
`;

export default CrowJoySticker;
