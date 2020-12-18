import React from 'react';

import Image from 'components/Image';
import useSanityIllustration from 'api/useSanityIllustration';

interface Props {
  alt: string;
  slug: string;
  sizes?: string;
}

const SanityIllustration: React.FC<Props> = ({ slug, alt, sizes = '100px', ...props }) => {
  const { urlBuilder } = useSanityIllustration({ slug });

  const srcSet: string = Array.from({ length: 20 }, (_, index) => {
    const width: number = (index + 1) * 100;
    return `${urlBuilder.width(width).url()} ${width}w`;
  }).join(',');

  return (
    <Image srcSet={srcSet} src={urlBuilder.width(100).url()} sizes={sizes} alt={alt} {...props} />
  );
};

export default SanityIllustration;
