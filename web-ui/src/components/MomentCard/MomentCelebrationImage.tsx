import React from 'react';
import { useTranslation } from 'positive-store';

import SanityIllustration from 'components/SanityIllustration';

interface Props {
  strengthName: string;
}

const MomentCelebrationImage: React.FunctionComponent<Props> = ({ strengthName }) => {
  const { t } = useTranslation();

  const sanityCelebrationImageSlugs = [
    'balloons-1',
    'balloons-2',
    'celebration',
    'leaves-1',
    'leaves-2',
    'leaves-3',
    'leaves-4',
    'stars-1',
    'stars-2',
    'stars-3',
    'stars-4',
  ];

  const randomImageSlug =
    sanityCelebrationImageSlugs[~~(sanityCelebrationImageSlugs.length * Math.random())];

  return (
    <SanityIllustration
      alt={`${t('route.see_the_good.goals.celebrations.complete')} - ${strengthName}`}
      slug={randomImageSlug}
      sizes="350px"
    />
  );
};

export default MomentCelebrationImage;
