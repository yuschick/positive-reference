import React, { useEffect, useMemo, useRef, useState } from 'react';
import screenfull from 'screenfull';
import useComponentSize from '@rehooks/component-size';

import Div from 'components/Div';
import IconButton from 'components/buttons/IconButton';
import ModalContainer from 'components/ModalContainer';
import MomentCarousel from 'routes/SeeTheGood/Feed/MomentSlideshow/MomentCarousel';
import { useCurrentMomentID } from 'context/MomentSlideshowContext/MomentSlideshowContext';

const MomentSlideshow = ({ moments, onLoadMoreTrigger, onCloseTrigger }) => {
  const currentMomentID = useCurrentMomentID();

  // We need to set the container ref after mounting the modal, use this state to trigger re-render:
  const isMountedState = useState(false);

  const containerRef = useRef(undefined);

  const containerSize = useComponentSize(containerRef);

  const reversedMoments = useMemo(() => [...moments].reverse(), [moments]);

  const reversedMomentIndex = useMemo(
    () => reversedMoments.findIndex(({ id }) => id === currentMomentID),
    [reversedMoments, currentMomentID]
  );

  useEffect(() => {
    if (screenfull.isEnabled) {
      const onScreenfullChange = () => {
        !screenfull.isFullscreen && onCloseTrigger();
      };
      screenfull.on('change', onScreenfullChange);

      reversedMomentIndex >= 0 ? screenfull.request(containerRef.current) : screenfull.exit();

      return () => screenfull.off('change', onScreenfullChange);
    }
  }, [reversedMomentIndex]);

  return (
    <ModalContainer
      id="moment-slideshow"
      isOpen={reversedMomentIndex >= 0}
      backdropOpacity={1}
      transitionDuration={0}
      onCloseTrigger={onCloseTrigger}
      onMount={() => isMountedState[1](true)}
    >
      <Div refKey={containerRef} fixed top="0" right="0" bottom="0" left="0" backgroundColor="#000">
        <MomentCarousel
          width={containerSize.width}
          height={containerSize.height}
          moments={reversedMoments}
          initialMomentIndex={reversedMomentIndex}
          onLoadMoreTrigger={onLoadMoreTrigger}
        />

        <IconButton
          absolute
          top="lg"
          right="lg"
          iconName="fullscreenExit"
          dark={true}
          onClick={onCloseTrigger}
        />
      </Div>
    </ModalContainer>
  );
};

export default MomentSlideshow;
