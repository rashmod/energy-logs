import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='flex justify-between py-2 mb-4 border-b border-black'>
			<NavLink to='/'>Home</NavLink>
		</nav>
	);
};

export default Navbar;
