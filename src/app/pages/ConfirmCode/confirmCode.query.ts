import gql from 'graphql-tag';

export const CONFIRM_CODE = gql`
	mutation ResetPasswordConfirmCode($code: String!) {
		resetPasswordConfirmCode(resetPasswordCode: $code)
	}
`;
