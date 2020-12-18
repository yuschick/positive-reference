import { Strength, StrengthResponse } from 'types/strength';
import { Language } from 'types/settings';
export declare const formatStrengthsResponse: (strengths: StrengthResponse[], verboseContent: boolean) => Strength[];
export declare const buildStrengthPackages: ({ language, audienceSlug, strengths, }: {
    language: Language;
    audienceSlug?: string | undefined;
    strengths: Strength[];
}) => {
    core: Strength[];
    waves: Strength[][];
    hasWavesContent: boolean;
};
