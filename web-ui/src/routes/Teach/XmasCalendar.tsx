import React from 'react';

import BannerCard from './BannerCard';
import Heading from 'components/Heading';

interface Props {
  calendar: {
    name: string;
    description: string;
    slug: string;
  };
}

const XmasCalendar: React.FC<Props> = ({ calendar }) => {
  return (
    <section>
      <Heading as="h2" appearAs="h3" align="center">
        {calendar.name}
      </Heading>
      <BannerCard
        desc={calendar.description}
        iconColor="red"
        iconName="christmasBells"
        href={calendar.slug}
      />
    </section>
  );
};

export default XmasCalendar;
