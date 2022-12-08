import {useQuery, useQueryClient} from 'react-query'
import {handleLogout} from '../../../../api/user/requests.js'
import {useNavigate} from 'react-router-dom'
import {BiLogOut} from 'react-icons/all.js'

export const ProfileHeader = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {data} = useQuery(['login'], {enabled: false})
	const {userInfos} = data
	
	const logout = async () => {
		await queryClient.removeQueries('login')
		await handleLogout()
		navigate('/')
	}
	
	return (
		<div className='profile-header'>
			<img src={userInfos.picture} alt={`Profile picture of ${userInfos.firstname}`}/>
			<div>
				<div>
					<h1>{userInfos.firstname}</h1>
					<BiLogOut onClick={logout} className='icon-btn icon-btn--font'/>
				</div>
				<p>{userInfos.title}</p>
			</div>
		</div>
	)
}
