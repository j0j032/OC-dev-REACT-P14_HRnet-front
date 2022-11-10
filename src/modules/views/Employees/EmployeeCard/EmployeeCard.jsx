import eyeIcon from '../../../../assets/icons/Eye.svg'

export const EmployeeCard = ({hired, firstname, lastname, title, department, picture, contact, address}) => {
	
	return (
		<article className='emp-card__container'>
			<div className='emp-card__top-container'>
				<p><span>Hired:</span>{` ${hired.slice(0, 10)}`}</p>
				<img className='icon' src={eyeIcon} alt='Have a look on this employee'/>
			</div>
			<div className='emp-card__heading-container'>
				<img src='src/assets/img/Test-1.jpg' alt='profile picture'/>
				<h1>{`${firstname} ${lastname}`}</h1>
				<h2>{title}</h2>
				<p>{`${department} team`}</p>
			</div>
			<div className='emp-card__infos'>
				<p>{`✉️\u00A0\u00A0\u00A0${contact.mail}`}</p>
				<p>{`📱\u00A0\u00A0${contact.phone}`}</p>
				<div className='emp-card__address'>
					<p>📫</p>
					<div>
						<p>{address.street}</p>
						<p>{`${address.city}\u00A0\u00A0${address.state}`}</p>
						<p>{address.zip}</p>
					</div>
				</div>
			</div>
		</article>
	)
}
