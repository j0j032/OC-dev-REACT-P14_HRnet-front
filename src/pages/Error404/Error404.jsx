import {DarkMode} from '../../components/common/DarkMode/DarkMode.jsx'
import {NavLink, useNavigate} from 'react-router-dom'
import React from 'react'

const Error404 = () => {
	const navigate = useNavigate()
	return (
		<>
			<header className='error-404__header'>
				<NavLink to={'/employees'}>
					<div className='header__logo'></div>
				</NavLink>
				<DarkMode/>
			</header>
			
			<main className='error-404__content'>
				<div className='error-404__content-layer'>
					<h1>404</h1>
					<div className='error-404__content-layer2'>
						<p>
							Sorry, <br/>
							👨‍🚀 You're lost <br/>
							The Location couldn't be found..<br/><br/>
							👀 If you're trying to access another page <br/>
							from the menu ! keep in mind.. this web app is fake <br/>
							The only page and functionalities you can access is: Employees
						</p>
						<button onClick={() => navigate('/employees')}>Go Back</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default Error404
