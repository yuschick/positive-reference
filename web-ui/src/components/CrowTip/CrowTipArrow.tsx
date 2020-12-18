import React from 'react';
import { useTranslation } from 'positive-store';

import ArrowImage from 'assets/pictures/arrow.png';
import Image from 'components/Image';

interface Props {
  flip?: boolean;
  rotation?: number;
  className?: string;
}

const CrowTipArrow: React.FC<Props> = ({ flip = false, rotation, className }) => {
  const { t } = useTranslation();

  const scale = flip ? 'scaleX(-1)' : undefined;
  const rotate = rotation ? `rotate(${flip ? rotation * -1 : rotation}deg)` : undefined;
  const transform = scale || rotate ? `${scale ? scale : ''} ${rotate ? rotate : ''}` : undefined;

  return (
    <Image src={ArrowImage} alt={t('app.arrow')} transform={transform} className={className} />
  );
};

export default CrowTipArrow;
