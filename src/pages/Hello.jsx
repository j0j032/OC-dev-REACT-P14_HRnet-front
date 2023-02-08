import React from 'react'
import {NavLink} from 'react-router-dom'

export const Hello = () => {
	return (
		<>
			<div>
				<NavLink to={'/employees'}>Go to employees </NavLink>
			</div>
		</>
	)
}
