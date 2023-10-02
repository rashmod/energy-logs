import express, { Request, Response } from 'express';
import EnergyModel from '../Model/EnergyModel';
import LogModel from '../Model/LogModel';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	const { employeeName, filter } = req.query;

	const data = await EnergyModel.find();
	const log = await LogModel.create({
		employeeName,
		filter,
		accessTime: Date.now(),
	});

	res.status(200).json({ success: true, data, log });
});

export default router;
