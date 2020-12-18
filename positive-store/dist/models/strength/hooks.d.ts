import { ActionCreator, ThunkCreator } from 'easy-peasy';
import { FetchStrengthPayload, FetchStrengthAttachmentPayload } from './payloads';
import { Strength, StrengthSlug } from 'types/strength';
export declare const useStrengthState: () => import("easy-peasy").StateMapper<{
    strengths: Strength[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    activeStrength: import("easy-peasy").Computed<import("./state").IStrengthModelState, Strength, {}>;
    activeStrengthSlug?: StrengthSlug | undefined;
    positiveCV?: Strength | undefined;
    startingLesson?: Strength | undefined;
    stgStrengths: import("easy-peasy").Computed<import("./state").IStrengthModelState, Strength[] | undefined, {}>;
    strengthPackages: import("easy-peasy").Computed<import("./state").IStrengthModelState, {
        core: Strength[];
        waves: Strength[][];
        hasWavesContent: boolean;
    } | undefined, import("../../store").IStoreModel>;
    strengthPowerPointUrl?: string | undefined;
    teachStrengths: import("easy-peasy").Computed<import("./state").IStrengthModelState, Strength[] | undefined, {}>;
    xmasCalendar?: Strength | undefined;
}>;
export declare const useStrengthActions: () => {
    fetchStrengths: ThunkCreator<FetchStrengthPayload, Strength[]>;
    fetchStrengthAttachment: ThunkCreator<FetchStrengthAttachmentPayload, string>;
    setActiveStrengthSlug: ActionCreator<StrengthSlug | undefined>;
    setStrengthPowerPointUrl: ActionCreator<string | undefined>;
};
