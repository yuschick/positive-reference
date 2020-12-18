import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useStrengthState } from 'positive-store';

import useWindowSize from 'utils/useWindowSize';

interface Props {
  isActive: boolean;
  isContinuous?: boolean;
  onEnd?: () => void;
}

const ConfettiContainer: React.FunctionComponent<Props> = ({
  isActive,
  isContinuous = false,
  onEnd,
}) => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const windowSize = useWindowSize();
  const { stgStrengths } = useStrengthState();

  const confettiColors = stgStrengths && stgStrengths.map(({ color }) => color);

  useEffect(() => {
    if (isActive || isComplete) return;
    setIsComplete(true);
    onEnd && onEnd();
  }, [isActive, isComplete, onEnd]);

  return (
    <Confetti
      {...windowSize}
      numberOfPieces={750}
      tweenDuration={25000}
      colors={confettiColors}
      recycle={isContinuous}
      onConfettiComplete={onEnd}
    />
  );
};

export default ConfettiContainer;
