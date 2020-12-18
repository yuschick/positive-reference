import { Exercise, ExerciseResponse, ExerciseSection } from 'types/exercise';
export declare const formatExercisesResponse: (exercises: ExerciseResponse[], verboseContent: boolean) => Exercise[];
export declare const formatExerciseSections: (exercises: Exercise[]) => ExerciseSection[];
