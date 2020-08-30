import { ActionType, createAction } from 'typesafe-actions';

import { ChangePassword } from '../../shared/interfaces/changePassword.interface';
import { SignInFormValues } from '../../shared/interfaces/signin.interface';
import { SignUpFormValues } from '../../shared/interfaces/signup.interface';

export enum ActionTypes {
	LOGIN = 'auth/LOGIN',
	LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
	LOGIN_FAILED = 'auth/LOGIN_FAILED',

	SET_TOKEN = 'auth/SET_TOKEN',
	SET_LOGIN_ERRORS = 'auth/SET_LOGIN_ERRORS',
	
	FORGOT_PASSWORD_REQUEST = 'forgot/FORGOT_PASSWORD_REQUEST',
	FORGOT_PASSWORD_SUCCESS = 'forgot/FORGOT_PASSWORD_SUCCESS',
	FORGOT_PASSWORD_FAILED = 'forgot/FORGOT_PASSWORD_FAILED',

	CONFIRM_CODE_REQUEST = 'confirm/CONFIRM_CODE_REQUEST',
	CONFIRM_CODE_SUCCESS = 'confirm/CONFIRM_CODE_SUCCESS',
	CONFIRM_CODE_FAILED = 'confirm/CONFIRM_CODE_FAILED',

	RESEND_CODE = 'confirm/RESEND_CODE',

	CHANGE_PASSWORD_REQUEST = 'confirm/CHANGE_PASSWORD_REQUEST',
	CHANGE_PASSWORD_SUCCESS = 'confirm/CHANGE_PASSWORD_SUCCESS',
	CHANGE_PASSWORD_FAILED = 'confirm/CHANGE_PASSWORD_FAILED',

	SIGN_UP = 'signUp/SIGN_UP',
	SIGN_UP_SUCCESS = 'auth/SIGN_UP_SUCCESS',
	SIGN_UP_FAILED = 'auth/SIGN_UP_FAILED',

	SET_SIGN_UP_ERRORS = 'auth/SET_SIGN_UP_ERRORS',
}

export const Actions = {
	login: createAction(ActionTypes.LOGIN)<SignInFormValues>(),
	loginSuccess: createAction(ActionTypes.LOGIN_SUCCESS)<string>(),
	loginFailed: createAction(ActionTypes.LOGIN_FAILED)<any>(),

	setToken: createAction(ActionTypes.SET_TOKEN)(),
	setLoginErrors: createAction(ActionTypes.SET_LOGIN_ERRORS)(),

	forgotPassword: createAction(ActionTypes.FORGOT_PASSWORD_REQUEST)<string>(),
	forgotPasswordSuccess: createAction(ActionTypes.FORGOT_PASSWORD_SUCCESS)(),
	forgotPasswordFailed: createAction(ActionTypes.FORGOT_PASSWORD_FAILED)<any>(),

	confirmCode: createAction(ActionTypes.CONFIRM_CODE_REQUEST)<string>(),
	confirmCodeSuccess: createAction(ActionTypes.CONFIRM_CODE_SUCCESS)(),
	confirmCodeFailed: createAction(ActionTypes.CONFIRM_CODE_FAILED)<any>(),

	resendCode: createAction(ActionTypes.RESEND_CODE)<string>(),

	changePassword: createAction(ActionTypes.CHANGE_PASSWORD_REQUEST)<
		ChangePassword
	>(),
	changePasswordSuccess: createAction(ActionTypes.CHANGE_PASSWORD_SUCCESS)(),
	changePasswordFailed: createAction(ActionTypes.CHANGE_PASSWORD_FAILED)<any>(),

	signUp: createAction(ActionTypes.SIGN_UP)<SignUpFormValues>(),
	signUpSuccess: createAction(ActionTypes.SIGN_UP_SUCCESS)(),
	signUpFailed: createAction(ActionTypes.SIGN_UP_FAILED)<any>(),

	setSignUpErrors: createAction(ActionTypes.SET_SIGN_UP_ERRORS)(),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
