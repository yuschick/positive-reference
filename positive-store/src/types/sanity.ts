export enum Dataset {
  production = 'production',
  development = 'development',
}

export enum IllustrationSlug {
  fairness = 'fairness',
  joy = 'joy',
  start = 'start',
}

export type SanityImageSource = {
  _type: string;
  asset: SanityImageAsset;
};

export type SanityImageAsset = {
  _ref: string;
  _type: string;
};
