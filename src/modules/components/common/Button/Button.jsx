import React from 'react'

const Button = ({children, action, custom, disabled}) => {
	
	return (
		<button disabled={disabled} className={`btn ${custom}`} onClick={action}>
			{children}
		</button>
	)
}

export default React.memo(Button)
