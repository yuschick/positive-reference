import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IMomentModel } from './model';
import { Moment } from 'types/moment';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IMomentModelActions {
    setCursor: Action<IMomentModel, string | undefined>;
    setError: Action<IMomentModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setFirstMomentFlag: Action<IMomentModel, boolean>;
    setMoments: Action<IMomentModel, Moment[]>;
    setRequestTimestamps: Action<IMomentModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStatus: Action<IMomentModel, {
        type: RequestType;
        value: Status;
    }>;
    setTempMoments: Action<IMomentModel, any[]>;
}
declare const actions: IMomentModelActions;
export default actions;
