import React from 'react';
import {
	FooterMessage,
	HeaderMessage,
} from '../src/components/User/WelcomeMessages';
import { SignupForm } from '../src/components/User/SignupForm';

const Signup = () => {
	return (
		<div>
			<HeaderMessage />
			<SignupForm />
			<FooterMessage />
		</div>
	);
};

export default Signup;
