import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import { TData } from '../types/ChartData';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponent = () => {
	const [fetchedData, setFetchedData] = useState<TData[]>();
	const [chartData, setChartData] = useState<{
		data: number[];
		labels: string[];
	}>();

	const fetchData = async () => {
		const response = await fetch(
			'./src/data/lightson.new_energySaving_interview_qn_1213.json'
		);
		const data = await response.json();
		setFetchedData(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (fetchedData) {
			const groupedData = fetchedData.reduce(
				(acc: { [key: string]: number }, item) => {
					const date = item.createdAt.$date.slice(0, 10); // Extract date part
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

			console.log({ sortedGroupedData });

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

	return (
		<div>
			<div>Chart Component</div>
			{chartData && (
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
			)}
		</div>
	);
};

export default ChartComponent;
