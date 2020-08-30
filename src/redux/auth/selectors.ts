import { createSelector } from 'reselect';

import { RootState } from '../store';

const getAuthState = (state: RootState) => state.auth;

export const getIsAuthLoading = createSelector(
	getAuthState,
	(state) => state.isLoading
);

export const getAuthStateErrors = createSelector(
	getAuthState,
	(state) => state.errors
);

export const getAuthCode = createSelector(getAuthState, (state) => state.code);
