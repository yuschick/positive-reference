import React from 'react';
import { useTranslation } from 'positive-store';

import BannerCard from './BannerCard';
import Heading from 'components/Heading';

interface Props {
  cv: {
    name: string;
    description: string;
    slug: string;
  };
}

const PositiveCV: React.FC<Props> = ({ cv }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading as="h2" appearAs="h3" align="center">
        {t('route.teach.how_to_find_strengths')}
      </Heading>
      <BannerCard
        title={cv.name}
        desc={cv.description}
        iconColor="yellow"
        iconName="positiveCV"
        href={cv.slug}
      />
    </section>
  );
};

export default PositiveCV;
