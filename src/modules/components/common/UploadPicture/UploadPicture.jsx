import {useState} from 'react'
import imgPlaceholder from '../../../../assets/imgPlaceholder.svg'

export const UploadPicture = () => {
	const [file, setFile] = useState()
	
	function handleChange(e) {
		console.log(e.target.files)
		setFile(URL.createObjectURL(e.target.files[0]))
	}
	
	return (
		<div className='App'>
			<h2>Add Image:</h2>
			<input type='file' onChange={handleChange}/>
			<img src={file ? file : imgPlaceholder} alt='Profile picture'/>
		</div>
	
	)
}
