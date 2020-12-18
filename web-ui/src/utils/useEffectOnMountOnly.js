import { useEffect, useRef } from 'react';

const useEffectOnMountOnly = (effect, dependencies) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      return effect();
    }
  }, dependencies);
};

export default useEffectOnMountOnly;
