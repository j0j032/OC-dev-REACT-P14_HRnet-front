import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import Modal from '../../Modal/Modal.jsx'

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
		       isOpen={isOpen}>
			<div className='upload-pic__container'>
				<img className='upload-pic__pic-review' src={file.preview ? file.preview : imgPlaceholder} alt='Profile picture'/>
				<input type='file' accept='.jpeg, .jpg, .png' onChange={pictureSelected}/>
				<button onClick={close}>Confirm</button>
				<button onClick={cancel}>Cancel</button>
			</div>
		</Modal>
	)
}

