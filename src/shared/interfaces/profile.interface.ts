export interface Profile {
	email: string;
	fullName: string;
	phone: string;
	countryCode: string;
	notifications: boolean;
}

export interface ProfileSuccess {
	email: string;
	profile: {
		fullName: string;
		phone: string;
		countryCode: string;
		notifications: boolean;
	};
}
