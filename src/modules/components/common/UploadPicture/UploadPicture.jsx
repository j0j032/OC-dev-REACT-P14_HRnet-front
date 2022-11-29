// import './UploadPicture.scss'
import {useState} from 'react'
import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import Dropzone from 'react-dropzone'
import axios from 'axios'

export const UploadPicture = () => {
	const API_ENDPOINT = 'https://ijs7yfiy4f.execute-api.eu-west-3.amazonaws.com/getPresignedImageUrl'
	const [fileUrl, setFileUrl] = useState('')
	const [filePreview, setFilePreview] = useState('')
	const [fileToSend, setFileToSend] = useState({})
	const [isShown, {setFalse: hide, setTrue: show}] = useBoolean()
	
	function handleChange(e) {
		console.log(e.target.files[0])
		setFilePreview(URL.createObjectURL(e.target.files[0]))
		setFileToSend(e.target.files[0])
	}
	
	function cancelPicture() {
		setFilePreview('')
		hide()
	}
	
	const uploadPic = async (file) => {
		// Get the presigned URL
		const response = await axios({
			method: 'GET',
			url: API_ENDPOINT
		})
		console.log('Response: ', response)
		setFileUrl(`https://p14hrnet.s3.eu-west-3.amazonaws.com/${response.data.Key}`)
		
		// PUT upload file
		const result = await fetch(response.data.uploadURL, {
			method: 'PUT',
			headers: {'Content-Type': 'image/jpeg'},
			body: file
		})
		console.log('Result: ', result)
		console.log(fileUrl)
	}
	
	const submit = async e => {
		e.preventDefault()
		await uploadPic(fileToSend)
		hide()
	}
	
	return (
		<div className='upload-pic__container'>
			<img className='upload-pic__pic-review' src={filePreview ? filePreview : imgPlaceholder} alt='Profile picture'/>
			{isShown ? (
				<form className='App'>
					<button onClick={submit}>Upload</button>
					<input type='file' onChange={handleChange}/>
					<div onClick={cancelPicture}>Cancel</div>
				</form>) : (
				<button onClick={show}>Change</button>)
			}
		</div>
	)
}
