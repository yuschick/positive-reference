import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { Dataset } from 'types/sanity';
export interface ISanityModelState {
    dataset: Dataset;
    error: RequestTypeToError;
    project: string;
    sanityClient: Computed<ISanityModelState, any>;
    status: RequestTypeToStatus;
    token?: string;
    verboseContent: boolean;
}
declare const state: ISanityModelState;
export default state;
