import express, { Request, Response } from 'express';
import LogModel from '../Model/LogModel';

const router = express.Router();

router.post('/access', async (req: Request, res: Response) => {
	const { employeeName, filter } = req.body;

	const log = await LogModel.create({
		employeeName,
		filter,
		accessTime: Date.now(),
	});
	res.status(200).json({ success: true, data: log });
});

export default router;
