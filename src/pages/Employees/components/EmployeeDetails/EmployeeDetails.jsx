import {Loader} from '../../../../components/common/Loader/Loader.jsx'
import React from 'react'
import {Error} from '../../../../components/common/Error/Error.jsx'
import {formatTimestampToDate} from '../../../../utils/formater.js'
import imgPlaceholder from '../../../../assets/imgPlaceholder.webp'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import {EditEmployee} from '../EditEmployee/EditEmployee.jsx'
import {BsTrash2, FiEdit, RiCloseFill, RiImageEditFill, TbSend} from 'react-icons/all.js'
import {UpdatePicture} from '../../../../components/common/UploadPicture/UpdatePicture.jsx'
import {useDeleteEmployee, useGetEmployee} from '../../../../api/employees.js'
import {useGetUserInfos} from '../../../../api/user.js'

export const EmployeeDetails = ({id, closeModal}) => {
	
	//<editor-fold desc="STARTERS">
	const [alertIsOpen, {setTrue: openAlert, setFalse: closeAlert}] = useBoolean(false)
	const [isUploaderOpen, {setTrue: openUploader, setFalse: closeUploader}] = useBoolean(false)
	const [isEditing, {setTrue: openEdit, setFalse: closeEdit, setToggle: toggleEditing}] = useBoolean(false)
	const {company} = useGetUserInfos()
	const {data, isLoading, error, isError} = useGetEmployee(id)
	const {mutate} = useDeleteEmployee()
	//</editor-fold>
	
	const handleDelete = async () => {
		await mutate(id)
		closeModal()
	}
	
	return (
		<>
			{isLoading ? <Loader/> : isError ? <Error message={error.message}/> : (
				<div className='employee-details__container'>
					{isLoading ? <Loader/> : <img src={data.picture !== 'none' ? data.imageUrl : imgPlaceholder} alt={`Profile picture of ${data.firstname}`}/>}
					{isEditing ? <EditEmployee employee={data} editMode={toggleEditing}/> :
						//<editor-fold desc="EMPLOYEE DETAILS">
						<div className='employee-details__infos'>
							<div className='employee-details__heading'>
								<div className='employee-details__names'>
									<h1>{data.firstname}</h1>
									<h1>{data.lastname}</h1>
								</div>
								<p> {`Joined ${company.name} : ${formatTimestampToDate(data.hired)}`}</p>
							</div>
							<h3> 💼 {data.title}</h3>
							<p> 👫 {data.department} team</p>
							<div className='employee-details__personal'>
								<h3>Personal details:</h3>
								<p>🎂 {formatTimestampToDate(data.birthdate)}</p>
								<p>📱 {data.contact.phone}</p>
								<p>✉️ {data.contact.mail}</p>
								<p>📫 Address:</p>
								<p>{data.address.street}</p>
								<p>{`${data.address.city} ${data.address.stateAbb} ${data.address.zip}`}</p>
							</div>
						</div>
						//</editor-fold>
					}
					<div className='employee-details__options'>
						<TbSend className='icon-btn icon-btn--invert' alt={`Send message to ${data.firstname}`}/>
						<editor-fold desc='_TOGGLE EDIT BTN_'>
							{isEditing
								? <RiCloseFill onClick={closeEdit}
								               className='icon-btn icon-btn--invert'
								               alt={`Stop Editting ${data.firstname} profile`}/>
								: <FiEdit onClick={openEdit}
								          className='icon-btn icon-btn--invert'
								          alt={`Edit ${data.firstname} profile`}/>
							}
						</editor-fold>
						<editor-fold desc='_OPEN UPDATE PIC_'>
							<RiImageEditFill className='icon-btn icon-btn--invert' onClick={openUploader}/>
							{
								isUploaderOpen && <UpdatePicture employee={data} isOpen={isUploaderOpen} close={closeUploader}/>
							}
						</editor-fold>
						<BsTrash2 onClick={openAlert} className='icon-btn icon-btn--invert' alt={`Delete ${data.firstname} profile`}/>
					</div>
					<div className='employee-details__company'><img src={company.logo} alt='Company logo'/></div>
					<editor-fold desc='_CONFIRM OR CANCEL DELETE_'>
						{alertIsOpen
							? <div className='confirm-container'>
								<p>{`Are you sure you want to delete ${data.firstname} ?`}</p>
								<div>
									<button className='btn btn-black form-btn' onClick={handleDelete}>Confirm</button>
									<button className='btn btn-black form-btn' onClick={closeAlert}>Cancel</button>
								</div>
							</div>
							: null
						}
					</editor-fold>
				</div>
			)}
		</>
	)
}
