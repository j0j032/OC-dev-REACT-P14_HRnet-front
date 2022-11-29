import React, {useState} from 'react'
import axios from 'axios'

export const useUploadPicture = () => {
	const API_ENDPOINT = 'https://ijs7yfiy4f.execute-api.eu-west-3.amazonaws.com/getPresignedImageUrl'
	const [fileURL, setFileURL] = useState('')
	const [filePreview, setFilePreview] = useState('')
	const [uploadURL, setUploadURL] = useState('')
	const [fileToUpload, setFileToUpload] = useState({})
	const [error, setError] = useState({})
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [fileIsSupported, setFileIsSupported] = useState(true)
	
	const getFileUrl = async () => {
		const response = await axios.get(API_ENDPOINT)
		console.log('Response: ', response)
		setFileURL(`https://p14hrnet.s3.eu-west-3.amazonaws.com/${response.data.Key}`)
		setUploadURL(response.data.uploadURL)
	}
	
	const getFilePreview = async e => {
		const typeAccepted = ['image/jpeg', 'image/png', 'image/jpg']
		const file = e.target.files[0]
		if (file.size > 1000000 || typeAccepted.indexOf(file.type) === -1) {
			setFileIsSupported(false)
		} else {
			setFileIsSupported(true)
			console.log(file)
			setFilePreview(URL.createObjectURL(file))
			setFileToUpload(file)
			await getFileUrl()
		}
	}
	
	const cancelPreview = () => setFilePreview('')
	
	const uploadPicture = async () => {
		setIsLoading(true)
		const res = await axios.put(uploadURL, fileToUpload, {headers: {'Content-Type': 'image/jpeg'}})
			.catch(err => {
				setIsError(true)
				setError(err)
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false)
			})
		console.log('Result: ', res)
	}
	
	return {filePreview, fileIsSupported, fileURL, error, isError, isLoading, cancelPreview, getFilePreview, uploadPicture}
}
