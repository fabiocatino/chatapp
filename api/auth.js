const express = require('express');
const router = express.Router();
const UserModel = require('../src/models/User');
const FollowerModel = require('../src/models/Follower');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

router.post('/', async (req, res) => {
	const { email, password } = req.body.user;

	if (!isEmail(email)) return res.status(401).send('Invalid Email');
	if (password.length < 7) {
		return res.status(401).send('Password must be at least 7 characters');
	}

	try {
		const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
			'+password'
		);
		if (!user) {
			return res.status(401).send('Invalid credentials.');
		}

		const isPassword = await bcrypt.compare(password, user.password);

		if (!isPassword) {
			return res.status(401).send('Invalid Password');
		}

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
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server error');
	}
});

module.exports = router;
