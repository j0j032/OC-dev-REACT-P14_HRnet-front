import {BurgerMenu} from '../../common/BurgerMenu/BurgerMenu.jsx'
import useBoolean from '../../../hooks/useBoolean.jsx'
import LateralNav from '../../common/LateralNav/LateralNav.jsx'
import {DarkMode} from '../../common/DarkMode/DarkMode.jsx'
import imgPlaceholder from '../../../assets/imgPlaceholder.webp'

export const MobileNav = ({user}) => {
	const [isNavOpen, {setToggle: toggleNav}] = useBoolean(false)
	const [isProfileOpen, {setToggle: toggleProfile}] = useBoolean(false)
	
	
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
						<DarkMode/>
					</div>
				</>
				: null}
		</section>
	)
}
