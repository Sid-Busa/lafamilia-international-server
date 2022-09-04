import mongoose from 'mongoose';

const URL = process.env.MONGODB_URL;

const Connection = async () => {
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to mongoDB');
	} catch (error) {
		console.log('Error', error.message);
	}
};

export default Connection;
