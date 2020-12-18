import Url from 'url-parse';
import { useLocation } from '@reach/router';
import { useEffect, useState } from 'react';

const useUrl = () => {
  const { href } = useLocation();

  const [url, setUrl] = useState(new Url(href, true));

  useEffect(() => {
    setUrl(new Url(href, true));
  }, [href]);

  return url;
};

export default useUrl;
