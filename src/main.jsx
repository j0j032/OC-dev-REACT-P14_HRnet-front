import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import RouterConfig from './navigation/RouterConfig.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path='/*' element={<RouterConfig/>}/>
			</Routes>
		</QueryClientProvider>
	</BrowserRouter>
)
