import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'positive-store';

import StrengthSection from '../StrengthSection';
import Strengths from 'routes/Teach/StrengthCards';

const PropTypes = {
  strengths: arrayOf(
    shape({
      color: string.isRequired,
      name: string.isRequired,
      slug: string.isRequired,
      description: string,
    })
  ).isRequired,
};

const PowerStrengths = ({ strengths }) => {
  const { t } = useTranslation();

  return (
    <StrengthSection
      title={t('route.teach.power_strengths')}
      description={t('route.teach.power_strengths.desc')}
    >
      <Strengths.Wrapper>
        {strengths.map(s => (
          <Strengths.Card
            key={uuidv4()}
            backgroundColor={s.color}
            title={s.name}
            image={s.slug}
            description={s.description}
            href={s.slug}
          />
        ))}
      </Strengths.Wrapper>
    </StrengthSection>
  );
};

PowerStrengths.propTypes = PropTypes;

export default PowerStrengths;
