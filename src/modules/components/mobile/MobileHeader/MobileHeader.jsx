import React from 'react'

const MobileHeader = ({company}) => {
	
	return (
		<header className='header__container--mobile'>
			<p><span>Hrnet </span>{`for ${company.name}`} </p>
			<img src={company.logo} alt='Company logo'/>
		</header>
	)
}

export default React.memo(MobileHeader)
