import {
	Autocomplete,
	Avatar,
	CircularProgress,
	List,
	ListItem,
	ListItemButton,
	TextField,
} from '@mui/material';
import axios from 'axios';
import cookie from 'js-cookie';
import React, { useState } from 'react';
import baseUrl from '../utils/baseUrl';
import { useRouter } from 'next/router';
import styles from './Searchbar.module.css';

let cancel;

const Searchbar = () => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const changeHandler = async (e) => {
		setLoading(true);
		const { value } = e.target;
		if (value.length === 0) return setLoading(false);

		try {
			cancel && cancel();
			const CancelToken = axios.CancelToken;
			const token = cookie.get('token');

			const res = await axios.get(`${baseUrl}/api/search/${value}`, {
				headers: { Authorization: token },
				cancelToken: new CancelToken((canceler) => {
					cancel = canceler;
				}),
			});

			if (res.data.length === 0) {
				return setLoading(false);
			}

			setResults(res.data);
		} catch (err) {
			console.log(err);
		}

		setLoading(false);
	};

	return (
		<Autocomplete
			id="autocomplete"
			className={styles.searchbar}
			isOptionEqualToValue={(results, value) => results._id === value.name}
			options={results}
			loading={loading}
			noOptionsText="No user found"
			getOptionLabel={(results) => results.name}
			renderOption={(props, { _id, name, profilePicUrl } = results) => (
				<List key={_id}>
					<ListItem disablePadding>
						<ListItemButton onClick={() => router.push('/')}>
							<Avatar sx={{ marginRight: 1 }} alt={name} src={profilePicUrl} />
							{name}
						</ListItemButton>
					</ListItem>
				</List>
			)}
			renderInput={(params) => (
				<TextField
					onBlur={() => setResults([])}
					{...params}
					label="Search by name"
					onChange={changeHandler}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default Searchbar;
