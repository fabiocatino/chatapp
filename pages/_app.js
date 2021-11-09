import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../src/components/Layout/Layout';
import '../styles/globals.css';
import NProgress from 'nprogress';
import '../public/nprogress.css';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import baseUrl from '../src/utils/baseUrl';
import { redirectUser } from '../src/utils/authUser';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
	}, [router.events]);

	return (
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<Layout {...pageProps} />
			<Component {...pageProps} />
		</StyledEngineProvider>
	);
}

export default MyApp;

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { token } = parseCookies(ctx);
	let pageProps = {};

	const protectedRoutes = ctx.pathname === '/';

	if (!token) {
		protectedRoutes && redirectUser(ctx, '/login');
	}
	//
	else {
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		try {
			const res = await axios.get(`${baseUrl}/api/auth`, {
				headers: { Authorization: token },
			});

			const { user, userFollowStats } = res.data;

			if (user) !protectedRoutes && redirectUser(ctx, '/');

			pageProps.user = user;
			pageProps.userFollowStats = userFollowStats;
		} catch (err) {
			destroyCookie(ctx, 'token');
			redirectUser(ctx, '/login');
		}
	}

	return { pageProps };
};
