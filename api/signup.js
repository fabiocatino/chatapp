const express = require('express');
const router = express.Router();
const UserModel = require('../src/models/User');
const ProfileModel = require('../src/models/Profile');
const FollowerModel = require('../src/models/Follower');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const userPng =
	'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png';

router.get('/:username', async (req, res) => {
	const { username } = req.params;

	try {
		if (username.length < 1) return res.status(401).send('Invalid');
		if (!regexUsername.test(username)) return res.status(401).send('Invalid');

		const user = await UserModel.findOne({ username: username.toLowerCase() });

		if (user) return res.status(401).send('Username already taken');

		return res.status(200).send('Available');
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server error');
	}
});

router.post('/', async (req, res) => {
	const {
		name,
		email,
		username,
		password,
		bio,
		facebook,
		tiktok,
		youtube,
		twitter,
		instagram,
	} = req.body.user;

	if (!isEmail(email)) return res.status(401).send('Invalid Email');
	if (password.length < 7) {
		return res.status(401).send('Password must be at least 7 characters');
	}

	try {
		let user;
		user = await UserModel.findOne({ email: email.toLowerCase() });
		if (user) {
			return res.status(401).send('User already registered');
		}

		user = new UserModel({
			name,
			email: email.toLowerCase(),
			username: username.toLowerCase(),
			password,
			profilePicUrl: req.body.profilePicUrl || userPng,
		});

		user.password = await bcrypt.hash(password, 10);
		await user.save();

		let profileFields = {};
		profileFields.user = user._id;
		profileFields.bio = bio;
		profileFields.social = {};
		if (facebook) profileFields.social.facebook = facebook;
		if (instagram) profileFields.social.instagram = instagram;
		if (tiktok) profileFields.social.tiktok = tiktok;
		if (twitter) profileFields.social.twitter = twitter;
		if (youtube) profileFields.social.youtube = youtube;

		await new ProfileModel(profileFields).save();

		await new FollowerModel({
			user: user._id,
			followers: [],
			following: [],
		}).save();

		const payload = { userId: user._id };
		jwt.sign(
			payload,
			process.env.JwtSecret,
			{ expiresIn: '2d' },
			(err, token) => {
				if (err) throw err;
				res.status(200).json(token);
			}
		);
	} catch (error) {}
});

module.exports = router;
