import React from 'react'
import {ProfileHeader} from '../../desktop/ProfileHeader/ProfileHeader.jsx'
import {Footer} from '../Footer/Footer.jsx'
import {Menu} from '../Menu/Menu.jsx'
import {motion} from 'framer-motion'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'

const LateralNav = () => {
	const windowSize = useWindowSize()
	return (
		<motion.div initial={{x: -10}} animate={{x: 0}} exit={{x: -100}} className='lateralNav__container'>
			{windowSize.width > 600 ? <ProfileHeader/> : null}
			<Menu/>
			<Footer/>
		</motion.div>
	)
}

export default React.memo(LateralNav)
