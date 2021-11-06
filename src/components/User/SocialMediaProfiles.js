import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import styles from './SocialMediaProfiles.module.css';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Image from 'next/image';

const SocialMediaProfiles = ({
	user: { facebook, tiktok, twitter, instagram, youtube },
	changeHandler,
	showSocialLinks,
	setShowSocialLinks,
}) => {
	return (
		<>
			<Button
				className={styles.button}
				color="error"
				variant="contained"
				onClick={() => setShowSocialLinks(!showSocialLinks)}
			>
				Add Social Media Profiles
			</Button>

			{showSocialLinks && (
				<>
					<TextField
						id="facebook"
						placeholder="Facebook"
						autoComplete="off"
						type="text"
						onChange={changeHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FacebookTwoToneIcon
										sx={{ color: '#4267B2' }}
									></FacebookTwoToneIcon>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="instagram"
						placeholder="Instagram"
						autoComplete="off"
						type="text"
						onChange={changeHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<InstagramIcon sx={{ color: '#833AB4' }}></InstagramIcon>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="tiktok"
						placeholder="TikTok"
						autoComplete="off"
						type="text"
						onChange={changeHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Image src="/tiktok.svg" height={24} width={24}></Image>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="twitter"
						placeholder="Twitter"
						autoComplete="off"
						type="text"
						onChange={changeHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<TwitterIcon sx={{ color: '#1DA1F2' }}></TwitterIcon>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="youtube"
						placeholder="YouTube"
						autoComplete="off"
						type="text"
						onChange={changeHandler}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<YouTubeIcon sx={{ color: '#FF0000' }}></YouTubeIcon>
								</InputAdornment>
							),
						}}
					/>
				</>
			)}
		</>
	);
};

export default SocialMediaProfiles;
