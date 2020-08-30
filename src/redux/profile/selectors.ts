import { createSelector } from 'reselect';

import { RootState } from '../store';

const getProfileState = (state: RootState) => state.profile;

export const getIsProfileLoading = createSelector(
	getProfileState,
	(state) => state.isLoading
);

export const getProfileStateErrors = createSelector(
	getProfileState,
	(state) => state.errors
);

export const getProfileStateModal = createSelector(
	getProfileState,
	(state) => state.setModal
);

export const getProfileData = createSelector(
	getProfileState,
	(state) => state.profileData
);
