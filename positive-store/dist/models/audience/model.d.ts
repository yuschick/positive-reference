import { IAudienceModelActions } from './actions';
import { IAudienceModelListeners } from './listeners';
import { IAudienceModelState } from './state';
import { IAudienceModelThunks } from './thunks';
export interface IAudienceModel extends IAudienceModelActions, IAudienceModelListeners, IAudienceModelState, IAudienceModelThunks {
}
declare const audienceModel: IAudienceModel;
export default audienceModel;
