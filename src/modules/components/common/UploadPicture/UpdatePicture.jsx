import React, {useState} from 'react'
import Modal from '../../Modal/Modal.jsx'
import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import {updateEmployee} from '../../../../api/employees/requests.js'
import {useQueryClient} from 'react-query'
import {BsCloudUpload} from 'react-icons/all.js'

export const UpdatePicture = ({isOpen, close, employee}) => {
	const currentUserPicture = employee.picture !== 'none' ? employee.imageUrl : imgPlaceholder
	const queryClient = useQueryClient()
	const [file, setFile] = useState({preview: currentUserPicture, data: {}})
	
	const pictureSelected = e => setFile({preview: (URL.createObjectURL(e.target.files[0])), data: e.target.files[0]})
	
	const cancel = () => setFile({preview: '', data: {}})
	
	const closeAndCancel = () => {
		setFile({preview: '', data: {}})
		close()
	}
	
	const submit = async () => {
		if (file.data?.name) {
			const employeeUpdated = JSON.stringify({_id: employee._id, picture: employee.picture, ...employee})
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
		       customBtn={{'color': 'var(--FONT-color)', 'top': '1rem', 'right': '1rem', 'fontSize': '1.4rem'}}
		       isOpen={isOpen}>
			<div className='upload-pic__container'>
				<img className='upload-pic__pic-review' src={file.preview ? file.preview : employee.imageUrl} alt='Profile picture'/>
				<input className='display-none' id='input-file-upload' type='file' accept='.jpeg, .jpg, .png' onChange={pictureSelected} multiple={false}/>
				<label className='drag-and-drop-files' htmlFor='input-file-upload'>
					<div>
						<p>Drop your file or <span>browse</span></p>
						<BsCloudUpload className='icon icon-bigger'/>
					</div>
				</label>
				<div className='upload-pic__btns-container'>
					<button className='form-btn' onClick={submit}>Confirm</button>
					<button className='form-btn' onClick={cancel}>Cancel</button>
				</div>
			</div>
		</Modal>
	)
}
