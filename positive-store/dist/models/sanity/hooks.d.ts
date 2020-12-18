import { ThunkCreator } from 'easy-peasy';
import { FetchIllustrationUrlPayload } from './payloads';
import { SanityImageSource } from 'types/sanity';
export declare const useSanityState: () => import("easy-peasy").StateMapper<{
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    dataset: import("../../types/sanity").Dataset;
    project: string;
    sanityClient: import("easy-peasy").Computed<import("./state").ISanityModelState, any, {}>;
    token?: string | undefined;
    verboseContent: boolean;
}>;
export declare const useSanityActions: () => {
    getImageUrlBuilder: ThunkCreator<SanityImageSource>;
    fetchIllustrationUrl: ThunkCreator<FetchIllustrationUrlPayload, Promise<string | void | null>>;
};
