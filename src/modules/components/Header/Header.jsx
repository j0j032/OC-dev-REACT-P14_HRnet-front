import dropdown from '../../../assets/icons/arrow/caret_down.svg'
import ProvisoryLogo from '../../../assets/icons/company/twitter.svg'

export const Header = ({company}) => {
	return (
		<header className='header__container'>
			<img className='header__logo' src='public/assets/Hrnet-heading-logo-black.svg' alt='logo'/>
			<div className='header__R-container'>
				DARK/LIGHT
				<div className='header__company'>
					<img src={ProvisoryLogo} alt='Company logo'/>
					<h1>{company.name}</h1>
					<img src={dropdown} alt='drop down'/>
				</div>
			</div>
		</header>
	)
}
