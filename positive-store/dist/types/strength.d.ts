import { Language } from 'types/settings';
import { SanityImageSource } from './sanity';
export declare type StrengthResponse = StrengthBase & {
    _id: string;
    backgroundColor: string;
    goalTemplates: GoalTemplateResponse[];
    language: Language;
};
export declare type Strength = StrengthBase & {
    color: string;
    goalTemplates: GoalTemplate[];
    isDraft: boolean;
};
declare type StrengthBase = {
    description: string;
    imageAsset: SanityImageSource;
    live: Live;
    name: string;
    numExercises: number;
    slug: StrengthSlug;
};
export declare type GoalTemplateResponse = GoalTemplateBase & {
    _id: string;
    goalText: string;
};
export declare type GoalTemplate = GoalTemplateBase & {
    id: string;
    isDraft: boolean;
    name: string;
};
declare type GoalTemplateBase = {
    actions: string[];
    slug: string;
};
export declare type Live = {
    _type: string;
    inSeeTheGood: boolean;
    inTeach: boolean;
};
export declare enum StrengthSlug {
    carefulness = "carefulness",
    compassion = "compassion",
    courage = "courage",
    creativity = "creativity",
    curiosity = "curiosity",
    enthusiasm = "enthusiasm",
    fairness = "fairness",
    forgiveness = "forgiveness",
    gratitude = "gratitude",
    grit = "grit",
    honesty = "honesty",
    hope = "hope",
    humour = "humour",
    judgement = "judgement",
    kindness = "kindness",
    leadership = "leadership",
    love = "love",
    loveOfBeauty = "love-of-beauty",
    loveOfLearning = "love-of-learning",
    modesty = "modesty",
    perseverance = "perseverance",
    perspective = "perspective",
    positiveCV = "positive-cv",
    selfRegulation = "self-regulation",
    socialIntelligence = "social-intelligence",
    spirituality = "spirituality",
    teamwork = "teamwork",
    xmasCalendar = "xmas-calendar"
}
export declare enum AttachmentType {
    slidesPowerpoint = "slidesPowerpoint"
}
export {};
