import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import formatDate from '../utilities/formatDate';

export type TLog = {
	_id: string;
	employeeName: string;
	accessTime: string;
	filter: string;
};

const LogsComponent = () => {
	const [logs, setLogs] = useState<TLog[]>();

	const fetchData = async () => {
		const response = await axios.get(
			`${import.meta.env.VITE_BACKEND_BASE_URL}/logs`
		);
		const data = await response.data;
		setLogs(data.data);
	};

	useEffect(() => {
		fetchData();
	}, []);
	if (!logs) return <Loading />;
	return (
		<div>
			<h1 className='mb-4 text-xl font-bold text-center'>Logs</h1>
			{logs && (
				<div className='grid gap-3'>
					{logs.map((item) => (
						<div
							key={item._id}
							className='px-4 py-2 border border-gray-600 rounded'>
							<div className='text-lg font-medium'>
								Accessed By: {item.employeeName}
							</div>
							<div className='flex justify-between text-sm text-gray-600'>
								<div>
									Access time: {formatDate(item.accessTime)}
								</div>
								<div>Filter Applied: {item.filter}</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LogsComponent;
