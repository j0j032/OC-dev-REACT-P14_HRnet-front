import {ProfileHeader} from './ProfileHeader/ProfileHeader'
import {Footer} from './Footer/Footer'
import {Menu} from './Menu/Menu.jsx'
import {motion} from 'framer-motion'

export const LateralNav = () => {
	return (
		<motion.div initial={{x: -100}} animate={{x: 0}} exit={{x: -100}} className='lateralNav__container'>
			<ProfileHeader/>
			<Menu/>
			<Footer/>
		</motion.div>
	)
}
