import { Audience, AudienceResponse } from 'types/audience';
import { Language } from 'types/settings';
export declare const formatAudiencesResponse: (audiences: AudienceResponse[]) => Audience[];
export declare const defaultAudiences: Record<Language, string>;
export declare const filterProductionAudiences: (audiences: Audience[], defaultAudienceSlug: string) => Audience[];
