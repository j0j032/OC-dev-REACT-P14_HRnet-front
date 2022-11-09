export const Button = ({children, action, custom, disabled}) => {
	return (
		<button disabled={disabled} className={`btn ${custom}`} onClick={action}>
			{children}
		</button>
	)
}
