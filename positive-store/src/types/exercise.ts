import { Language } from './settings';

type ExerciseBase = {
  description: string;
  duration: string;
  language: Language;
  section: string;
  showCover: boolean;
  slides: Slide[];
  slug: string;
  teacherNotes: TeacherNote[];
  title: string;
  type: string;
};
export type ExerciseResponse = ExerciseBase & {
  _id: string;
  orderNumber: number;
};

export type Exercise = ExerciseBase & {
  id: string;
};

export type Slide = {
  _key: string;
  _type: string;
  body: SlideBody;
  image: SlideImage;
};

type SlideBody = {
  _key: string;
  _type: string;
  children?: SlideBodyChild[];
  markDefs?: MarkDef[];
  style?: string;
  url?: string;
};

type MarkDef = {
  _key: string;
  _type: string;
  exerciseSlug: string;
  reference: Ref;
  strengthSlug: string;
};

type Ref = {
  _ref: string;
  _type: string;
};

type SlideBodyChild = {
  _key: string;
  _type: string;
  marks: [];
  text: string;
  level?: number;
  listItem?: string;
};

type SlideImage = {
  _type: string;
  asset: Asset;
};

type Asset = {
  _ref: string;
  _type: string;
};

export type TeacherNote = {
  _key: string;
  _styled: string;
  _type: string;
  children: TeacherNoteChild[];
  markDefs: [];
};

type TeacherNoteChild = {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
};

export type ExerciseSection = {
  exercises: Exercise[];
  key: string;
};

export enum ExerciseSectionTitle {
  additionalExercises = 'ADDITIONAL_EXERCISES',
  basics = 'BASICS',
  christmasCalendar = 'CHRISTMAS_CALENDAR',
  exercises = 'EXERCISES',
  firstLesson = 'FIRST_LESSON',
  forTeacher = 'FOR_TEACHER',
  homework = 'HOMEWORK',
  quickExercises = 'QUICK_EXERCISES',
}

export enum ExerciseSectionKey {
  additionalExercises = 'additional_exercises',
  basics = 'basics',
  christmasCalendar = 'xmas_doors',
  exercises = 'exercises',
  firstLesson = 'first_lesson',
  forTeacher = 'for_teacher',
  homework = 'homework',
  quickExercises = 'quick_exercises',
}
