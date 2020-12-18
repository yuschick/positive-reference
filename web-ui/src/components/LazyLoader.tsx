import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Div from 'components/Div';

interface Props {
  onAppear: () => void;
}

const LazyLoader: React.FC<Props> = ({ onAppear, children }) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    inView && onAppear();
  }, [inView, onAppear]);

  return <Div refKey={ref}>{children}</Div>;
};

export default LazyLoader;
