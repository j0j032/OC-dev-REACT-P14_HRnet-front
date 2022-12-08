import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import Modal from '../../Modal/Modal.jsx'
import {BsCloudUpload} from 'react-icons/all.js'
import React from 'react'

export const UploadPicture = ({setFile, file, isOpen, close}) => {
	
	const pictureSelected = e => setFile({preview: (URL.createObjectURL(e.target.files[0])), data: e.target.files[0]})
	
	const cancel = () => setFile({preview: '', data: {}})
	
	const closeAndCancel = () => {
		setFile({preview: '', data: {}})
		close()
	}
	
	return (
		<Modal modalId='handleUpload'
		       handleClose={closeAndCancel}
		       customBtn={{'color': 'var(--FONT-color)', 'top': '1rem', 'right': '1rem', 'fontSize': '1.4rem'}}
		       isOpen={isOpen}>
			<div className='upload-pic__container'>
				<img className='profile-picture picture-l' src={file.preview ? file.preview : imgPlaceholder} alt='Profile picture'/>
				<input className='display-none' id='input-file-upload' multiple={false} type='file' accept='.jpeg, .jpg, .png' onChange={pictureSelected}/>
				<label className='drag-and-drop-files' htmlFor='input-file-upload'>
					<div>
						<p>Drop your file or <span>browse</span></p>
						<BsCloudUpload className='icon icon-bigger'/>
					</div>
				</label>
				<div className='upload-pic__btns-container'>
					<button className='form-btn' onClick={close}>Confirm</button>
					<button className='form-btn' onClick={cancel}>Cancel</button>
				</div>
			</div>
		</Modal>
	)
}

