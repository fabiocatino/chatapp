import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import styles from './SignupForm.module.css';
import SocialMediaProfiles from './SocialMediaProfiles';
import DragNDrop from './DragNDrop';

export const SignupForm = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		bio: '',
		facebook: '',
		tiktok: '',
		youtube: '',
		twitter: '',
		instagram: '',
	});

	const [showSocialLinks, setShowSocialLinks] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');
	const [usernameAvailable, setUsernameAvailable] = useState(false);
	const [media, setMedia] = useState(null);
	const [mediaPreview, setMediaPreview] = useState(null);
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const { name, email, password, bio } = user;
	const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
	const inputRef = useRef();

	const changeHandler = (e) => {
		const { placeholder, value, files } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[placeholder.toLowerCase()]: value,
		}));
		
		if (placeholder === 'media' && files.length !== 0) {
			setMedia(files[0])
			setMediaPreview(URL.createObjectURL(files[0]))
		}
	};

	const submitHandler = () => {};

	useEffect(() => {
		const isUser = Object.values({ name, email, password, bio }).every((item) =>
			Boolean(item)
		);

		isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
	}, [user]);

	return (
		<Container className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				<DragNDrop
					inputRef={inputRef}
					changeHandler={changeHandler}
					mediaPreview={mediaPreview}
					setMediaPreview={setMediaPreview}
					setMedia={setMedia}
				></DragNDrop>
				
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
				<SocialMediaProfiles
					user={user}
					showSocialLinks={showSocialLinks}
					setShowSocialLinks={setShowSocialLinks}
					changeHandler={changeHandler}
				></SocialMediaProfiles>

				<Button
					disabled={submitDisabled || !usernameAvailable}
					type="submit"
					variant="contained"
				>
					SING UP
				</Button>
			</form>
		</Container>
	);
};

export default SignupForm;
