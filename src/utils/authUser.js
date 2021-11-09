import axios from 'axios';
import baseUrl from './baseUrl';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';

export const registerUser = async (user, profilePicUrl, setError) => {
	try {
		const res = await axios.post(`${baseUrl}/api/signup`, {
			user,
			profilePicUrl,
		});
		setToken(res.data);
	} catch (err) {
		const errorMsg = catchErrors(err);
		setError(errorMsg);
	}
};

export const loginUser = async (user, setError) => {
	try {
		const res = await axios.post(`${baseUrl}/api/auth`, {
			user,
		});
		setToken(res.data);
	} catch (err) {
		const errorMsg = catchErrors(err);
		setError(errorMsg);
	}
};

export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
};

const setToken = (token) => {
	cookie.set('token', token);
	Router.push('/');
};
