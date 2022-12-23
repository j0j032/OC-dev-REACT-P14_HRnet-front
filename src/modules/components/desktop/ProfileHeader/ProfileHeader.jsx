import {useQuery, useQueryClient} from 'react-query'
import {handleLogout} from '../../../../api/user/requests.js'
import {useNavigate} from 'react-router-dom'
import {BiLogOut} from 'react-icons/all.js'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'
import {smallerScreenNavConfig} from '../../../../config/breakPoints.js'
import useBoolean from '../../../../hooks/useBoolean.jsx'

export const ProfileHeader = () => {
	const [isOpenMenu, {setToggle: toggleMenu}] = useBoolean(false)
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
			<img onClick={toggleMenu}
			     className='profile-picture picture-s toggle-user-menu'
			     src={userInfos.picture}
			     alt={`Profile picture of ${userInfos.firstname}`}/>
			{windowSize.width > smallerScreenNavConfig ?
				<div>
					<div>
						<h1>{userInfos.firstname}</h1>
					</div>
					<p>{userInfos.title}</p>
				</div>
				: null}
			{isOpenMenu &&
				<div onClick={logout} className='user-menu'>
					<BiLogOut className='icon-btn icon-btn--font'/>
					<p>Logout</p>
				</div>
			}
		</div>
	)
}
