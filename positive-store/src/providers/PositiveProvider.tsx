import React from 'react';
import { createStore, persist, PersistConfig, StoreProvider } from 'easy-peasy';

import { Dataset } from 'types/sanity';
import { Environment } from 'types/settings';
import { IAuthModel } from 'models/auth';
import { IGroupModel } from 'models/group';
import { ISettingsModel } from 'models/settings';
import { IUserModel } from 'models/user';
import { client } from 'api';
import { persistConfig as groupsPersistConfig } from 'models/group/model';
import { persistConfig as settingsPersistConfig } from 'models/settings/model';
import { storeModel } from 'store';

interface IProps {
  authModel?: IAuthModel;
  baseUrl: string;
  env: Environment;
  groups?: { model: IGroupModel; persistConfig: PersistConfig<IGroupModel> };
  sanityConfig?: ISanityProps;
  settings?: { model: ISettingsModel; persistConfig: PersistConfig<ISettingsModel> };
  userModel?: IUserModel;
}

interface ISanityProps {
  dataset?: Dataset;
  project?: string;
  token?: string;
}

const PositiveProvider: React.FC<IProps> = ({
  authModel,
  groups,
  baseUrl,
  env,
  sanityConfig,
  settings,
  userModel,
  children,
}) => {
  client.defaults.baseURL = baseUrl;

  const store = createStore(
    {
      ...storeModel,
      auth: { ...storeModel.auth, ...authModel },
      groups: persist(
        { ...storeModel.groups, ...groups?.model },
        { ...groupsPersistConfig, ...groups?.persistConfig }
      ),
      sanity: { ...storeModel.sanity, ...sanityConfig },
      settings: persist(
        { ...storeModel.settings, ...settings?.model, env },
        { ...settingsPersistConfig, ...settings?.persistConfig }
      ),
      user: { ...storeModel.user, ...userModel },
    },
    { injections: { client } }
  );

  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default PositiveProvider;
