import {BsLinkedin, FiSettings, MdOutlineHelpOutline, TfiHeadphoneAlt} from 'react-icons/all.js'

export const Footer = () => {
	return (
		<footer className='nav-footer'>
			<MdOutlineHelpOutline className='icon-btn icon-btn--invert'/>
			<FiSettings className='icon-btn icon-btn--invert'/>
			<BsLinkedin className='icon-btn icon-btn--invert'/>
			<TfiHeadphoneAlt className='icon-btn icon-btn--invert'/>
		</footer>
	)
}
