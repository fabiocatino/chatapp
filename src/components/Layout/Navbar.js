import { Button } from '@mui/material';
import React from 'react';
import styles from './Navbar.module.css';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Link from 'next/link';

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<Link href="/login">
				<Button color="inherit" variant="contained">
					<LoginIcon className={styles.icon} /> Login
				</Button>
			</Link>
			
			<Link href="/signup">
				<Button color="inherit" variant="contained">
					<LockOpenIcon className={styles.icon} /> Sign up
				</Button>
			</Link>
		</div>
	);
};

export default Navbar;
