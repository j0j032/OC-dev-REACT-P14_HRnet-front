import useWindowSize from '../../../../hooks/useWindowSize.jsx'
import logo from '../../../../assets/logoHrnetW.svg'
import favicon from '../../../../../public/faviconHR.svg'
import {smallerScreenNavConfig} from '../../../../config/breakPoints.js'

export const Footer = () => {
	const windowSize = useWindowSize()
	return (
		<footer className='nav-footer'>
			{windowSize.width < smallerScreenNavConfig ? <img className='footer-small-logo' src={favicon} alt='logo'/> : <img src={logo} alt='logo'/>}
		</footer>
	)
}
