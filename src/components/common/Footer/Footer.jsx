import useWindowSize from '../../../hooks/useWindowSize.jsx'
import logo from '../../../assets/logoHrnetW.svg'
import logoSmall from '../../../assets/faviconHR.svg'
import {smallerScreenNavConfig} from '../../../config/breakPoints.js'

export const Footer = () => {
	const windowSize = useWindowSize()
	return (
		<footer className='nav-footer'>
			{windowSize.width < smallerScreenNavConfig
				? <img className='footer-small-logo' src={logoSmall} alt='logo'/>
				: <img src={logo} alt='logo'/>
			}
		</footer>
	)
}
