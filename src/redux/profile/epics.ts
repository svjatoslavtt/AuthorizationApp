import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';

import { UpdateDataProfile } from '../../app/components/ModalWindowEditData/editData.query';
import { getProfileUser } from '../../app/pages/Profile/profile.query';
import { request } from '../../shared/utils';

import { Actions, ActionTypes } from './actions';

export const requestProfileEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.PROFILE_REQUEST),
		mergeMap((action) => request({ userId: action.payload }, getProfileUser)),
		map((result: any) => {
			if (result.data.user) {
				return Actions.profileSuccess(result.data.user);
			} else {
				return Actions.profileFailed(result.errors);
			}
		}),
		catchError((err) => of(Actions.profileFailed(err)))
	);

export const editProfileDataEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.UPDATE_PROFILE),
		mergeMap((action) => request(action.payload, UpdateDataProfile)),
		map((result: any) => {
			if (result.data.updateMe) {
				const updateProfile = {
					email: result.data.updateMe.email,
					profile: {
						fullName: result.data.updateMe.profile.fullName,
						phone: result.data.updateMe.profile.phone,
						countryCode: result.data.updateMe.profile.countryCode,
						notifications: result.data.updateMe.profile.notifications,
					},
				};

				return Actions.profileSuccess(updateProfile);
			} else {
				return Actions.profileFailed(result.errors);
			}
		}),
		catchError((err) => of(Actions.profileFailed(err)))
	);

export const setModalEpic: Epic = (action$) =>
	action$.pipe(
		ofType(ActionTypes.PROFILE_SUCCESS),
		map(() => Actions.setModal(false))
	);
