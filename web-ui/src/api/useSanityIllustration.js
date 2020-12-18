import { useEffect, useState } from 'react';

import useSanityApi from 'api/useSanityApi';
import { urlFor } from 'utils/sanity';

const illustrationQuery = `
*[_type == "illustration" && slug.current == $slug]{...image}[0]
`;

const placeholderImage = 'image-ec5fec5aca3a46957ddbae0cb721f4b1fe4ceb7d-100x100-png';

const placeholderBuilder = urlFor(placeholderImage)
  .bg('FFFF')
  .fit('fillmax');

/**
 * A hook that takes an illustration slug and returns an `ImageUrlBuilder` for it.
 * See https://www.sanity.io/docs/image-url for `ImageUrlBuilder` documentation.
 *
 * Returns an URL builder for a placeholder image before the actual image has loaded
 *
 * @param slug
 * @returns {{isLoading: boolean, urlBuilder: ImageUrlBuilder, error: (error|undefined)}}
 */
const useSanityIllustration = ({ slug }) => {
  const [urlBuilder, setUrlBuilder] = useState(placeholderBuilder);

  const [{ isComplete, isLoading, data, error }] = useSanityApi(illustrationQuery, { slug });

  useEffect(() => {
    if (isComplete && data) {
      setUrlBuilder(data ? urlFor(data) : placeholderBuilder);
    }
  }, [isComplete]);

  return {
    isLoading,
    urlBuilder,
    error,
  };
};

export default useSanityIllustration;
