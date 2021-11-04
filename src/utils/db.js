const mongoose = require('mongoose');

async function connectDb() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {});
		console.log('Mongodb connected');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

module.exports = connectDb;
