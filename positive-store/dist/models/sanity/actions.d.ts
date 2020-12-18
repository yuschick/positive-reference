import { Action } from 'easy-peasy';
import { ISanityModel } from './model';
import { RequestType } from './requests';
import { Dataset } from 'types/sanity';
import { Status } from 'types/status';
export interface ISanityModelActions {
    setDataset: Action<ISanityModel, Dataset>;
    setError: Action<ISanityModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setStatus: Action<ISanityModel, {
        type: RequestType;
        value: Status;
    }>;
    setVerboseContent: Action<ISanityModel, boolean>;
}
declare const actions: ISanityModelActions;
export default actions;
