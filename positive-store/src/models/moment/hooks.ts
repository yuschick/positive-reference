import { ActionCreator, ThunkCreator } from 'easy-peasy';

import {
  CreateMomentPayload,
  DeleteMomentPayload,
  DeleteMomentMediaPayload,
  EditMomentPayload,
  FetchMomentsPayload,
} from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Moment } from 'types/moment';

export const useMomentState = () => usePositiveState((state) => state.moments);

export const useMomentActions: () => {
  createMoment: ThunkCreator<CreateMomentPayload, any>;
  deleteMoment: ThunkCreator<DeleteMomentPayload, void>;
  deleteMomentMedia: ThunkCreator<DeleteMomentMediaPayload, void>;
  editMoment: ThunkCreator<EditMomentPayload, void>;
  fetchMoments: ThunkCreator<FetchMomentsPayload, Moment[]>;
  setFirstMomentFlag: ActionCreator<boolean>;
} = () => {
  const {
    createMoment,
    deleteMoment,
    deleteMomentMedia,
    editMoment,
    fetchMoments,
    setFirstMomentFlag,
  } = usePositiveActions((actions) => actions.moments);
  return {
    createMoment,
    deleteMoment,
    deleteMomentMedia,
    editMoment,
    fetchMoments,
    setFirstMomentFlag,
  };
};
