import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'

import axios from 'axios'

//Routes
// base: 'http://localhost:3500/auth'
// login :'/' - logout: '/logout' - refresh: '/refresh'
const authURL = 'http://localhost:3500/auth'

const handleLogin = async (formData) => axios.post(authURL, formData).then(r => r.data)
const handleLogout = async () => axios.get(`${authURL}/logout`).then(r => r.data)

export const useGetUserInfos = () => {
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	return {userInfos, company}
}

export const user = (data, {enabled}) => {
	const navigate = useNavigate()
	return useQuery('login', () => handleLogin(data), {
		enabled,
		onSuccess: () => navigate('/employees'),
		onError: () => console.log('err')
	})
}

export const useLogout = () => {
	const queryClient = useQueryClient()
	return useMutation(async () => {
		await handleLogout()
	}, {
		onSuccess: () => queryClient.cancelQueries('login')
	})
}
