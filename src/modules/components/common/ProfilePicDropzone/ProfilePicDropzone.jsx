import Dropzone from 'react-dropzone'

export const ProfilePicDropzone = () => {
	return (
		<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
			{({getRootProps, getInputProps}) => (
				<section>
					<div className='dropzone' {...getRootProps()}
					     role='button'
					     aria-label='File Upload'
					     id={name}>
						<input {...getInputProps()} />
						<p>Drag 'n' drop some files here, or click to select files</p>
					</div>
				</section>
			)}
		</Dropzone>
	)
}
