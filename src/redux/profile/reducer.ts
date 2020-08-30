import { errorsResponse } from '../../shared/utils';

import { ActionTypes, ActionTypeUnion } from './actions';
import { ProfileState } from './state';

export const initialState: ProfileState = {
	profileData: {
		email: '',
		fullName: '',
		phone: '',
		countryCode: '',
		notifications: false,
	},
	errors: null,
	isLoading: false,
	setModal: false,
};

export const profileReducer = (
	state = initialState,
	action: ActionTypeUnion
) => {
	switch (action.type) {
		case ActionTypes.PROFILE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				profileData: {
					email: action.payload.email,
					fullName: action.payload.profile.fullName,
					phone: action.payload.profile.phone,
					countryCode: action.payload.profile.countryCode,
					notifications: action.payload.profile.notifications,
				},
			};
		case ActionTypes.PROFILE_FAILED:
			return {
				...state,
				isLoading: false,
				errors: errorsResponse(action.payload),
			};
		case ActionTypes.UPDATE_PROFILE:
			return {
				...state,
				isLoading: true,
				errors: null,
			};
		case ActionTypes.SET_PROFILE:
			return {
				errors: null,
				isLoading: false,
				profileData: action.payload,
			};
		case ActionTypes.SET_MODAL:
			return {
				...state,
				setModal: action.payload,
			};
		default:
			return state;
	}
};
