import {Loader} from '../../../../components/common/Loader/Loader.jsx'
import {useQuery, useQueryClient} from 'react-query'
import {deleteEmployee, getEmployeeById} from '../../../../../api/employees/requests.js'
import React from 'react'
import {Error} from '../../../../components/common/Error/Error.jsx'
import {formatToLocale} from '../../../../../utils/formater.js'
import imgPlaceholder from '../../../../../assets/imgPlaceholder.svg'
import useBoolean from '../../../../../hooks/useBoolean.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import {EditEmployee} from '../EditEmployee/EditEmployee'
import {BsTrash2, FiEdit, RiCloseFill, RiImageEditFill, TbSend} from 'react-icons/all.js'
import {UpdatePicture} from '../../../../components/common/UploadPicture/UpdatePicture'

export const EmployeeDetails = ({id, closeModal}) => {
	const queryClient = useQueryClient()
	const [alertIsOpen, {setTrue: openAlert, setFalse: closeAlert}] = useBoolean(false)
	const [isChangePicOpen, {openModal: openChangePic, closeModal: closeChangePic}] = useModal(false)
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {data, isLoading, error, isError} = useQuery(['employee'], () => getEmployeeById(id), {
		refetchOnWindowFocus: false
	})
	const [isEditing, {setTrue: openEdit, setFalse: closeEdit, setToggle: toggleEditing}] = useBoolean(false)
	
	
	const handleDelete = async () => {
		await deleteEmployee(id)
		await queryClient.invalidateQueries({queryKey: ['employees'], type: 'active'})
		closeModal()
	}
	
	return (
		<>
			{isLoading ? <Loader/> : isError ? <Error message={error.message}/> : (
				<div className='employee-details__container'>
					<img src={data.imageUrl ? data.imageUrl : imgPlaceholder} alt={`Profile picture of ${data.firstname}`}/>
					{isEditing ? <EditEmployee employee={data} editMode={toggleEditing}/> :
						<div className='employee-details__infos'>
							<div className='employee-details__heading'>
								<div className='employee-details__names'>
									<h1>{data.firstname}</h1>
									<h1>{data.lastname}</h1>
								</div>
								<p> {`Joined ${company.name} : ${formatToLocale(data.hired, 'en-US')}`}</p>
							</div>
							<h3> 💼 {data.title}</h3>
							<p> 👫 {data.department} team</p>
							<div className='employee-details__personal'>
								<h3>Personal details:</h3>
								<p>🎂 {formatToLocale(data.birthdate, 'en-US')}</p>
								<p>📱 {data.contact.phone}</p>
								<p>✉️ {data.contact.mail}</p>
								<p>📫 Address:</p>
								<p>{data.address.street}</p>
								<p>{`${data.address.city} ${data.address.state} ${data.address.zip}`}</p>
							</div>
						</div>
					}
					<div className='employee-details__options'>
						<TbSend className='icon-btn icon-btn--invert' alt={`Send message to ${data.firstname}`}/>
						{isEditing ? <RiCloseFill onClick={closeEdit} className='icon-btn icon-btn--invert' alt={`Stop Editting ${data.firstname} profile`}/>
							: <FiEdit onClick={openEdit} className='icon-btn icon-btn--invert' alt={`Edit ${data.firstname} profile`}/>}
						<RiImageEditFill className='icon-btn icon-btn--invert' onClick={openChangePic}/>
						{isChangePicOpen && <UpdatePicture employee={data} isOpen={isChangePicOpen} close={closeChangePic}/>}
						<BsTrash2 onClick={openAlert} className='icon-btn icon-btn--invert' alt={`Delete ${data.firstname} profile`}/>
					</div>
					<div className='employee-details__company'>
						<img src={company.logo} alt='Company logo'/>
					</div>
					{alertIsOpen ?
						<div className='confirm-container'>
							<p>{`⚠️ Are you sure you want to delete ${data.firstname} ?`}</p>
							<div>
								<button onClick={handleDelete}>Confirm</button>
								<button onClick={closeAlert}>Cancel</button>
							</div>
						</div>
						: null}
				</div>
			)}
		</>
	)
}
