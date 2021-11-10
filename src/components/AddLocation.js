import { Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './AddLocation.module.css'
import React from 'react';

const AddLocation = () => {
	return (
		<div className={styles.container}>
			<Typography sx={{ fontWeight: 'bold' }} variant="body1">
				Add location
			</Typography>

			<TextField
				sx={{ width: '40%' }}
				id="location"
				placeholder="Want to add a Location?"
			></TextField>

			<Button
				startIcon={<SendIcon />}
				className={styles.button}
				variant="contained"
			>
				Post
			</Button>
		</div>
	);
};

export default AddLocation;
