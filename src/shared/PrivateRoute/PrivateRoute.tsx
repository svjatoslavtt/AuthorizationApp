import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
	component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	...rest
}) => {
	
	const token = localStorage.getItem('token');
	
	const handlerRender = (props: RouteProps) => {
		if (token) {
			return <Component {...props} />
		} else {
			return (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location },
					}}
				/>
			)
		}
	}
	
	return (
		<Route {...rest} render={handlerRender} />
	);
};
export default PrivateRoute;
