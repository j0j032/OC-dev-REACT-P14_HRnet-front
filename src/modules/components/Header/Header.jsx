import dropdown from '../../../assets/icons/arrow/caret_down.svg'
import ProvisoryLogo from '../../../assets/icons/company/twitter.svg'
import {DarkMode} from '../DarkMode/DarkMode'

export const Header = ({company}) => {
	return (
		<header className='header__container'>
			<div className='header__logo'></div>
			<div className='header__R-container'>
				<DarkMode/>
				<div className='header__company'>
					<img src={ProvisoryLogo} alt='Company logo'/>
					<h1>{company.name}</h1>
					<img src={dropdown} alt='drop down'/>
				</div>
			</div>
		</header>
	)
}
