import React from 'react';
import styled from 'styled-components';
import {
  useExerciseState,
  useAudienceState,
  useStrengthState,
  Exercise,
  ExerciseSection,
  ExerciseSectionKey,
  Status,
  useTranslation,
} from 'positive-store';

import { breakpoint, color, font, fontSize, spacing } from 'theme';

import Link from 'components/Link';
import Heading from 'components/Heading';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  isOpen: boolean;
  onClick?: () => void;
}

const ExerciseMenu: React.FunctionComponent<Props> = ({ isOpen, onClick }) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();

  const { exerciseSections, activeExercise, status } = useExerciseState();
  const { activeAudience } = useAudienceState();
  const { activeStrengthSlug } = useStrengthState();

  return (
    <Container isOpen={isOpen} aria-hidden={!isOpen} id="exercise-menu">
      {status.fetchExercises === Status.loading && !exerciseSections.length
        ? null
        : exerciseSections.map(
            (section: ExerciseSection) =>
              !!section.exercises.length && (
                <nav key={section.key}>
                  {section.key !== ExerciseSectionKey.forTeacher && (
                    <SectionTitle
                      forwardedAs="h2"
                      id={`section-${section.key}`}
                      role="heading"
                      aria-level={2}
                    >
                      {t(
                        `route.teach.exercise.${section.key}${
                          activeAudience?.slug === 'preschool' ? `_preschool` : ''
                        }`
                      )}
                    </SectionTitle>
                  )}

                  <ul aria-describedby={`section-${section.key}`}>
                    {section.exercises.map((e: Exercise) => {
                      const { slug, id, title } = e;
                      const isSelected = activeExercise?.slug === e.slug;
                      const isForTeacher = section.key === ExerciseSectionKey.forTeacher;

                      return (
                        <ExerciseItem
                          key={id}
                          isSelected={isSelected}
                          isOpen={isOpen}
                          aria-describedby={`guide-${slug}`}
                        >
                          <Link
                            to={`/teach/${activeAudience?.slug}/${activeStrengthSlug}/${slug}`}
                            onClick={() => {
                              trackEvent({
                                category: 'Teach Exercise',
                                action: `Select exercise ${slug}`,
                              });
                              onClick && onClick();
                            }}
                            tabIndex={isSelected ? -1 : 0}
                          >
                            {isForTeacher ? t(`route.teach.exercise.for_teacher`) : title}
                          </Link>
                        </ExerciseItem>
                      );
                    })}
                  </ul>
                </nav>
              )
          )}
    </Container>
  );
};

const Container = styled.aside<{ isOpen: boolean }>`
  background: ${color('backdropGrey')};
  border-right: 1px solid ${color('lightGrey')};
  height: 100%;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0.5)};
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s ease;
  width: ${({ isOpen }) => (isOpen ? `${window.innerWidth}px` : 0)};

  ${({ isOpen }) => !isOpen && `border: 0;`};

  @media (min-width: ${breakpoint('md')}) {
    min-width: ${({ isOpen }) => (isOpen ? '280px' : 0)};
    width: ${({ isOpen }) => (isOpen ? '280px' : 0)};
  }
`;

const SectionTitle = styled(Heading)`
  border-bottom: 1px solid ${color('lightGrey')};
  color: ${color('grey')};
  font-family: ${font('bold')};
  font-size: ${fontSize('xs')};
  margin-top: ${spacing('xl')};
  padding: ${spacing('md')} ${spacing('lg')};
  text-transform: uppercase;
  white-space: nowrap;
`;

const ExerciseItem = styled.li<{ isSelected: boolean; isOpen: boolean }>`
  --windowWidth: ${`${window.innerWidth}px`};

  background: ${({ isSelected }) => (isSelected ? color('green') : color('white'))};
  border-bottom: 1px solid ${({ isSelected }) => (isSelected ? color('green') : color('lightGrey'))};
  overflow: hidden;
  transition: all 0.2s ease;
  width: var(--windowWidth);

  a {
    color: ${({ isSelected }) => (isSelected ? color('white') : color('black'))};
    display: block;
    font-family: ${font('bold')};
    padding: ${spacing('md')} ${spacing('lg')};
    text-align: left;
    transition: none;
    width: var(--windowWidth);

    &:hover,
    &:focus {
      background: ${({ isSelected }) => (isSelected ? color('green') : color('lightGreen'))};
      color: ${({ isSelected }) => (isSelected ? color('white') : color('black'))};
      outline: 1px solid ${color('hoverGreen')};
    }
  }

  @media (min-width: ${breakpoint('md')}) {
    width: 280px;

    a {
      width: 280px;
    }
  }
`;

export default ExerciseMenu;
