import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Flex from './Flex';
import Icon from './Icon';
import Image from './Image';

interface ICache {
  [x: string]: string;
}

// TODO: Implement app-wide cache per session, perhaps save the thumbnail url's in the lesson context
const cache: ICache = {};

interface Props {
  videoUrl: string;
  alt: string;
  fullWidth?: boolean;
}

const VimeoThumbnail: React.FC<Props> = ({ videoUrl, alt, fullWidth = false }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();

  useEffect(() => {
    fetchThumbnailUrl(videoUrl);
  }, [videoUrl]);

  const fetchThumbnailUrl = (videoUrl: string) => {
    if (cache[videoUrl]) {
      setThumbnailUrl(cache[videoUrl]);
    }

    window
      .fetch(`https://vimeo.com/api/oembed.json?url=${videoUrl}`)
      .then(response => response.json())
      .then(data => {
        if (data.thumbnail_url) {
          setThumbnailUrl(data.thumbnail_url);
          cache[videoUrl] = data.thumbnail_url;
        }
      });
  };

  return thumbnailUrl ? (
    <Flex center relative>
      <Image src={thumbnailUrl} alt={alt} fullWidth={fullWidth} />

      <StyledIcon name="play" color="white" bold size="30px" />
    </Flex>
  ) : null;
};

const StyledIcon = styled(Icon)`
  position: absolute;

  svg {
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.125));
  }
`;

export default VimeoThumbnail;
