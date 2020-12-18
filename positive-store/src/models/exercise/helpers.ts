import { groupBy } from 'lodash';

import {
  Exercise,
  ExerciseResponse,
  ExerciseSection,
  ExerciseSectionTitle,
  ExerciseSectionKey,
} from 'types/exercise';
import { isDraftID } from 'utils/isDraftID';

export const formatExercisesResponse = (
  exercises: ExerciseResponse[],
  verboseContent: boolean
): Exercise[] =>
  exercises.map((exercise: ExerciseResponse) => {
    const isDraft = isDraftID(exercise._id);

    const formattedExercise: Exercise & { _id?: string } = {
      ...exercise,
      id: exercise._id,
      slug: isDraft ? `draft-version-${exercise.slug}` : exercise.slug,
      title: isDraft && verboseContent ? `${exercise.title} [DRAFT]` : exercise.title,
    };

    delete formattedExercise._id;
    return formattedExercise;
  });

export const formatExerciseSections = (exercises: Exercise[]): ExerciseSection[] => {
  const exercisesBySection = groupBy(exercises, (exercise) => exercise.section);

  const teacher = exercisesBySection[ExerciseSectionTitle.forTeacher];
  const basic =
    exercisesBySection[ExerciseSectionTitle.basics] ||
    exercisesBySection[ExerciseSectionTitle.firstLesson];
  const exercise =
    exercisesBySection[ExerciseSectionTitle.exercises] ||
    exercisesBySection[ExerciseSectionTitle.additionalExercises];
  const quickExercise = exercisesBySection[ExerciseSectionTitle.quickExercises];
  const homework = exercisesBySection[ExerciseSectionTitle.homework];
  const christmas = exercisesBySection[ExerciseSectionTitle.christmasCalendar];

  return [
    {
      key: ExerciseSectionKey.forTeacher,
      exercises: teacher,
    },
    {
      key: ExerciseSectionKey.basics,
      exercises: basic,
    },
    {
      key: ExerciseSectionKey.exercises,
      exercises: exercise,
    },
    {
      key: ExerciseSectionKey.quickExercises,
      exercises: quickExercise,
    },
    {
      key: ExerciseSectionKey.homework,
      exercises: homework,
    },
    {
      key: ExerciseSectionKey.christmasCalendar,
      exercises: christmas,
    },
  ].filter((section) => section.exercises);
};
