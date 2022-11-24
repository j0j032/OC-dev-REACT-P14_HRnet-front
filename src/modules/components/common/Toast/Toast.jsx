export const Toast = ({type, message}) => {
	// types: Success, error, warning
	return (
		<div className={
			type === 'success' ? ' toast toast__success'
				: type === 'error' ? ' toast toast__error'
					: type === 'warning' ? ' toast toast__warning'
						: ' toast toast__default'}>
			<p>{message}</p>
		</div>
	)
}
