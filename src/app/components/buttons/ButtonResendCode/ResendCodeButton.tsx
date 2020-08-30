import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../../../../redux/auth/actions';
import { RootState } from '../../../../redux/store';

import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { ButtonColorsEnum, ButtonTypesEnum } from '../buttonComponentEnum';

interface Test {
	setErrors: any;
}

const ResendCodeButton: React.FC<Test> = ({ setErrors }) => {
	const dispatch = useDispatch();

	const [successMessage, setSuccessMessage] = useState(<></>);
	const [stateMessage, setStateMessage] = useState(false);

	const email = useSelector((state: RootState) => state.auth.email);
	const setLoading: boolean = useSelector(
		(state: RootState) => state.auth.isLoading
	);

	const handleClickResend = () => {
		dispatch(Actions.resendCode(email));
		setStateMessage(true);
		setTimeout(() => setStateMessage(false), 2000);
	};

	useEffect(() => {
		setSuccessMessage(<Alert severity="success">Code was resend!</Alert>);
	}, [stateMessage]);

	return (
		<>
			<ButtonComponent
				center={true}
				disabled={setLoading || stateMessage}
				color={ButtonColorsEnum.secondary}
				text={setLoading ? 'Loading...' : 'Resend code'}
				type={ButtonTypesEnum.button}
				onClick={handleClickResend}
			/>

			{stateMessage && (
				<div style={{ marginTop: '30px' }}>{successMessage}</div>
			)}
		</>
	);
};

export default ResendCodeButton;
