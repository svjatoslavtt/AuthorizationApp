import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {
	changePasswordEpic,
	confirmCodeEpic,
	forgotPasswordEpic,
	loginEpic,
	logoutEpic,
	redirectToChangePasswordEpic,
	redirectToConfirmCodeEpic,
	redirectToLogin,
	redirectToProfileEpic,
	redirectToSignIn,
	resendCodeEpic,
	signUpEpic,
} from './auth/epics';
import { authReducer } from './auth/reducer';
import { AuthTokenState } from './auth/state';
import {
	editProfileDataEpic,
	requestProfileEpic,
	setModalEpic,
} from './profile/epics';
import { profileReducer } from './profile/reducer';
import { ProfileState } from './profile/state';

const epicMiddleware = createEpicMiddleware();

export interface RootState {
	auth: AuthTokenState;
	profile: ProfileState;
}

const rootEpic = combineEpics(
	logoutEpic,
	loginEpic,
	signUpEpic,
	requestProfileEpic,
	editProfileDataEpic,
	redirectToProfileEpic,
	setModalEpic,
	forgotPasswordEpic,
	redirectToConfirmCodeEpic,
	confirmCodeEpic,
	changePasswordEpic,
	redirectToSignIn,
	resendCodeEpic,
	redirectToChangePasswordEpic,
	redirectToLogin
);

const rootReducer = (history: any) =>
	combineReducers({
		auth: authReducer,
		profile: profileReducer,
		router: connectRouter(history),
	});

export const history = createBrowserHistory();

const store = createStore(
	rootReducer(history),
	composeWithDevTools(
		applyMiddleware(epicMiddleware, routerMiddleware(history))
	)
);

epicMiddleware.run(rootEpic);

export default store;
