import {DarkMode} from '../DarkMode/DarkMode'
import React from 'react'

const Header = ({company}) => {
	
	return (
		<header className='header__container'>
			<div className='header__logo'></div>
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
