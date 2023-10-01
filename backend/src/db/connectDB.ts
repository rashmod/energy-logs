import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
	const dbURI = process.env.DB_URI;
	if (!dbURI) throw new Error('Add database uri to environment variables');

	try {
		await mongoose.connect(dbURI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error;
	}
};

export default connectDB;
