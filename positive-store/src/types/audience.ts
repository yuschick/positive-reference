export type Audience = {
  id: string;
  live: boolean;
  name: string;
  numExercises: number;
  slug: string;
};

export type AudienceResponse = {
  _id: string;
  name: string;
  slug: string;
  numExercises: number;
  live: boolean;
};
