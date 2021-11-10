const UserModel = require('../src/models/User');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/:searchText', authMiddleware, async (req, res) => {
	try {
		const { searchText } = req.params;
		console.log(searchText.length);
		if (searchText.length === 0) {
			return;
		}

		let userPattern = new RegExp(`^${searchText}`);

		const results = await UserModel.find({
			name: { $regex: userPattern, $options: 'i' },
		});

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
});

module.exports = router;
