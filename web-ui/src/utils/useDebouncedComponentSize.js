import { useEffect } from 'react';
import useComponentSize from '@rehooks/component-size';
import { useDebounce } from '@react-hook/debounce';

const useDebouncedComponentSize = (containerRef, wait = 250, leading = false) => {
  const size = useComponentSize(containerRef);

  const [debounced, setDebounced] = useDebounce(size, wait, leading);

  useEffect(() => setDebounced(size), [size]);

  return debounced;
};

export default useDebouncedComponentSize;
