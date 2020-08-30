import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../shared/PrivateRoute/PrivateRoute';

import ChangePassword from './pages/ChangePassword/ChangePassword';
import ConfirmCode from './pages/ConfirmCode/ConfirmCode';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

const App: React.FC = () => {
	return (
		<Switch>
			<Route exact={true} path='/sign-in' component={SignIn} />
			<Route exact={true} path='/sign-up' component={SignUp} />
			<Route exact={true} path='/forgot-password' component={ForgotPassword} />
			<Route exact={true} path='/confirm-code' component={ConfirmCode} />
			<Route exact={true} path='/change-password' component={ChangePassword} />
			<PrivateRoute exact={true} path='/profile' component={Profile} />
			<Redirect from='/' to='/sign-up' />
		</Switch>
	);
};

export default App;
