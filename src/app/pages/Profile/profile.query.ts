import gql from 'graphql-tag';

export const getProfileUser = gql`
	query GetDataProfile($userId: String!) {
		user(id: $userId) {
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
