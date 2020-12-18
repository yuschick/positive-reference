import { ActionCreator, ThunkCreator } from 'easy-peasy';

import { FetchStrengthPayload, FetchStrengthAttachmentPayload } from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Strength, StrengthSlug } from 'types/strength';

export const useStrengthState = () => usePositiveState((state) => state.strengths);

export const useStrengthActions: () => {
  fetchStrengths: ThunkCreator<FetchStrengthPayload, Strength[]>;
  fetchStrengthAttachment: ThunkCreator<FetchStrengthAttachmentPayload, string>;
  setActiveStrengthSlug: ActionCreator<StrengthSlug | undefined>;
  setStrengthPowerPointUrl: ActionCreator<string | undefined>;
} = () => {
  const {
    fetchStrengths,
    fetchStrengthAttachment,
    setStrengthPowerPointUrl,
    setActiveStrengthSlug,
  } = usePositiveActions((actions) => actions.strengths);
  return {
    fetchStrengths,
    fetchStrengthAttachment,
    setStrengthPowerPointUrl,
    setActiveStrengthSlug,
  };
};
