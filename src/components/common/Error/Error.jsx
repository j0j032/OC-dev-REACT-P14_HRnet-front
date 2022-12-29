export const Error = ({message}) => {
	return (
		<div className='error__container'>
			<h1>Oups !</h1>
			<p>{message ? message : 'An error has occurred'} ⚠️ </p>
		</div>
	)
}
