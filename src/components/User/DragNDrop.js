import React from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import styles from './DragNDrop.module.css';
import { Typography } from '@mui/material';
import Image from 'next/image';

const DragNDrop = ({
	inputRef,
	changeHandler,
	mediaPreview,
	setMediaPreview,
	setMedia,
}) => {
	return (
		<>
			<input
				type="file"
				accept="image/*"
				className={styles.input}
				onChange={changeHandler}
				ref={inputRef}
				placeholder="media"
			/>
			<div>
				{mediaPreview === null ? (
					<div
						className={styles.container}
						onClick={() => {
							inputRef.current.click();
						}}
						onDragOver={(event) => event.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							const droppedFile = Array.from(e.dataTransfer.files);
							setMedia(droppedFile[0]);
							setMediaPreview(URL.createObjectURL(droppedFile[0]));
						}}
					>
						<ImageOutlinedIcon
							className={styles['image-icon']}
						></ImageOutlinedIcon>
						<Typography sx={{ fontWeight: 'bold' }} variant="body1">
							Drag N Drop or Click To Upload Image
						</Typography>
					</div>
				) : (
					<div className={styles.image}>
						<Image
							src={mediaPreview}
							height={300}
							width={300}
							onClick={() => inputRef.current.click()}
						></Image>
					</div>
				)}
			</div>
		</>
	);
};

export default DragNDrop;
