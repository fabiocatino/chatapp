import { Avatar, Divider, TextField } from '@mui/material';
import { Box } from '@mui/system';
import AddLocation from '../src/components/AddLocation';
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
					<div className={styles['add-location']}>
						<AddLocation></AddLocation>
					</div>
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
