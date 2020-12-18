import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useExerciseState, useTranslation } from 'positive-store';

import Heading from 'components/Heading';
import Text from 'components/Text';
import { toReactComponents } from 'utils/sanity';

import { breakpoint, color, font, fontSize, spacing } from 'theme';

interface Props {
  isOpen: boolean;
}

const TeacherGuide: React.FunctionComponent<Props> = ({ isOpen }) => {
  const { t } = useTranslation();
  const guideContainer = useRef<HTMLElement>(null);
  const { activeExercise } = useExerciseState();

  useEffect(() => {
    if (!isOpen || !guideContainer.current) return;
    guideContainer.current.scrollTop = 0;
  }, [isOpen]);

  return activeExercise ? (
    <Container ref={guideContainer} isOpen={isOpen} aria-hidden={!isOpen} id="teacher-guide">
      <SectionTitle forwardedAs="h2" role="heading" aria-level={1}>
        {t('route.teach.teacher_guide')}
      </SectionTitle>
      <GuideContent
        id={`guide-${activeExercise.slug}`}
        hasContent={Boolean(activeExercise.teacherNotes)}
      >
        {activeExercise?.teacherNotes ? (
          toReactComponents(activeExercise.teacherNotes)
        ) : (
          <NoContentText>{t('route.teach.teacher_guide.no_content')}</NoContentText>
        )}
      </GuideContent>
    </Container>
  ) : null;
};

const Container = styled.aside<{ isOpen: boolean }>`
  background: ${color('backdropGrey')};
  border-left: 1px solid ${color('lightGrey')};
  display: grid;
  grid-template-rows: 50px calc(100% - calc(50px + ${spacing('lg')}));
  height: 100%;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0.5)};
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s ease;
  width: ${({ isOpen }) => (isOpen ? window.innerWidth : 0)};

  ${({ isOpen }) => !isOpen && `border: 0;`};

  @media (min-width: ${breakpoint('md')}) {
    width: ${({ isOpen }) => (isOpen ? '360px' : 0)};
  }
`;

const SectionTitle = styled(Heading)`
  color: ${color('grey')};
  font-family: ${font('bold')};
  font-size: ${fontSize('xs')};
  padding: ${spacing('md')} ${spacing('lg')};
  text-transform: uppercase;
  white-space: nowrap;
`;

const GuideContent = styled.div<{ hasContent: boolean }>`
  height: 100%;
  padding: 0 ${spacing('lg')};
  width: 100%;
  white-space: nowrap;

  @media (min-width: ${breakpoint('md')}) {
    width: 360px;
  }

  ${({ hasContent }) =>
    !hasContent &&
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `};

  > div {
    padding-bottom: ${spacing('lg')};

    > * {
      white-space: normal;

      + * {
        margin-top: ${spacing('md')};
      }
    }
  }

  ul {
    padding-left: ${spacing('md')};
  }

  li + li {
    margin-top: ${spacing('md')};
  }
`;
const NoContentText = styled(Text)`
  color: ${color('grey')};
  font-size: ${fontSize('sm')};
  text-align: center;
`;

export default TeacherGuide;
