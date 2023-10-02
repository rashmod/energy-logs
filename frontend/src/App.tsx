import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import ChartComponent from './components/ChartComponent';
import FormComponent from './components/FormComponent';
import Navbar from './components/Navbar';

export type TEmployee = { employeeName: string; filter: string };

function App() {
	const [employee, setEmployee] = useState({ employeeName: '', filter: '' });

	console.log(employee);

	return (
		<div className='flex flex-col items-center min-h-screen'>
			<div className='flex flex-col w-10/12 pb-8 grow'>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={
							<FormComponent
								employee={employee}
								setEmployee={setEmployee}
							/>
						}
					/>
					<Route
						path='/chart'
						element={<ChartComponent employee={employee} />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
