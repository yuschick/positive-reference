import { ISanityModelState } from './state';
import { ISanityModelActions } from './actions';
import { ISanityModelThunks } from './thunks';
export interface ISanityModel extends ISanityModelState, ISanityModelActions, ISanityModelThunks {
}
declare const sanityModel: ISanityModel;
export default sanityModel;
