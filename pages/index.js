import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, TextField, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import Searchbar from '../src/components/Searchbar';
import styles from '../styles/Home.module.css';

export default function Home({ user, userFollowStats }) {
	return (
		<>
			<div className={styles.container}>
				<section className={styles['new-post-section']}>
					<div className={styles['new-post-text']}>
						<Avatar />
						<TextField
							placeholder="What are you thinking about?"
							sx={{ width: '70%' }}
							minRows={3}
							multiline
						/>
					</div>

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
					<Divider />
				</section>

				<section></section>
			</div>
			<div className={styles.searchbar}>
				<Box>
					<Searchbar></Searchbar>
				</Box>
			</div>
		</>
	);
}
