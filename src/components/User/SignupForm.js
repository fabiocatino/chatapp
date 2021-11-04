import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Container,
    IconButton,
    InputAdornment,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import styles from './SignupForm.module.css';

export const SignupForm = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		bio: '',
		facebook: '',
		youtube: '',
		twitter: '',
		instagram: '',
	});

	const [showSocialLinks, setShowSocialLinks] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');
	const [usernameLoading, setUsernameLoading] = useState(false);
	const [usernameAvailable, setUsernameAvailable] = useState(false);

	const { name, email, password, bio } = user;
	const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

	const changeHandler = (e) => {
		const { placeholder, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [placeholder]: value }));
	};

	const submitHandler = () => {};

	return (
		<Container className={styles.container}>
			<form onSubmit={submitHandler}></form>
			<TextField
				required
				id="name"
				placeholder="Name"
				autoComplete="given-name"
				type="text"
				onChange={changeHandler}
			/>

			<TextField
				error={usernameAvailable ? false : true}
				required
				id="username"
				placeholder="Username"
				autoComplete="username"
				type="text"
				helperText={error ? 'Invalid characters' : ''}
				onChange={(e) => {
					setUsername(e.target.value);
					if (regexUsername.test(e.target.value)) {
						setUsernameAvailable(true);
						setError(false);
					} else {
						setUsernameAvailable(false);
						setError(true);
					}
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{usernameAvailable ? (
								<CheckIcon sx={{ color: 'green' }} />
							) : (
								<ErrorIcon sx={{ color: 'red' }} />
							)}
						</InputAdornment>
					),
				}}
			/>

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

			<TextField
				required
				id="bio"
				placeholder="Bio"
				autoComplete="off"
				type="text"
				multiline
				rows={5}
				onChange={changeHandler}
			/>
		</Container>
	);
};

export default SignupForm;
