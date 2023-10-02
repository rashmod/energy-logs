import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TData } from '../types/ChartData';
import { TEmployee } from '../App';
import Loading from './Loading';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponent = ({ employee }: { employee: TEmployee }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (employee.employeeName === '' || employee.filter === '')
			navigate('/', { replace: true });
	}, [employee, navigate]);

	const [fetchedData, setFetchedData] = useState<TData[]>();
	const [chartData, setChartData] = useState<{
		data: number[];
		labels: string[];
	}>();

	const fetchData = useCallback(async () => {
		const response = await axios.get('http://localhost:5000/chart', {
			params: employee,
		});
		const data = await response.data;
		setFetchedData(data.data);
	}, [employee]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (fetchedData) {
			const groupedData = fetchedData.reduce(
				(acc: { [key: string]: number }, item) => {
					const date = item.createdAt.slice(0, 10); // Extract date part
					if (acc[date]) {
						acc[date] += item.total_kwh;
					} else {
						acc[date] = item.total_kwh;
					}
					return acc;
				},
				{}
			);

			const sortedGroupedData = Object.entries(groupedData)
				.sort((a, b) => a[0].localeCompare(b[0])) // Sort as strings
				.reduce((acc: { [key: string]: number }, [key, value]) => {
					acc[key] = value;
					return acc;
				}, {});

			const chartLabels = Object.keys(sortedGroupedData);
			const chartValues = Object.values(sortedGroupedData);

			const data = {
				labels: chartLabels,
				data: chartValues,
			};

			setChartData(data);
		}
	}, [fetchedData]);

	console.log(chartData);

	if (!chartData) return <Loading />;

	if (chartData)
		return (
			<Bar
				data={{
					labels: chartData.labels,
					datasets: [
						{
							label: 'Total kWh per Day',
							data: chartData.data,
							borderWidth: 1,
							backgroundColor: 'blue',
						},
					],
				}}
			/>
		);
};

export default ChartComponent;
