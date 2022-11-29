import React from 'react'
import eyeIcon from '../../../../../assets/icons/Eye.svg'
import Modal from '../../../../components/Modal/Modal.jsx'
import {EmployeeDetails} from '../EmployeeDetails/EmployeeDetails.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import {formatToLocale} from '../../../../../utils/formater.js'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'
import imgPlaceholder from '../../../../../assets/imgPlaceholder.svg'

export const EmployeeCard = ({data}) => {
	const windowSize = useWindowSize()
	const [modalIsOpen, {openModal, closeModal}] = useModal(false)
	const {hired, firstname, lastname, title, department, picture, contact, address, _id} = data
	const cardRef = React.useRef()
	
	const handleMouseMove = (e) => {
		let xAxis = (cardRef.current.offsetWidth / 2 - e.pageX) / 25
		let yAxis = (cardRef.current.offsetHeight / 2 - e.pageY) / 25
		cardRef.current.style.transform = `scale(0.95) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
		
	}
	const handleMouseLeave = () => {
		cardRef.current.style.transform = `scale(1) rotateY(0deg) rotateX(0deg)`
	}
	
	return (
		<>
			<div className='emp-card__BGfixed'>
				<article onClick={openModal}
				         ref={cardRef}
				         onMouseMove={windowSize.width > 600 ? handleMouseMove : null}
				         onMouseLeave={windowSize.width > 600 ? handleMouseLeave : null}
				         className='emp-card__container'>
					<div className='emp-card__top-container'>
						<p><span>Hired: </span>{formatToLocale(hired, 'en-US')}</p>
						<img className='icon' src={eyeIcon} alt='Have a look on this employee'/>
					</div>
					<div className='emp-card__heading-container'>
						<img src={picture !== 'none' ? picture : imgPlaceholder} alt='profile picture'/>
						<h1>{`${firstname} ${lastname}`}</h1>
						<h2>{title}</h2>
						<p>{`${department} team`}</p>
					</div>
					{windowSize.width > 600 &&
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
					}
				</article>
			</div>
			<Modal handleClose={closeModal}
			       modalId='employee-details-modal'
			       isOpen={modalIsOpen}
			       customBtn={{color: 'var(--FONT-color)', border: '1px solid var(--BG-invert-color)'}}
			       customBG={{backdropFilter: 'blur(2px)'}}>
				<EmployeeDetails id={_id}/>
			</Modal>
		</>
	)
}
