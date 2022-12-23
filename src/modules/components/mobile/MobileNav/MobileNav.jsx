import {BurgerMenu} from '../../common/BurgerMenu/BurgerMenu'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import LateralNav from '../../common/LateralNav/LateralNav'
import {useNavigate} from 'react-router-dom'
import {DarkMode} from '../../common/DarkMode/DarkMode'
import {BiLogOut} from 'react-icons/all.js'
import imgPlaceholder from '../../../../assets/imgPlaceholder.webp'
import {useLogout} from '../../../../api/user.js'

export const MobileNav = ({user}) => {
	const navigate = useNavigate()
	const [isNavOpen, {setToggle: toggleNav}] = useBoolean(false)
	const [isProfileOpen, {setToggle: toggleProfile}] = useBoolean(false)
	const {mutate, error, isSuccess} = useLogout()
	
	const logout = async () => {
		await mutate()
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
