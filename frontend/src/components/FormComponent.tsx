import { FormEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { TEmployee } from '../App';

const FormComponent = ({
	employee,
	setEmployee,
}: {
	employee: TEmployee;
	setEmployee: Dispatch<SetStateAction<TEmployee>>;
}) => {
	const navigate = useNavigate();
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (
			employee.employeeName.trim() !== '' &&
			employee.filter.trim() !== ''
		) {
			navigate('/chart');
		}
	};
	return (
		<form
			onSubmit={onSubmitHandler}
			className='flex flex-col items-center justify-center gap-4 grow'>
			<div className='w-1/4'>
				<label
					htmlFor='employeeName'
					className='block text-sm font-medium text-gray-900'>
					Employee Name
				</label>
				<input
					type='text'
					id='employeeName'
					name='employeeName'
					className='bg-gray-50 border border-gray-600 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5'
					value={employee.employeeName}
					onChange={(e) =>
						setEmployee((prev) => ({
							...prev,
							employeeName: e.target.value,
						}))
					}
				/>
			</div>
			<div className='w-1/4'>
				<label
					htmlFor='filter'
					className='block text-sm font-medium text-gray-900'>
					Filter
				</label>
				<select
					id='filter'
					name='filter'
					className='border bg-gray-50 border-gray-600 rounded w-full p-2.5 text-lg'
					value={employee.filter}
					onChange={(e) =>
						setEmployee((prev) => ({
							...prev,
							filter: e.target.value,
						}))
					}>
					<option value=''>Choose a filter</option>
					<option value='filter1'>filter 1</option>
					<option value='filter2'>filter 2</option>
					<option value='filter3'>filter 3</option>
					<option value='filter4'>filter 4</option>
				</select>
			</div>
			<button className='px-4 py-2 mt-4 transition-all duration-200 border border-gray-600 rounded bg-gray-50 hover:text-white hover:bg-black hover:border-black'>
				Get chart
			</button>
		</form>
	);
};

export default FormComponent;
