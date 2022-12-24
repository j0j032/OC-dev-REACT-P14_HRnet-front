import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useQuery} from 'react-query'

const RequireAuth = () => {
	const {data} = useQuery(['login'], {enabled: false})
	const location = useLocation()
	const token = data ? data.accessToken : null
	
	return token !== null ? (<Outlet/>) : (<Navigate to='/' state={{from: location}} replace/>)
}

export default RequireAuth
