import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import expressSession from 'express-session';

import connectDB from './db/connectDB';
import EnergyRoutes from './Routes/EnergyRoutes';

declare module 'express-session' {
	interface SessionData {
		user: any;
	}
}

dotenv.config();

const app = express();

if (!process.env.COOKIE_SECRET) {
	throw new Error('Set cookie secret in the environment variable');
}

if (!process.env.CLIENT_URL) {
	throw new Error('Set client url in the environment variable');
}

if (process.env.NODE_ENV === 'PRODUCTION') {
	app.set('trust proxy', 1);

	app.use(
		expressSession({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
			cookie: {
				sameSite: 'none',
				secure: true,
				maxAge: 1000 * 60 * 60 * 24 * 7, // one week
			},
		})
	);
}

if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(
		expressSession({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
		})
	);
}

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

connectDB();

// try {
// 	const jsonData = fs.readFileSync(
// 		path.resolve(
// 			__dirname,
// 			'../../frontend/src/data/lightson.new_energySaving_interview_qn_1213.json'
// 		),
// 		'utf-8'
// 	);
// 	const data = JSON.parse(jsonData);
// 	insertData(data);
// } catch (error) {
// 	console.log(error);
// }

app.use('/', EnergyRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server running in environment: ${process.env.NODE_ENV}`);
	console.log(`server running on port: ${process.env.PORT}`);
});
