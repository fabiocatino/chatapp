import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
	Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loginUser } from '../../utils/authUser';
import cookie from 'js-cookie';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const { name, email } = user;

	const changeHandler = (e) => {
		const { placeholder, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[placeholder.toLowerCase()]: value,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		await loginUser(user, setError);
	};

	useEffect(() => {
		const userEmail = cookie.get('userEmail');
		if (userEmail) {
			setUser((prevUser) => ({ ...prevUser, email: userEmail }));
		}
	}, []);
	return (
		<Container className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				{error && <Alert severity="error">{error}</Alert>}
				<TextField
					required
					id="email"
					placeholder="Email"
					autoComplete="email"
					type="email"
					value={email ?? ''}
					onChange={changeHandler}
				/>

				<TextField
					required
					id="password"
					placeholder="Password"
					autoComplete="current-password"
					type={showPassword ? 'text' : 'password'}
					onChange={changeHandler}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<Button type="submit" variant="contained">
					LOGIN
				</Button>
			</form>
		</Container>
	);
};

export default LoginForm;
