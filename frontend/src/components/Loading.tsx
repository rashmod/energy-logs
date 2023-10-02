const Loading = () => {
	return (
		<div className='flex items-center justify-center grow'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100'
				height='100'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
				className='lucide lucide-loader-2 animate-spin'>
				<path d='M21 12a9 9 0 1 1-6.219-8.56' />
			</svg>
		</div>
	);
};

export default Loading;
