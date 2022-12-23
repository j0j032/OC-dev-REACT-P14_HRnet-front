import {BurgerMenu} from '../../common/BurgerMenu/BurgerMenu'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import LateralNav from '../../common/LateralNav/LateralNav'
import {handleLogout} from '../../../../api/user/requests.js'
import {useQueryClient} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {DarkMode} from '../../common/DarkMode/DarkMode'
import {BiLogOut} from 'react-icons/all.js'
import imgPlaceholder from '../../../../assets/imgPlaceholder.webp'

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
			<div onClick={toggleProfile} className='mobile-nav__profile'>
				<img src={user.picture ? user.picture : imgPlaceholder}
				     alt={`Profile picture of ${user.firstname}`}/>
			</div>
			<BurgerMenu toggle={toggleNav} state={isNavOpen}/>
			{isNavOpen ? <LateralNav/> : null}
			{isProfileOpen ?
				<>
					<div className='mobile-nav__profile-menu'>
						<BiLogOut onClick={logout} className='icon-btn icon-btn--font'/>
						<DarkMode/>
					</div>
				</>
				: null}
		</section>
	)
}
