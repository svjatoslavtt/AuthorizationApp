export interface SignUpFormValues {
	fullName: string;
	email: string;
	phone: string;
	countryCode: string;
	password: string;
	isAgreeWithPrivacyPolicyAndTermOfUse: boolean;
	notifications?: boolean;
}
