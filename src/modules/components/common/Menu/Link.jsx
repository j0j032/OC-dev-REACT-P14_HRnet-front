import React from 'react'
import {NavLink} from 'react-router-dom'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'
import {smallerScreenNavConfig, mobileConfig} from '../../../../config/breakPoints.js'

export const Link = ({path, text, icon}) => {
	const windowSize = useWindowSize()
	return (
		<NavLink className='navigation__link' activeclassname='navigation__link active' to={path}>
			{icon}
			{windowSize.width > smallerScreenNavConfig || windowSize.width < mobileConfig ? <p>{text}</p> : null}
		</NavLink>
	)
}
