import {DarkMode} from '../../common/DarkMode/DarkMode.jsx'
import React from 'react'

const Header = ({company}) => {
	
	return (
		<header className='header__container'>
			<div className='header__company'>
				<h1>{company.name}</h1>
				<img src={company.logo} alt='Company logo'/>
			</div>
			<DarkMode/>
		</header>
	)
}

export default Header
