import {useQuery, useQueryClient} from 'react-query'
import logoutIcon from '../../../../assets/icons/lateralNAv/Logout.svg'
import {handleLogout} from '../../../../api/user/requests.js'
import {useNavigate} from 'react-router-dom'

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
					<img onClick={logout} className='icon' src={logoutIcon} alt='Log out'/>
				</div>
				<p>{userInfos.title}</p>
			</div>
		</div>
	)
}
