import React from 'react';
import { string, arrayOf, shape, bool } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'positive-store';

import StrengthSection from '../StrengthSection';
import Accordion from 'components/Accordion';
import Strengths from 'routes/Teach/StrengthCards';

const PropTypes = {
  hasWaves: bool,
  packages: arrayOf(
    arrayOf(
      shape({
        color: string.isRequired,
        name: string.isRequired,
        slug: string.isRequired,
        description: string,
      })
    )
  ).isRequired,
};

const Waves = ({ hasWaves, packages }) => {
  const { t } = useTranslation();

  return (
    <StrengthSection
      title={t(hasWaves ? 'route.teach.wave_of_strengths' : 'route.teach.more_strengths')}
      description={hasWaves && t('route.teach.waves_desc')}
    >
      {packages.map((pkg, i) => {
        const strengths = pkg.map(s => s.name).join(', ');
        return (
          <Accordion
            key={uuidv4()}
            title={
              hasWaves ? t('route.teach.wave', { num: i + 1, strengthName: strengths }) : strengths
            }
          >
            <Strengths.Wrapper>
              {pkg.map(s => (
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
          </Accordion>
        );
      })}
    </StrengthSection>
  );
};

Waves.propTypes = PropTypes;

export default Waves;
