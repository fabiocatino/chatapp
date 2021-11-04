import { Container, Typography, Link as MLink } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './WelcomeMessages.module.css';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import HelpIcon from '@mui/icons-material/Help';

export const HeaderMessage = () => {
	const router = useRouter();
	const signupRoute = router.pathname === '/signup';

	return (
		<Container className={styles.container}>
			<Container className={styles['top-messages']}>
				{signupRoute ? (
					<AddIcon sx={{ fontSize: 50, color: '#417c79' }} />
				) : (
					<VpnKeyIcon sx={{ fontSize: 50, color: '#417c79' }} />
				)}

				<div>
					<Typography variant="h6">
						{signupRoute ? 'Get Started' : 'Welcome Back'}
					</Typography>
					<Typography variant="body1">
						{signupRoute
							? 'Create New Account'
							: 'Login with email and password'}
					</Typography>
				</div>
			</Container>
		</Container>
	);
};

export const FooterMessage = () => {
	const router = useRouter();
	const signupRoute = router.pathname === '/signup';

	return (
		<>
			<Container className={styles.container}>
				<div className={styles.forgot}>
				<Link href="/reset" passHref={true}>
					<MLink variant="body1">Forgot password?</MLink>
				</Link>
				</div>
			</Container>

			<Container className={styles.container}>
				<Typography variant="body1">
					{signupRoute ? (
						<div className={styles['existing-user']}>
							<HelpIcon sx={{ fontSize: 30, color: '#417c79', marginRight: 1 }} />
							Existing User?
							<Link href="/login" passHref={true}>
								<MLink sx={{ margin: 1 }}>Login here</MLink>
							</Link>
							instead
						</div>
					) : (
						<div className={styles['existing-user']}>
						<HelpIcon sx={{ fontSize: 30, color: '#417c79', marginRight: 1 }} />
						New User?
						<Link href="/signup" passHref={true}>
							<MLink sx={{ margin: 1 }}>Sign up here</MLink>
						</Link>
						instead
					</div>
					)}
				</Typography>
			</Container>
		</>
	);
};
