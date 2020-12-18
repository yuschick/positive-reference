import React from 'react';
import PropTypes from 'prop-types';
import { useStrengthState } from 'positive-store';

import Image from 'components/Image';
import { urlFor } from 'utils/sanity';

const StrengthImage = ({ slug, alt, sizes = '100px', className = undefined, ...props }) => {
  const { strengths } = useStrengthState();
  const { imageAsset } = strengths.find(strength => strength.slug === slug);

  if (!imageAsset) {
    return null;
  }

  const urlBuilder = urlFor(imageAsset);

  const srcSet = Array.from({ length: 20 }, (_, index) => {
    const width = (index + 1) * 100;
    return `${urlBuilder.width(width).url()} ${width}w`;
  }).join(',');

  return (
    <Image
      className={className}
      srcSet={srcSet}
      src={urlBuilder.width(100).url()}
      sizes={sizes}
      alt={alt}
      {...props}
    />
  );
};

StrengthImage.propTypes = {
  alt: PropTypes.string.isRequired,
  sizes: PropTypes.string,
  slug: PropTypes.string.isRequired,
};

export default StrengthImage;
