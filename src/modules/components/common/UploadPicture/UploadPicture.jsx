import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import Modal from '../../Modal/Modal.jsx'
import {BsCloudUpload} from 'react-icons/all.js'
import React, {useState} from 'react'

export const UploadPicture = ({setFile, file, isOpen, close}) => {
	const [dragActive, setDragActive] = useState(false)
	
	const handleDrag = function (e) {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}
	
	const handleDrop = function (e) {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		setFile({preview: (URL.createObjectURL(e.dataTransfer.files[0])), data: e.dataTransfer.files[0]})
	}
	
	const pictureSelected = e => setFile({preview: (URL.createObjectURL(e.target.files[0])), data: e.target.files[0]})
	
	const cancel = () => setFile({preview: '', data: {}})
	
	const closeAndCancel = () => {
		setFile({preview: '', data: {}})
		close()
	}
	
	return (
		<Modal modalId='first-layer'
		       handleClose={closeAndCancel}
		       customBtn={{'color': 'var(--FONT-color)', 'top': '1rem', 'right': '1rem', 'fontSize': '1.4rem'}}
		       isOpen={isOpen}>
			<div className='upload-pic__container'>
				<img className='profile-picture picture-l'
				     src={file.preview ? file.preview : imgPlaceholder}
				     alt='Profile picture'
				/>
				<form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
					<input className='display-none'
					       id='input-file-upload'
					       multiple={false}
					       type='file'
					       accept='.jpeg, .jpg, .png'
					       onChange={pictureSelected}
					/>
					<label className='drag-and-drop-files' htmlFor='input-file-upload'>
						<div>
							<p>Drop your file or <span>browse</span></p>
							<BsCloudUpload className='icon icon-bigger'/>
						</div>
					</label>
					{dragActive && <div id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
				</form>
				<div className='upload-pic__btns-container'>
					<button className='form-btn' onClick={close}>Confirm</button>
					<button className='form-btn' onClick={cancel}>Cancel</button>
				</div>
			</div>
		</Modal>
	)
}

