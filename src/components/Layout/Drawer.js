import React from 'react';
import {
	Drawer as MDrawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../../utils/authUser';
import { useRouter } from 'next/router';

const Drawer = ({
	user: { unreadNotification, unreadMessage, email, username },
}) => {
	const router = useRouter();
	const items = [
		{
			text: 'Home',
			icon: <HomeIcon />,
			action: () => router.push('/'),
		},
		{
			text: 'Message',
			icon: <ChatIcon />,
		},
		{
			text: 'Notifications',
			icon: <NotificationsIcon />,
		},
		{
			text: 'Account',
			icon: <ManageAccountsIcon />,
		},
		{
			text: 'Logout',
			icon: <LogoutIcon />,
			action: () => logoutUser(email),
		},
	];

	return (
		<div>
			<MDrawer
				sx={{
					width: 240,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: 240,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<List>
					{items.map((item) => (
						<ListItem button onClick={item.action} key={item.text}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</MDrawer>
		</div>
	);
};

export default Drawer;
