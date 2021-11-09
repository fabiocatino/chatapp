import Drawer from '../src/components/Layout/Drawer';
import styles from '../styles/Home.module.css';

export default function Home({ user, userFollowStats }) {
	return (
		<div>
			<Drawer user={user}/>
			<div className={styles.container}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
				quis?
			</div>
		</div>
	);
}
