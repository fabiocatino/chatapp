import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	Alert,
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { registerUser } from '../../utils/authUser';
import baseUrl from '../../utils/baseUrl';
import uploadPic from '../../utils/uploadPicToCloudinary';
import DragNDrop from './DragNDrop';
import styles from './SignupForm.module.css';
import SocialMediaProfiles from './SocialMediaProfiles';

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
	const [error, setError] = useState('');
	const [username, setUsername] = useState('');
	const [usernameAvailable, setUsernameAvailable] = useState(false);
	const [media, setMedia] = useState(null);
	const [mediaPreview, setMediaPreview] = useState(null);
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const { name, email, password, bio } = user;
	const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
	const inputRef = useRef();
	let cancel;

	const changeHandler = (e) => {
		const { placeholder, value, files } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[placeholder.toLowerCase()]: value,
		}));

		if (placeholder === 'media' && files.length !== 0) {
			setMedia(files[0]);
			setMediaPreview(URL.createObjectURL(files[0]));
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		let profilePicUrl;

		if (media !== null) {
			profilePicUrl = await uploadPic(media);
		}

		if (media !== null && !profilePicUrl) {
			return setError('Error while uploading Image');
		}

		await registerUser(user, profilePicUrl, setError);
	};

	useEffect(() => {
		const isUser = Object.values({ name, email, password, bio }).every((item) =>
			Boolean(item)
		);

		isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
	}, [user]);

	const checkUsername = async () => {
		try {
			cancel && cancel();

			const CancelToken = axios.CancelToken;

			const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
				cancelToken: new CancelToken((canceler) => (cancel = canceler)),
			});
			if (res.data === 'Available') {
				setUsernameAvailable(true);
				setUser((prevUser) => ({ ...prevUser, username }));
			}
		} catch (err) {
			setError('Username already taken');
			setUsernameAvailable(false);
		}
	};

	useEffect(() => {
		const identifier = setTimeout(() => {
			username === '' ? setUsernameAvailable(false) : checkUsername();
		}, 500);

		return () => {
			clearTimeout(identifier);
		};
	}, [username]);

	return (
		<Container className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				{error && <Alert severity="error">{error}</Alert>}
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
