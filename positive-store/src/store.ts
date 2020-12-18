import { createTypedHooks } from 'easy-peasy';

import audienceModel, { IAudienceModel } from './models/audience';
import authModel, { IAuthModel } from './models/auth';
import exerciseModel, { IExerciseModel } from './models/exercise';
import goalModel, { IGoalModel } from './models/goal';
import groupModel, { IGroupModel } from './models/group';
import invitationModel, { IInvitationModel } from './models/invitation';
import membershipModel, { IMembershipModel } from './models/membership';
import momentModel, { IMomentModel } from './models/moment/model';
import sanityModel, { ISanityModel } from './models/sanity/model';
import settingsModel, { ISettingsModel } from './models/settings/model';
import strengthModel, { IStrengthModel } from './models/strength/model';
import userModel, { IUserModel } from './models/user/model';

const typedHooks = createTypedHooks<IStoreModel>();
export const usePositiveActions = typedHooks.useStoreActions;
export const usePositiveState = typedHooks.useStoreState;

export interface IStoreModel {
  audiences: IAudienceModel;
  auth: IAuthModel;
  exercises: IExerciseModel;
  goals: IGoalModel;
  groups: IGroupModel;
  invitations: IInvitationModel;
  memberships: IMembershipModel;
  moments: IMomentModel;
  sanity: ISanityModel;
  settings: ISettingsModel;
  strengths: IStrengthModel;
  user: IUserModel;
}

export const storeModel: IStoreModel = {
  audiences: audienceModel,
  auth: authModel,
  exercises: exerciseModel,
  goals: goalModel,
  groups: groupModel,
  invitations: invitationModel,
  memberships: membershipModel,
  moments: momentModel,
  sanity: sanityModel,
  settings: settingsModel,
  strengths: strengthModel,
  user: userModel,
};
