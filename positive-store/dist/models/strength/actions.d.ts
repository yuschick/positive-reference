import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IStrengthModel } from './model';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
import { Strength, StrengthSlug } from 'types/strength';
export interface IStrengthModelActions {
    setActiveStrengthSlug: Action<IStrengthModel, StrengthSlug | undefined>;
    setError: Action<IStrengthModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setPositiveCV: Action<IStrengthModel, Strength | undefined>;
    setRequestTimestamps: Action<IStrengthModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStartingLesson: Action<IStrengthModel, Strength | undefined>;
    setStatus: Action<IStrengthModel, {
        type: RequestType;
        value: Status;
    }>;
    setStrengthPowerPointUrl: Action<IStrengthModel, string | undefined>;
    setStrengths: Action<IStrengthModel, Strength[]>;
    setXmasCalendar: Action<IStrengthModel, Strength | undefined>;
}
declare const actions: IStrengthModelActions;
export default actions;
