import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Moment, Strength } from 'positive-store';

import FullscreenButton from './FullScreenButton';
import MomentCelebrationImage from './MomentCelebrationImage';

import { apiBaseUrl } from 'config';

import Image from 'components/Image';
import Spinner from 'components/Spinner';
import StrengthImage from 'components/StrengthImage';

import { Color } from 'types/theme';

interface Props {
  moment: Moment;
  strength: Strength;
  isTempMoment: boolean;
  isCompletedGoalMoment: boolean;
  onFullScreen: ({ moment }: { moment: Moment }) => void;
}

const MomentMedia: React.FunctionComponent<Props> = ({
  moment,
  strength,
  isTempMoment,
  isCompletedGoalMoment,
  onFullScreen,
}) => {
  const hasOwnMedia = !isCompletedGoalMoment && moment.mediaUrl && moment.mediaType;
  const canGoFullScreen = !isTempMoment && !!onFullScreen;

  return (
    <MediaContainer
      strengthColor={strength.color}
      canGoFullScreen={canGoFullScreen}
      onClick={() => canGoFullScreen && onFullScreen({ moment })}
    >
      {hasOwnMedia ? (
        moment.mediaType === 'image' && (
          <Image
            data-test-id="moment-photo"
            src={`${apiBaseUrl}${moment.mediaUrl}`}
            maxWidth="100%"
            maxHeight="75vh"
            cursor="pointer"
            alt={strength.slug}
          />
        )
      ) : isCompletedGoalMoment ? (
        <MomentCelebrationImage strengthName={strength.name} />
      ) : (
        <Fragment>
          {isTempMoment && <ImageLoadingSpinner color={Color.white} />}
          <StyledStrengthImage
            progress={isTempMoment}
            slug={strength.slug}
            alt={strength.name}
            sizes="240px"
          />
        </Fragment>
      )}

      {canGoFullScreen && (
        <FullscreenButton
          onClick={event => {
            event.stopPropagation();
            canGoFullScreen && onFullScreen({ moment });
          }}
        />
      )}
    </MediaContainer>
  );
};

const MediaContainer = styled.div<{ strengthColor: string; canGoFullScreen: boolean }>`
  align-content: center;
  align-items: center;
  background: ${({ strengthColor }) => strengthColor};
  cursor: ${({ canGoFullScreen }) => canGoFullScreen && 'pointer'};
  display: flex;
  grid-area: media;
  height: 100%;
  justify-content: center;
  max-height: 100%;
  min-height: 100%;
  position: relative;
  text-align: center;
  width: 100%;
`;

const ImageLoadingSpinner = styled(Spinner)`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50% -50%);
  z-index: 1;
`;

const StyledStrengthImage = styled(StrengthImage)`
  filter: ${({ progress }) => progress && 'blur(5px)'};
`;

export default MomentMedia;
