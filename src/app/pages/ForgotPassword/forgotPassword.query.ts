import gql from 'graphql-tag';

export const FORGOT_PASSWORD = gql`
	mutation ResetPassword($email: String!) {
		resetPassword(email: $email)
	}
`;
