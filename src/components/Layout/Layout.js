import React from 'react';
import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({ children }) => {
	return (
		<div>
			<Head>
				<title>Chat</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
