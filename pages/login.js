import React from 'react';
import LoginForm from '../src/components/User/LoginForm';
import { FooterMessage, HeaderMessage } from '../src/components/User/WelcomeMessages';

const Login = () => {
	return (
		<div>
			<HeaderMessage />
			<LoginForm></LoginForm>
			<FooterMessage />
		</div>
	);
};

export default Login;
