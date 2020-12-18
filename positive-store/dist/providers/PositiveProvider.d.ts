import React from 'react';
import { PersistConfig } from 'easy-peasy';
import { Dataset } from 'types/sanity';
import { Environment } from 'types/settings';
import { IAuthModel } from 'models/auth';
import { IGroupModel } from 'models/group';
import { ISettingsModel } from 'models/settings';
import { IUserModel } from 'models/user';
interface IProps {
    authModel?: IAuthModel;
    baseUrl: string;
    env: Environment;
    groups?: {
        model: IGroupModel;
        persistConfig: PersistConfig<IGroupModel>;
    };
    sanityConfig?: ISanityProps;
    settings?: {
        model: ISettingsModel;
        persistConfig: PersistConfig<ISettingsModel>;
    };
    userModel?: IUserModel;
}
interface ISanityProps {
    dataset?: Dataset;
    project?: string;
    token?: string;
}
declare const PositiveProvider: React.FC<IProps>;
export default PositiveProvider;
