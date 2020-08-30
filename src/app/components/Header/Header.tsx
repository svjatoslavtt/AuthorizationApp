import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { Actions } from '../../../redux/auth/actions';
import { RootState } from '../../../redux/store';

import styles from './Header.module.scss';

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const authToken = useSelector((state: RootState) => state.auth.authToken);

	const Logout = () => {
		dispatch(Actions.setToken());
		return history.push('/SignIn');
	};

	return (
		<div className={styles.Header}>
			<ul>
				{authToken && (
					<li>
						<NavLink to='/profile' activeClassName={styles.activeLink}>
							Profile
						</NavLink>
					</li>
				)}
			</ul>

			{authToken && (
				<Button onClick={Logout} variant='contained' color='secondary'>
					Sign Out
				</Button>
			)}
		</div>
	);
};

export default Header;
