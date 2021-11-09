import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ user, userFollowStats }) {
	console.log({ user, userFollowStats });
	return (
		<div className={styles.container}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
			quis?
		</div>
	);
}
