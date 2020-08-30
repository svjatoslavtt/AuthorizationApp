import { errorsResponse } from '../../shared/utils';

import { ActionTypes, ActionTypeUnion } from './actions';
import { AuthTokenState } from './state';

export const initialState: AuthTokenState = {
	authToken: localStorage.getItem('token') || '',
	isLoading: false,
	errors: null,
	email: '',
	code: '',
};

export const authReducer = (state = initialState, action: ActionTypeUnion) => {
	switch (action.type) {
		case ActionTypes.LOGIN:
			return {
				...state,
				isLoading: true,
				authToken: action.payload,
			};
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case ActionTypes.LOGIN_FAILED:
			return {
				...state,
				isLoading: false,
				errors: errorsResponse(action.payload),
			};
		case ActionTypes.SET_TOKEN:
			return {
				...state,
				errors: null,
				authToken: '',
			};
		case ActionTypes.SET_LOGIN_ERRORS:
			return {
				...state,
				errors: null,
			};
		case ActionTypes.FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				email: action.payload,
				isLoading: true,
			};
		case ActionTypes.FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				errors: '',
				isLoading: false,
			};
		case ActionTypes.FORGOT_PASSWORD_FAILED:
			return {
				...state,
				isLoading: false,
				errors: errorsResponse(action.payload),
			};
		case ActionTypes.CONFIRM_CODE_REQUEST:
			return {
				...state,
				isLoading: true,
				code: action.payload,
			};
		case ActionTypes.CONFIRM_CODE_SUCCESS:
			return {
				...state,
				isLoading: false,
				errors: '',
				email: '',
			};
		case ActionTypes.CONFIRM_CODE_FAILED:
			return {
				...state,
				isLoading: false,
				errors: errorsResponse(action.payload),
			};
		case ActionTypes.RESEND_CODE:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.CHANGE_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				code: '',
				isLoading: false,
				errors: null,
			};
		case ActionTypes.CHANGE_PASSWORD_FAILED:
			return {
				...state,
				isLoading: false,
				errors: errorsResponse(action.payload),
			};
		case ActionTypes.SIGN_UP:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				isLoading: false,
				errors: null,
			};
		case ActionTypes.SIGN_UP_FAILED:
			return {
				isLoading: false,
				errors: errorsResponse(action.payload),
			};
		case ActionTypes.SET_SIGN_UP_ERRORS:
			return {
				...state,
				errors: null,
			};
		default:
			return state;
	}
};
