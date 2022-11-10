import {useQuery} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {handleLogin} from './requests.js'

export const useLogin = (data, {enabled}) => {
	const navigate = useNavigate()
	return useQuery('login', () => handleLogin(data), {
		enabled,
		onSuccess: () => navigate('/employees'),
		onError: () => console.log('err')
	})
}
