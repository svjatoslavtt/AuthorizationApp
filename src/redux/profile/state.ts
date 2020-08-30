import { Profile } from '../../shared/interfaces/profile.interface';

export interface ProfileState {
	profileData: Profile;
	errors: any;
	isLoading: boolean;
	setModal: boolean;
}
