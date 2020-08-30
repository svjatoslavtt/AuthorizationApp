import { push } from 'connected-react-router';
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';

import { CHANGE_PASSWORD } from '../../app/pages/ChangePassword/changePassword.query';
import { CONFIRM_CODE } from '../../app/pages/ConfirmCode/confirmCode.query';
import { FORGOT_PASSWORD } from '../../app/pages/ForgotPassword/forgotPassword.query';
import { SIGN_IN } from '../../app/pages/SignIn/signin.query';
import { SIGN_UP } from '../../app/pages/SignUp/signup.query';
import { request } from '../../shared/utils';

import { Actions as ProfileActions } from '../profile/actions';

import { Actions, ActionTypes } from './actions';

const profileData = {
	email: '',
	fullName: '',
	phone: '',
	countryCode: '',
	notifications: false,
};

export const logoutEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.SET_TOKEN),
		map(() => {
			localStorage.removeItem('token');
			localStorage.removeItem('id');
			return ProfileActions.setProfile(profileData);
		})
	);

export const loginEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.LOGIN),
		mergeMap((action) => request(action.payload, SIGN_IN)),
		map((result: any) => {
			if (result.data.login) {
				localStorage.setItem('token', result.data.login.authToken);
				localStorage.setItem('id', result.data.login._id);

				return Actions.loginSuccess(result.data.login.authToken);
			} else {
				return Actions.loginFailed(result.errors);
			}
		}),
		catchError((err) => of(Actions.loginFailed(err)))
	);

export const redirectToProfileEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.LOGIN_SUCCESS),
		map(() => push('/profile'))
	);

export const signUpEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.SIGN_UP),
		mergeMap((action) => request(action.payload, SIGN_UP)),
		map((result: any) => {
			if (result.data.registration) {
				return Actions.signUpSuccess();
			} else {
				return Actions.signUpFailed(result.errors);
			}
		}),
		catchError((err) => of(Actions.signUpFailed(err)))
	);

export const redirectToLogin: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.SIGN_UP_SUCCESS),
		map(() => push('/sign-in'))
	);

export const forgotPasswordEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.FORGOT_PASSWORD_REQUEST),
		mergeMap((action) => request({ email: action.payload }, FORGOT_PASSWORD)),
		map((result: any) => {
			if (result.data.resetPassword) {
				return Actions.forgotPasswordSuccess();
			} else {
				return Actions.forgotPasswordFailed(result.errors);
			}
		})
	);

export const redirectToConfirmCodeEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.FORGOT_PASSWORD_SUCCESS),
		map(() => push('/confirm-code'))
	);

export const confirmCodeEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.CONFIRM_CODE_REQUEST),
		mergeMap((action) => request({ code: action.payload }, CONFIRM_CODE)),
		map((result: any) => {
			if (result.data.resetPasswordConfirmCode) {
				return Actions.confirmCodeSuccess();
			} else {
				return Actions.confirmCodeFailed(result.errors);
			}
		})
	);

export const redirectToChangePasswordEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.CONFIRM_CODE_SUCCESS),
		map(() => push('/change-password'))
	);

export const changePasswordEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.CHANGE_PASSWORD_REQUEST),
		mergeMap((action) => request(action.payload, CHANGE_PASSWORD)),
		map((result: any) => {
			if (result.data.resetPasswordConfirm) {
				return Actions.changePasswordSuccess();
			} else {
				return Actions.changePasswordFailed(result.errors);
			}
		})
	);

export const redirectToSignIn: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.CHANGE_PASSWORD_SUCCESS),
		map(() => push('/sign-in'))
	);

export const resendCodeEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.RESEND_CODE),
		mergeMap((action) => request(action.payload, FORGOT_PASSWORD)),
		map((result: any) => {
			if (result.data.resetPassword) {
				return Actions.forgotPasswordSuccess();
			} else {
				return Actions.forgotPasswordFailed(result.errors);
			}
		})
	);
