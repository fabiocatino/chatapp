import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user }) => {

	return (
		<div>
			<Head>
				<title>Chat</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{user ? (
				<></>
			) : (
				<>
					<Navbar />
				</>
			)}

			{children}
		</div>
	);
};

export default Layout;
