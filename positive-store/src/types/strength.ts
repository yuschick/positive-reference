import { Language } from 'types/settings';
import { SanityImageSource } from './sanity';

export type StrengthResponse = StrengthBase & {
  _id: string;
  backgroundColor: string;
  goalTemplates: GoalTemplateResponse[];
  language: Language;
};

export type Strength = StrengthBase & {
  color: string;
  goalTemplates: GoalTemplate[];
  isDraft: boolean;
};

type StrengthBase = {
  description: string;
  imageAsset: SanityImageSource;
  live: Live;
  name: string;
  numExercises: number;
  slug: StrengthSlug;
};

export type GoalTemplateResponse = GoalTemplateBase & {
  _id: string;
  goalText: string;
};

export type GoalTemplate = GoalTemplateBase & {
  id: string;
  isDraft: boolean;
  name: string;
};

type GoalTemplateBase = {
  actions: string[];
  slug: string;
};

export type Live = {
  _type: string;
  inSeeTheGood: boolean;
  inTeach: boolean;
};

export enum StrengthSlug {
  carefulness = 'carefulness',
  compassion = 'compassion',
  courage = 'courage',
  creativity = 'creativity',
  curiosity = 'curiosity',
  enthusiasm = 'enthusiasm',
  fairness = 'fairness',
  forgiveness = 'forgiveness',
  gratitude = 'gratitude',
  grit = 'grit',
  honesty = 'honesty',
  hope = 'hope',
  humour = 'humour',
  judgement = 'judgement',
  kindness = 'kindness',
  leadership = 'leadership',
  love = 'love',
  loveOfBeauty = 'love-of-beauty',
  loveOfLearning = 'love-of-learning',
  modesty = 'modesty',
  perseverance = 'perseverance',
  perspective = 'perspective',
  positiveCV = 'positive-cv',
  selfRegulation = 'self-regulation',
  socialIntelligence = 'social-intelligence',
  spirituality = 'spirituality',
  teamwork = 'teamwork',
  xmasCalendar = 'xmas-calendar',
}

export enum AttachmentType {
  slidesPowerpoint = 'slidesPowerpoint',
}
