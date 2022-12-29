import React, {Suspense} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Layout from './Layout.jsx'
import RequireAuth from './RequireAuth.jsx'
import {AnimatePresence} from 'framer-motion'
import {Loader} from '../components/common/Loader/Loader'

const Login = React.lazy(() => import('../pages/Login/Login'))
const Employees = React.lazy(() => import('../pages/Employees/Employees'))
const Error404 = React.lazy(() => import('../pages/Error404/Error404'))


const RouterConfig = () => {
	
	const location = useLocation()
	return (
		<AnimatePresence>
			<Suspense fallback={<Loader/>}>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Layout/>}>
						
						{/*public*/}
						<Route path='/' element={<Login/>}/>
						
						{/*private*/}
						<Route element={<RequireAuth/>}>
							<Route path='/employees' element={<Employees/>}/>
						</Route>
						
						{/*CatchAll*/}
						<Route path='*' element={<Error404/>}/>
					
					</Route>
				</Routes>
			</Suspense>
		</AnimatePresence>
	)
}


export default RouterConfig
