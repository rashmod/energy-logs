import { MongoClient } from 'mongodb';
import { DataDocument } from '../types/Energy';
import transformData from './transformData';

async function insertData(dataArray: DataDocument[]) {
	const dbURI = process.env.DB_URI;
	if (!dbURI) throw new Error('Add database uri to environment variables');
	const client = new MongoClient(
		'mongodb+srv://bhushan:-$*DwuM4R$ZXazW@cluster0.thl7y.mongodb.net/?retryWrites=true&w=majority'
	);

	try {
		await client.connect();
		const db = client.db('ICapotech');
		const collection = db.collection('energySavings');

		// Insert the entire array into the collection
		const transformedData = transformData(dataArray);
		const result = await collection.insertMany(transformedData);
		console.log(`Inserted ${result.insertedCount} documents`);
	} catch (error) {
		console.log(error);
	} finally {
		client.close();
	}
}

export default insertData;
