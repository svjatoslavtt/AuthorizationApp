import gql from 'graphql-tag';

export const CHANGE_PASSWORD = gql`
	mutation ChangePassword($code: String!, $password: String!) {
		resetPasswordConfirm(
			input: { resetPasswordCode: $code, password: $password }
		)
	}
`;
