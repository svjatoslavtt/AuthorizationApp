import gql from 'graphql-tag';

export const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			_id
			authToken
		}
	}
`;
