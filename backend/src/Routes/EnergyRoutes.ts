import express, { Request, Response } from 'express';
import EnergyModel from '../Model/EnergyModel';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	const data = await EnergyModel.find();
	console.log(data);

	res.status(200).json({ success: true, data });
});

export default router;
