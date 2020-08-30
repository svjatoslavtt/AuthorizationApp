import gql from 'graphql-tag';

export const UpdateDataProfile = gql`
	mutation UpdateData(
		$email: String!
		$fullName: String!
		$phone: String!
		$countryCode: String!
		$notifications: Boolean
	) {
		updateMe(
			input: {
				email: $email
				profileInput: {
					fullName: $fullName
					phone: $phone
					countryCode: $countryCode
					notifications: $notifications
				}
			}
		) {
			email
			profile {
				fullName
				phone
				countryCode
				notifications
			}
		}
	}
`;
