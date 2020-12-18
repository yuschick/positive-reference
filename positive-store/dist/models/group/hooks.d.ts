import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { CreateGroupPayload, DeleteGroupPayload, EditGroupPayload, FetchGroupsPayload } from './payloads';
import { Group } from 'types/group';
export declare const useGroupState: () => import("easy-peasy").StateMapper<{
    groups: Group[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    hasSelectableGroups: import("easy-peasy").Computed<import("./state").IGroupModelState, boolean, {}>;
    nameMaxLength: number;
    nameMinLength: number;
    organizations: import("easy-peasy").Computed<import("./state").IGroupModelState, import("../../types/group").Organization[], {}>;
    orphanGroups: import("easy-peasy").Computed<import("./state").IGroupModelState, import("../../types/group").Class[], {}>;
    restrictedAccount: import("easy-peasy").Computed<import("./state").IGroupModelState, boolean, {}>;
    selectedGroup?: Group | undefined;
    selectedGroupId?: string | undefined;
    onSetGroups?: import("easy-peasy").ThunkOn<import("./model").IGroupModel, void, import("../../store").IStoreModel> | undefined;
    onSetSelectedGroupId?: import("easy-peasy").ThunkOn<import("./model").IGroupModel, void, import("../../store").IStoreModel> | undefined;
    onSetSelectedGroup?: import("easy-peasy").ThunkOn<import("./model").IGroupModel, void, import("../../store").IStoreModel> | undefined;
}>;
export declare const useGroupActions: () => {
    createGroup: ThunkCreator<CreateGroupPayload, void>;
    deleteGroup: ThunkCreator<DeleteGroupPayload, void>;
    editGroup: ThunkCreator<EditGroupPayload, void>;
    fetchGroups: ThunkCreator<FetchGroupsPayload, void>;
    setGroups: ActionCreator<{
        groups: Group[];
    }>;
    setSelectedGroup: ActionCreator<Group | undefined>;
    setSelectedGroupId: ActionCreator<string | undefined>;
};
