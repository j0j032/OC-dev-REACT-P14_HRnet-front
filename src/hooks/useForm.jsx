import React, {useState} from 'react'

/**
 * Generic use of form: create your initialState, and offer you method on change and on submit.
 * @param {Object} initialState - your initial form data
 * @param {function} onSubmit - your function on submit
 * @returns {{handleSubmit: handleSubmit, formData: {}, handleInputChange: handleInputChange}}
 *
 * @example
 * -Initialisation:
 * const {formData, handleInputChange, handleSubmit} = useForm({email: '', other:whatever you want},
 * 		(formData) => connection.mutate(formData)
 * 	)
 * 	const {email, password} = formData
 *
 * 	-Use:
 * 	<form onSubmit={handleSubmit} className='signin__form'>
 * 					<label htmlFor='email'>Email</label>
 * 					<input type='email'
 * 					       name='email'
 * 					       ref={emailRef}
 * 					       value={email}
 * 					       onChange={handleInputChange}
 * 					       autoComplete='off'
 * 					       required/>
 * 	</form>
 */
const useForm = (initialState = {}, onSubmit) => {
	const [formData, setFormData] = useState(initialState)
	
	const handleInputChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit?.(formData)
	}
	
	return {formData, handleInputChange, handleSubmit}
}

export default useForm
