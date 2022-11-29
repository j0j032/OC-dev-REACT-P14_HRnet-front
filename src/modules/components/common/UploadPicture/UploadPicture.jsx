import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import {useUploadPicture} from '../../../../hooks/useUploadPicture.jsx'

export const UploadPicture = ({filePreview, getFilePreview, cancelPreview, fileIsSupported}) => {
	
	const [isShown, {setFalse: hide, setTrue: show}] = useBoolean()
	
	function cancelPicture() {
		cancelPreview()
	}
	
	return (
		<div className='upload-pic__container'>
			<img className='upload-pic__pic-review' src={filePreview ? filePreview : imgPlaceholder} alt='Profile picture'/>
			<input type='file' accept='.jpeg, .jpg, .png' onChange={getFilePreview}/>
			<div onClick={cancelPicture}>Cancel</div>
			{fileIsSupported ? null : <div> Err</div>}
		</div>
	)
}

