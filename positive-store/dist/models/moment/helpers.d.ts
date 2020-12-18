import { Media, MediaResponse, Moment, ResponseMoment } from 'types/moment';
export declare const formatSingleMomentResponse: (moment: ResponseMoment) => Moment;
export declare const formatMomentsResponse: (moments: ResponseMoment[]) => Moment[];
export declare const formatMediaResponse: (media: MediaResponse) => Media;
export declare const getMediaType: (blob: Blob) => string | undefined;
export declare const getMediaUrl: (mediaId: string) => string;
