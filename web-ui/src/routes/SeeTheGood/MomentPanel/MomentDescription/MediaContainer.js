import React, { Fragment } from 'react';
import loadImage from 'blueimp-load-image';
import { useTranslation } from 'positive-store';

import { apiBaseUrl } from 'config';
import Div from 'components/Div';
import Dropzone from 'components/Dropzone';
import Flex from 'components/Flex';
import IconButton from 'components/buttons/IconButton';
import PillButton from 'components/buttons/PillButton';
import StrengthImage from 'components/StrengthImage';
import { Video } from 'components/Element';

require('blueimp-canvas-to-blob');

const MediaContainer = ({ strength, moment, onMediaDrop }) => {
  const { t } = useTranslation();
  const { mediaUrl, mediaType, mediaFile } = moment;

  const onDrop = files => {
    const file = files && files.length && files[0];

    if (!file) {
      onMediaDrop();
      return;
    }

    if (file.type.indexOf('image') === 0) {
      // Load image into canvas to orientate, compress and scale before upload.
      loadImage(
        file,
        canvas => {
          if (canvas.toBlob) {
            // Quality ~80% keeps the image reasonably smooth on some browsers (Chrome, Firefox).
            canvas.toBlob(onMediaDrop, 'image/jpeg', 0.8);
          } else {
            onMediaDrop(file);
          }
        },
        {
          canvas: true,
          orientation: true,

          // Image will be scaled down to these values. Maintains aspect ratio.
          maxWidth: 2000,
          maxHeight: 2000,
        }
      );
    } else {
      onMediaDrop(file);
    }
  };

  return (
    <Div relative minHeight="240px">
      <Flex absolute full top="0" center backgroundColor={strength.color} overflow="hidden">
        {mediaUrl ? (
          mediaType === 'image' ? (
            <Div
              width="90%"
              height="90%"
              backgroundImage={`url(${!mediaFile ? apiBaseUrl : ''}${mediaUrl})`}
              backgroundSize="contain"
              backgroundPosition="center"
            />
          ) : (
            <Video
              width="90%"
              height="90%"
              src={`${mediaUrl}#t=0.1`}
              preload="metadata"
              outline="none"
              playsInline
              poster="/movies-film.png"
            />
          )
        ) : (
          <StrengthImage slug={strength.slug} alt={strength.name} sizes="240px" />
        )}
      </Flex>

      <Dropzone
        absolute
        full
        top="0"
        accept="image/jpeg, image/png"
        Content={({ mediaUrl, attachMediaLabel, onDrop }) => (
          <Flex full center>
            <Flex absolute bottom="md" right="md">
              {mediaUrl ? (
                <Fragment>
                  <IconButton iconName="photo" boxShadow="photoOverlay" />

                  <IconButton
                    marginLeft="md"
                    iconName="bin"
                    boxShadow="photoOverlay"
                    ariaLabel={t('route.see_the_good.actions.delete.photo')}
                    onClick={event => {
                      event.stopPropagation();
                      onDrop();
                    }}
                  />
                </Fragment>
              ) : (
                <PillButton
                  secondary
                  label={attachMediaLabel}
                  iconName="photo"
                  minWidth="none"
                  border="none"
                />
              )}
            </Flex>
          </Flex>
        )}
        contentProps={{
          strength,
          mediaUrl,
          attachMediaLabel: t('route.see_the_good.actions.attach_media'),
          onDrop,
        }}
        onDrop={onDrop}
      />
    </Div>
  );
};

export default MediaContainer;
