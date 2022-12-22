import React from 'react'
import Modal from '../../../../components/Modal/Modal.jsx'
import {EmployeeDetails} from '../EmployeeDetails/EmployeeDetails.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'
import {MdOutlineMoreHoriz} from 'react-icons/all.js'
import imgPlaceHolder from '../../../../../assets/imgPlaceholder.svg'
import {useQueryClient} from 'react-query'

export const EmployeeCard = ({data}) => {
	const windowSize = useWindowSize()
	const [modalIsOpen, {openModal, closeModal}] = useModal(false)
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
						<p><span>Hired: </span>{hired}</p>
					</div>
					<div className='emp-card__heading-container'>
						<img className='profile-picture picture-l card-cover' src={picture !== 'none' ? imageUrl : imgPlaceHolder} alt='profile picture'/>
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
			       isOpen={modalIsOpen}
			       customBtn={{color: 'var(--COMPANY-theme-color)'}}
			       customBG={{backdropFilter: 'blur(2px)'}}>
				<EmployeeDetails id={_id} closeModal={handleCloseModal}/>
			</Modal>
		</>
	)
}
