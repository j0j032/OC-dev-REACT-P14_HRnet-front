import React, {useState} from 'react'
import Modal from '../../Modal/Modal.jsx'
import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import {updateEmployee} from '../../../../api/employees/requests.js'
import {useQueryClient} from 'react-query'

export const UpdatePicture = ({isOpen, close, employee}) => {
	const queryClient = useQueryClient()
	const [file, setFile] = useState({preview: '', data: {}})
	
	const pictureSelected = e => setFile({preview: (URL.createObjectURL(e.target.files[0])), data: e.target.files[0]})
	
	const cancel = () => setFile({preview: '', data: {}})
	
	const closeAndCancel = () => {
		setFile({preview: '', data: {}})
		close()
	}
	
	const submit = async (data) => {
		if (file.data?.name) {
			const employeeUpdated = JSON.stringify({_id: employee._id, picture: employee.picture})
			const formData = new FormData()
			formData.append('employee', employeeUpdated)
			formData.append('image', file.data)
			await updateEmployee(formData)
			await queryClient.invalidateQueries({queryKey: ['employee'], type: 'active'})
			await queryClient.invalidateQueries({queryKey: ['employees'], type: 'active'})
		} else {
			alert('no file selected')
		}
		setFile({preview: '', data: {}})
		close()
	}
	
	return (
		<Modal modalId='handleUpload'
		       handleClose={closeAndCancel}
		       isOpen={isOpen}>
			<div className='upload-pic__container'>
				<img className='upload-pic__pic-review' src={file.preview ? file.preview : imgPlaceholder} alt='Profile picture'/>
				<input type='file' accept='.jpeg, .jpg, .png' onChange={pictureSelected}/>
				<button onClick={submit}>Confirm</button>
				<button onClick={cancel}>Cancel</button>
			</div>
		</Modal>
	)
}
