import axios from 'axios'
import {useQuery} from 'react-query'
import {useNavigate} from 'react-router-dom'

const url = 'http://localhost:3500/auth'
const handleLogin = async (formData) => axios.post(url, formData).then(r => r.data)

export const useLogin = (data, {enabled}) => {
	const navigate = useNavigate()
	return useQuery('login', () => handleLogin(data), {
		enabled,
		onSuccess: () => navigate('/employees'),
		onError: () => console.log('err')
	})
}
