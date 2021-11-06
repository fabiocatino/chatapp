import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const { name, email, password, bio } = user;

	const changeHandler = (e) => {
		const { placeholder, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[placeholder.toLowerCase()]: value,
		}));
	};

	const submitHandler = () => {};

	return (
		<Container className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				<TextField
					required
					id="email"
					placeholder="Email"
					autoComplete="email"
					type="email"
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
