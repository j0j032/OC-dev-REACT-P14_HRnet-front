import React from 'react'
import {NavLink} from 'react-router-dom'

export const Link = ({path, text, icon}) => {
	return (
		<NavLink className='navigation__link' activeclassname='navigation__link active' to={path}>
			{icon}
			<p>{text}</p>
		</NavLink>
	)
}
