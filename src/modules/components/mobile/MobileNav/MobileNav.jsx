import {BurgerMenu} from '../../common/BurgerMenu/BurgerMenu'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import LateralNav from '../../common/LateralNav/LateralNav'
import logoutIcon from '../../../../assets/icons/lateralNAv/Logout.svg'
import {handleLogout} from '../../../../api/user/requests.js'
import {useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {DarkMode} from '../../common/DarkMode/DarkMode'

export const MobileNav = ({user}) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const [isNavOpen, {setToggle: toggleNav}] = useBoolean(false)
	const [isProfileOpen, {setToggle: toggleProfile}] = useBoolean(false)
	
	const logout = async () => {
		await queryClient.removeQueries('login')
		await handleLogout()
		navigate('/')
	}
	return (
		<section className='mobile-nav__container'>
			<BurgerMenu toggle={toggleNav} state={isNavOpen}/>
			<div onClick={toggleProfile} className='mobile-nav__profile'>
				<img src={user.picture} alt={`Profile picture of ${user.firstname}`}/>
			</div>
			{isNavOpen ? <LateralNav/> : null}
			{isProfileOpen ?
				<>
					<div className='mobile-nav__profile-menu'>
						<img onClick={logout} className='icon' src={logoutIcon} alt='Log out'/>
						<DarkMode/>
					</div>
				</>
				: null}
		</section>
	)
}
