import { useEffect, useRef } from 'react';

const useEffectExceptOnMount = (effect, dependencies) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, dependencies);
};

export default useEffectExceptOnMount;
