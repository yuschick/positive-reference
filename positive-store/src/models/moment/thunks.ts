import { AxiosInstance } from 'axios';
import { Thunk, thunk } from 'easy-peasy';

import {
  CreateMomentMediaPayload,
  CreateMomentPayload,
  DeleteMomentMediaPayload,
  DeleteMomentPayload,
  EditMomentPayload,
  FetchMomentsPayload,
} from './payloads';
import { IMomentModel } from './model';
import { RequestType } from './requests';
import {
  formatMediaResponse,
  formatMomentsResponse,
  formatSingleMomentResponse,
  getMediaType,
  getMediaUrl,
} from './helpers';

import { paths } from 'api';
import { IStoreModel } from 'store';
import {
  Media,
  MediaResponse,
  Moment,
  MomentResponse,
  ResponseMoment,
  TempMoment,
} from 'types/moment';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IMomentModelThunks {
  createMoment: Thunk<IMomentModel, CreateMomentPayload, { client: AxiosInstance }, IStoreModel>;
  createMomentMedia: Thunk<
    IMomentModel,
    CreateMomentMediaPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  deleteMoment: Thunk<IMomentModel, DeleteMomentPayload, { client: AxiosInstance }, IStoreModel>;
  deleteMomentMedia: Thunk<
    IMomentModel,
    DeleteMomentMediaPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  editMoment: Thunk<IMomentModel, EditMomentPayload, { client: AxiosInstance }, IStoreModel>;
  fetchMoments: Thunk<IMomentModel, FetchMomentsPayload, { client: AxiosInstance }, IStoreModel>;
}

const thunks: IMomentModelThunks = {
  createMoment: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.createMoment, value: Status.loading });

      const { moments } = getState();

      try {
        await getStoreActions().auth.silentRefresh();

        let moment: Moment = await client
          .post(paths.moment.create({ groupId: payload.groupId }), {
            strengthSlug: payload.strengthSlug,
            description: payload.description,
            goalId: payload.goalId,
          })
          .then(({ data }: { data: ResponseMoment }): Moment => formatSingleMomentResponse(data));

        if (payload.media) {
          const response = await actions.createMomentMedia({ media: payload.media, moment });

          if (response.mediaUrl) {
            moment = response;
          }
        }

        actions.setFirstMomentFlag(moments.length === 0);
        actions.setMoments([moment, ...moments]);
        actions.setError({ type: RequestType.createMoment, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.createMoment,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.createMoment, value: Status.complete });
      }
    }
  ),

  createMomentMedia: thunk(
    async (
      actions,
      payload,
      { getState, getStoreActions, injections: { client } }
    ): Promise<Moment | void> => {
      actions.setStatus({ type: RequestType.createMomentMedia, value: Status.loading });

      const mediaType = getMediaType(payload.media);
      if (!mediaType) return;

      /* HANDLE TEMP MOMENT FOR BACKGROUND LOADING AND UI PROGRESS */
      const { tempMoments } = getState();
      const updatedTemp: TempMoment[] = [payload.moment, ...tempMoments];
      let tempMomentIndex: number | undefined;

      actions.setTempMoments(updatedTemp);

      try {
        await getStoreActions().auth.silentRefresh();

        const formData = new FormData();
        formData.append('file', payload.media);
        formData.append('mediaType', mediaType);

        /* POST MEDIA CONTENT */
        const media: Media = await client
          .post(paths.moment.media.create({ momentId: payload.moment.id }), formData, {
            onUploadProgress: (progressEvent: any) => {
              tempMomentIndex = updatedTemp.findIndex(
                ({ id }): boolean => id === payload.moment.id
              );
              const progressTemp = Array.from(updatedTemp);

              progressTemp[tempMomentIndex] = {
                ...progressTemp[tempMomentIndex],
                progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
              };

              actions.setTempMoments(progressTemp);
            },
          })
          .then(({ data }: { data: MediaResponse }): Media => formatMediaResponse(data));

        actions.setError({ type: RequestType.createMomentMedia, value: undefined });

        return {
          ...payload.moment,
          mediaUrl: getMediaUrl(media.id),
          mediaId: media.id,
          mediaType: media.type,
        };
      } catch (error) {
        return actions.setError({
          type: RequestType.createMomentMedia,
          value: { error, status: error.response?.status },
        });
      } finally {
        tempMomentIndex = updatedTemp.findIndex((tmp: TempMoment) => tmp.id === payload.moment.id);
        updatedTemp.splice(tempMomentIndex, 1);

        actions.setTempMoments(updatedTemp);
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.createMomentMedia, value: Status.complete });
      }
    }
  ),

  deleteMoment: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.deleteMoment !== Status.idle) return;
      actions.setStatus({ type: RequestType.deleteMoment, value: Status.loading });

      try {
        await getStoreActions().auth.silentRefresh();

        const { moments } = getState();
        const updatedMoments = Array.from(moments);
        const momentIndex = updatedMoments.findIndex(({ id }) => id === payload.momentId);
        const moment = updatedMoments[momentIndex];

        /* DELETE MEDIA */
        if (moment.mediaId) {
          await actions.deleteMomentMedia({ mediaId: moment.mediaId });
        }

        /* DELETE MOMENT */
        await client.delete(
          paths.moment.delete({ groupId: payload.groupId, momentId: payload.momentId })
        );

        updatedMoments.splice(momentIndex, 1);

        actions.setMoments(updatedMoments);
        actions.setError({ type: RequestType.deleteMoment, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.deleteMoment,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.deleteMoment, value: Status.complete });
      }
    }
  ),

  deleteMomentMedia: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.deleteMomentMedia !== Status.idle) return;
      actions.setStatus({ type: RequestType.deleteMomentMedia, value: Status.loading });

      try {
        await getStoreActions().auth.silentRefresh();

        await client.delete(paths.moment.media.delete(payload));

        actions.setError({ type: RequestType.deleteMomentMedia, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.deleteMomentMedia,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.deleteMomentMedia, value: Status.complete });
      }
    }
  ),

  editMoment: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.editMoment !== Status.idle) return;
      actions.setStatus({ type: RequestType.editMoment, value: Status.loading });

      try {
        await getStoreActions().auth.silentRefresh();

        let moment = await client
          .put(paths.moment.edit({ momentId: payload.momentId, groupId: payload.groupId }), {
            strengthSlug: payload.strengthSlug,
            description: payload.description,
          })
          .then(({ data }: { data: ResponseMoment }): Moment => formatSingleMomentResponse(data));

        const { moments } = getState();
        const updatedMoments = Array.from(moments);
        const momentIndex = moments.findIndex((moment: Moment) => moment.id === payload.momentId);

        if (moment.mediaId && (payload.mediaUrl === undefined || payload.media)) {
          await actions.deleteMomentMedia({ mediaId: moment.mediaId });
          moment = { ...moment, mediaUrl: undefined, mediaType: undefined, mediaId: undefined };
        }

        if (!!payload.media) {
          moment = await actions.createMomentMedia({ media: payload.media, moment });
        }

        updatedMoments[momentIndex] = moment;

        actions.setMoments(updatedMoments);
        actions.setError({ type: RequestType.editMoment, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.editMoment,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.editMoment, value: Status.complete });
      }
    }
  ),

  fetchMoments: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      const fetchRequestType =
        payload.cursor && !payload.resetCursor
          ? RequestType.fetchMoreMoments
          : RequestType.fetchMoments;

      if (getState().status[fetchRequestType] !== Status.idle) return;
      actions.setStatus({ type: fetchRequestType, value: Status.loading });

      if (payload.resetCursor) {
        actions.setCursor(undefined);
      }

      try {
        await getStoreActions().auth.silentRefresh();
        const {
          requestTimestamps: { fresh, stale },
        } = getState();
        const isCacheStale = fresh < stale;

        const momentResponse: MomentResponse = await client
          .get(
            paths.moments.get({
              ...payload,
              cursor: payload.resetCursor ? undefined : payload.cursor,
            }),
            { clearCacheEntry: isCacheStale || payload.clearCacheEntry }
          )
          .then(({ data }: { data: MomentResponse }): MomentResponse => data);

        const moments: Moment[] = formatMomentsResponse(momentResponse.Items);

        if (payload.cursor) {
          actions.setMoments([...getState().moments, ...moments]);
        } else {
          actions.setMoments(moments);
        }
        actions.setCursor(momentResponse.Cursor);
        actions.setError({ type: fetchRequestType, value: undefined });
      } catch (error) {
        actions.setError({
          type: fetchRequestType,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setStatus({ type: fetchRequestType, value: Status.complete });
      }
    }
  ),
};

export default thunks;
