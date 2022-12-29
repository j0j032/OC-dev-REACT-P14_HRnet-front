import React from 'react'
import {Modal} from 'basic-modal-react'
import {EmployeeDetails} from '../EmployeeDetails/EmployeeDetails.jsx'
import imgPlaceHolder from '../../../../assets/imgPlaceholder.webp'
import {useQueryClient} from 'react-query'
import {formatTimestampToDate} from '../../../../utils/formater.js'
import useBoolean from '../../../../hooks/useBoolean.jsx'

export const EmployeeCard = ({data}) => {
	const [isOpenModal, {setTrue: openModal, setFalse: closeModal}] = useBoolean(false)
	const {hired, firstname, lastname, title, department, imageUrl, picture, contact, _id} = data
	const queryClient = useQueryClient()
	
	const handleCloseModal = async () => {
		await queryClient.removeQueries('employee')
		closeModal()
	}
	
	return (
		<>
			<div className='emp-card__BGfixed'>
				<article onClick={openModal}
				         className='emp-card__container'>
					<div className='emp-card__top-container'>
						<p><span>Hired: </span>{formatTimestampToDate(hired)}</p>
					</div>
					<div className='emp-card__heading-container'>
						<img className='profile-picture picture-l card-cover'
						     src={picture !== 'none' ? imageUrl : imgPlaceHolder}
						     alt='profile picture'/>
						<h1>{`${firstname} ${lastname}`}</h1>
						<h2>{title}</h2>
						<p>{`${department} team`}</p>
					</div>
					<div className='emp-card__infos'>
						<p>{`✉️\u00A0\u00A0\u00A0${contact.mail}`}</p>
						<p>{`📱\u00A0\u00A0${contact.phone}`}</p>
					</div>
				</article>
			</div>
			<Modal handleClose={handleCloseModal}
			       modalId='modal'
			       isOpen={isOpenModal}
			       customBtn={{color: 'var(--COMPANY-theme-color)'}}
			       customBG={{backdropFilter: 'blur(2px)'}}>
				<EmployeeDetails id={_id} closeModal={handleCloseModal}/>
			</Modal>
		</>
	)
}
