import express, { Request, Response } from 'express';
import LogModel from '../Model/LogModel';

const router = express.Router();

router.get('/logs', async (req: Request, res: Response) => {
	const logs = await LogModel.find().sort({ accessTime: -1 });

	res.status(200).json({ success: true, data: logs });
});

export default router;
