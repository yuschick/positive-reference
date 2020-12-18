import React from 'react';

import StrengthImage from 'components/StrengthImage';

const StrengthSticker = ({ strength, size = 'md', ...props }) => {
  const sizes = {
    sm: '48px',
    md: '64px',
  };

  return (
    <StrengthImage
      sizes={sizes[size]}
      slug={strength.slug}
      alt={strength.slug}
      backgroundColor={strength.color}
      borderRadius="circle"
      {...props}
    />
  );
};

export default StrengthSticker;
