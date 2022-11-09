import React from 'react'
import {Outlet} from 'react-router-dom'
/**
 * Render all child routes elements
 * doc: https://reactrouter.com/en/main/components/outlet
 * @returns {JSX.Element}
 */
const Layout = () => {
	return (
		<>
			<Outlet/>
		</>
	)
}

export default Layout
