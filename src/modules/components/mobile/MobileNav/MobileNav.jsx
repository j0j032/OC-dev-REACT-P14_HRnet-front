import {BurgerMenu} from '../../common/BurgerMenu/BurgerMenu'
import useBoolean from '../../../../hooks/useBoolean.jsx'

export const MobileNav = ({user}) => {
	const [isOpen, {setToggle}] = useBoolean(false)
	return (
		<section className='mobile-nav__container'>
			<div className='mobile-nav__profile'>
				<img src={user.picture} alt={`Profile picture of ${user.firstname}`}/>
			</div>
			<BurgerMenu toggle={setToggle} state={isOpen}/>
		</section>
	)
}
