import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../src/components/Layout/Layout';
import '../styles/globals.css';
import NProgress from 'nprogress';
import '../public/nprogress.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
	}, [router.events]);

	return (
		<StyledEngineProvider>
			<CssBaseline />
			<Layout />
			<Component {...pageProps} />
		</StyledEngineProvider>
	);
}

export default MyApp;
