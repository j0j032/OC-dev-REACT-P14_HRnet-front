import React, {useState} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Layout from './Layout.jsx'
import {Employees} from '../modules/views/Employees/Employees'
import {Error404} from '../modules/views/Error404/Error404'
import {Login} from '../modules/views/Login/Login'
import RequireAuth from './RequireAuth.jsx'
import {SearchContext} from '../context/SearchContext'
import {AnimatePresence} from 'framer-motion'

const RouterConfig = () => {
	
	const [search, setSearch] = useState('')
	const location = useLocation()
	return (
		<SearchContext.Provider value={{search, setSearch}}>
			<AnimatePresence>
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
			</AnimatePresence>
		</SearchContext.Provider>
	)
}

export default RouterConfig
