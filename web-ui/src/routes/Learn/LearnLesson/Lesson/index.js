import React from 'react';
import styled from 'styled-components';

import Flex from 'components/Flex';
import Heading from 'components/Heading';
import Text from 'components/Text';
import VideoPlayer from 'components/VideoPlayer';
import { spacing } from 'theme';

const Lesson = ({ lesson, autoPlay = false }) => {
  return (
    <Flex column width="700px" maxWidth="100%" alignCenter textAlign="center">
      <Heading as="h1" appearAs="h2">
        {lesson.category}
      </Heading>

      <StyledH2 forwardedAs="h2" appearAs="h1-jumbo">
        {lesson.header}
      </StyledH2>

      <VideoPlayer playing={autoPlay} controls border url={lesson.videoUrl} />

      {lesson.description && (
        <StyledText forwardedAs="p" align="left">
          {lesson.description}
        </StyledText>
      )}
    </Flex>
  );
};

const StyledH2 = styled(Heading)`
  margin: ${spacing('md')} 0 ${spacing('xl')} 0;
`;

const StyledText = styled(Text)`
  margin-top: ${spacing('xl')};
`;

export default Lesson;
