import React from 'react';
import styled from 'styled-components';

import Flex from 'components/Flex';
import Heading from 'components/Heading';
import VimeoThumbnail from 'components/VimeoThumbnail';
import { color, spacing, theme } from 'theme';
import { hexToRgbaString } from 'utils/helpers';

import { Lesson } from 'types/lesson';

interface Props {
  lesson: Lesson;
}

const LessonCard: React.FC<Props> = ({ lesson }) => {
  return (
    <StyledContainer column fullHeight>
      <StyledHeading forwardedAs="h3">{lesson.header}</StyledHeading>

      <ThumbnailContainer>
        <VimeoThumbnail fullWidth videoUrl={lesson.videoUrl} alt={lesson.header} />
        <StyledOverlay />
      </ThumbnailContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Flex)`
  color: ${color('black')};
  transition: color 0.2s ease-out;

  &:hover {
    color: ${color('hoverGreen')};
  }

  &:active {
    color: ${color('green')};
  }
`;

const StyledHeading = styled(Heading)`
  flex: 1;
`;

const ThumbnailContainer = styled.div`
  margin-top: ${spacing('lg')};
  position: relative;
`;

const StyledOverlay = styled.div`
  background-color: ${hexToRgbaString(theme.color.green, 0)};
  border: solid 4px ${color('yellow')};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.2s ease-out;

  ${StyledContainer}:hover & {
    background-color: ${hexToRgbaString(theme.color.green, 0.5)};
    border: solid 4px ${color('green')};
  }
`;

export default LessonCard;
