import {Loader} from '../../../../components/common/Loader/Loader.jsx'
import {useQuery, useQueryClient} from 'react-query'
import {deleteEmployee, getEmployeeById} from '../../../../../api/employees/requests.js'
import React, {useState} from 'react'
import {Error} from '../../../../components/common/Error/Error.jsx'
import {formatToLocale} from '../../../../../utils/formater.js'
import editIcon from '../../../../../assets/icons/edit.svg'
import deleteIcon from '../../../../../assets/icons/delete.svg'
import sendIcon from '../../../../../assets/icons/send.svg'
import imgPlaceholder from '../../../../../assets/imgPlaceholder.svg'
import useBoolean from '../../../../../hooks/useBoolean.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import {UploadPicture} from '../../../../components/common/UploadPicture/UploadPicture.jsx'
import {EditEmployee} from '../EditEmployee/EditEmployee'

export const EmployeeDetails = ({id, closeModal}) => {
	const [file, setFile] = useState({preview: '', data: {}})
	const queryClient = useQueryClient()
	const [alertIsOpen, {setTrue: openAlert, setFalse: closeAlert}] = useBoolean(false)
	const [isOpenModal, {openModal, closeModal: close}] = useModal(false)
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {data, isLoading, error, isError} = useQuery(['employee'], () => getEmployeeById(id), {
		refetchOnWindowFocus: false
	})
	const [isEditing, {setToggle: toggleEditing}] = useBoolean()
	
	const submit = async data => {
		/*const employee = JSON.stringify(data)
		const company = JSON.stringify(companyInfo)
		const formData = new FormData()
		formData.append('employee', employee)
		formData.append('company', company)
		if (file.data !== {}) formData.append('image', file.data)
		await sendEmployee(formData)
		await queryClient.invalidateQueries({queryKey: ['employees'], type: 'active'})
		setFile({preview: '', data: {}})
		resetForm()*/
	}
	
	const handleEdit = async () => {
	
	}
	
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
					{isEditing ? <EditEmployee data={data}/> :
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
						<img className='icon' src={sendIcon} alt={`Send message to ${data.firstname}`}/>
						<img onClick={toggleEditing} className='icon' src={editIcon} alt={`Edit ${data.firstname} profile`}/>
						{isOpenModal && <UploadPicture file={file} setFile={setFile} isOpen={isOpenModal} close={close}/>}
						<img onClick={openAlert} className='icon' src={deleteIcon} alt={`Delete ${data.firstname} profile`}/>
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
