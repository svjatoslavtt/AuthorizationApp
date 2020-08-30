import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation SignUp(
		$email: String!
		$password: String!
		$isAgreeWithPrivacyPolicyAndTermOfUse: Boolean!
		$fullName: String!
		$phone: String!
		$countryCode: String!
		$notifications: Boolean!
	) {
		registration(
			input: {
				email: $email
				password: $password
				isAgreeWithPrivacyPolicyAndTermOfUse: $isAgreeWithPrivacyPolicyAndTermOfUse
				profileInput: {
					fullName: $fullName
					phone: $phone
					countryCode: $countryCode
					notifications: $notifications
				}
			}
		) {
			email
		}
	}
`;
