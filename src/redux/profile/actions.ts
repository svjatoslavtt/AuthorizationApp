import { ActionType, createAction } from 'typesafe-actions';

import {
	Profile,
	ProfileSuccess,
} from '../../shared/interfaces/profile.interface';

export enum ActionTypes {
	PROFILE_REQUEST = 'profile/PROFILE_REQUEST',
	PROFILE_SUCCESS = 'profile/PROFILE_SUCCESS',
	PROFILE_FAILED = 'profile/PROFILE_FAILED',
	UPDATE_PROFILE = 'profile/UPDATE_PROFILE',
	SET_PROFILE = 'profile/SET_PROFILE',
	SET_MODAL = 'profile/SET_MODAL',
}

export const Actions = {
	profileRequest: createAction(ActionTypes.PROFILE_REQUEST)<string | null>(),
	profileSuccess: createAction(ActionTypes.PROFILE_SUCCESS)<ProfileSuccess>(),
	profileFailed: createAction(ActionTypes.PROFILE_FAILED)<any>(),
	updateProfile: createAction(ActionTypes.UPDATE_PROFILE)<Profile>(),
	setProfile: createAction(ActionTypes.SET_PROFILE)<Profile>(),
	setModal: createAction(ActionTypes.SET_MODAL)<boolean>(),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
