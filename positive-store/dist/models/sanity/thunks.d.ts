import { Thunk } from 'easy-peasy';
import { FetchIllustrationUrlPayload } from './payloads';
import { ISanityModel } from './model';
import { SanityImageSource } from 'types/sanity';
export interface ISanityModelThunks {
    fetchIllustrationUrl: Thunk<ISanityModel, FetchIllustrationUrlPayload>;
    getImageUrlBuilder: Thunk<ISanityModel, SanityImageSource>;
}
declare const thunks: ISanityModelThunks;
export default thunks;
