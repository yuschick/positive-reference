export declare enum Dataset {
    production = "production",
    development = "development"
}
export declare enum IllustrationSlug {
    fairness = "fairness",
    joy = "joy",
    start = "start"
}
export declare type SanityImageSource = {
    _type: string;
    asset: SanityImageAsset;
};
export declare type SanityImageAsset = {
    _ref: string;
    _type: string;
};
