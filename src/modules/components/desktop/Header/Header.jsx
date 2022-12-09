import {DarkMode} from '../../common/DarkMode/DarkMode.jsx'
import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = ({company}) => {
	
	return (
		<header className='header__container'>
			<NavLink to={'/employees'}>
				<div className='header__logo'></div>
			</NavLink>
			<div className='header__R-container'>
				<DarkMode/>
				<div className='header__company'>
					<img src={company.logo} alt='Company logo'/>
					<h1>{company.name}</h1>
				</div>
			</div>
		</header>
	)
}

export default React.memo(Header)
