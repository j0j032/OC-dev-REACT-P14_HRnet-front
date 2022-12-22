import React from 'react'
import {ProfileHeader} from '../../desktop/ProfileHeader/ProfileHeader.jsx'
import {Footer} from '../Footer/Footer.jsx'
import {Menu} from '../Menu/Menu.jsx'
import {motion} from 'framer-motion'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'
import {mobileConfig} from '../../../../config/breakPoints.js'

const LateralNav = () => {
	const windowSize = useWindowSize()
	return (
		<motion.div initial={{x: -10}} animate={{x: 0}} exit={{x: -100}} className='lateralNav__container'>
			{windowSize.width > mobileConfig ? <ProfileHeader/> : null}
			<Menu/>
			{windowSize.width > mobileConfig ? <Footer/> : null}
		</motion.div>
	)
}

export default React.memo(LateralNav)
