import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { IStoreModel } from 'store';
import { Strength, StrengthSlug } from 'types/strength';
import { RequestTimestampPayload } from 'types/request';
export interface IStrengthModelState {
    activeStrength: Computed<IStrengthModelState, Strength>;
    activeStrengthSlug?: StrengthSlug;
    error: RequestTypeToError;
    positiveCV?: Strength;
    requestTimestamps: RequestTimestampPayload;
    startingLesson?: Strength;
    status: RequestTypeToStatus;
    stgStrengths: Computed<IStrengthModelState, Strength[] | undefined>;
    strengthPackages: Computed<IStrengthModelState, {
        core: Strength[];
        waves: Strength[][];
        hasWavesContent: boolean;
    } | undefined, IStoreModel>;
    strengthPowerPointUrl?: string;
    strengths: Strength[];
    teachStrengths: Computed<IStrengthModelState, Strength[] | undefined>;
    xmasCalendar?: Strength;
}
declare const state: IStrengthModelState;
export default state;
