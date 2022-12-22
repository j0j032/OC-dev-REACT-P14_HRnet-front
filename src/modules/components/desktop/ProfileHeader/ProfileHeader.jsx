import {useQuery, useQueryClient} from 'react-query'
import {handleLogout} from '../../../../api/user/requests.js'
import {useNavigate} from 'react-router-dom'
import {BiLogOut} from 'react-icons/all.js'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'
import {smallerScreenNavConfig} from '../../../../config/breakPoints.js'

export const ProfileHeader = () => {
	const windowSize = useWindowSize()
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
			<img className='profile-picture picture-s' src={userInfos.picture} alt={`Profile picture of ${userInfos.firstname}`}/>
			{windowSize.width > smallerScreenNavConfig ?
				
				<div>
					<div>
						<h1>{userInfos.firstname}</h1>
						<BiLogOut onClick={logout} className='icon-btn icon-btn--font'/>
					</div>
					<p>{userInfos.title}</p>
				</div>
				: null}
		</div>
	)
}
