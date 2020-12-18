import { Language } from './settings';
declare type ExerciseBase = {
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
export declare type ExerciseResponse = ExerciseBase & {
    _id: string;
    orderNumber: number;
};
export declare type Exercise = ExerciseBase & {
    id: string;
};
export declare type Slide = {
    _key: string;
    _type: string;
    body: SlideBody;
    image: SlideImage;
};
declare type SlideBody = {
    _key: string;
    _type: string;
    children?: SlideBodyChild[];
    markDefs?: MarkDef[];
    style?: string;
    url?: string;
};
declare type MarkDef = {
    _key: string;
    _type: string;
    exerciseSlug: string;
    reference: Ref;
    strengthSlug: string;
};
declare type Ref = {
    _ref: string;
    _type: string;
};
declare type SlideBodyChild = {
    _key: string;
    _type: string;
    marks: [];
    text: string;
    level?: number;
    listItem?: string;
};
declare type SlideImage = {
    _type: string;
    asset: Asset;
};
declare type Asset = {
    _ref: string;
    _type: string;
};
export declare type TeacherNote = {
    _key: string;
    _styled: string;
    _type: string;
    children: TeacherNoteChild[];
    markDefs: [];
};
declare type TeacherNoteChild = {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
};
export declare type ExerciseSection = {
    exercises: Exercise[];
    key: string;
};
export declare enum ExerciseSectionTitle {
    additionalExercises = "ADDITIONAL_EXERCISES",
    basics = "BASICS",
    christmasCalendar = "CHRISTMAS_CALENDAR",
    exercises = "EXERCISES",
    firstLesson = "FIRST_LESSON",
    forTeacher = "FOR_TEACHER",
    homework = "HOMEWORK",
    quickExercises = "QUICK_EXERCISES"
}
export declare enum ExerciseSectionKey {
    additionalExercises = "additional_exercises",
    basics = "basics",
    christmasCalendar = "xmas_doors",
    exercises = "exercises",
    firstLesson = "first_lesson",
    forTeacher = "for_teacher",
    homework = "homework",
    quickExercises = "quick_exercises"
}
export {};
