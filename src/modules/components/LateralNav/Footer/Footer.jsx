import help from '../../../../assets/icons/lateralNAv/help.svg'
import settings from '../../../../assets/icons/lateralNAv/settings.svg'
import linkedIn from '../../../../assets/icons/company/linkedin.svg'
import phone from '../../../../assets/icons/lateralNAv/phone.svg'

export const Footer = () => {
	return (
		<footer className='nav-footer'>
			<img src={help} alt='Link to help page'/>
			<img src={settings} alt='Link to settings page'/>
			<img src={linkedIn} alt='Link to user linkedin'/>
			<img src={phone} alt='Link to contact help center'/>
		</footer>
	)
}
