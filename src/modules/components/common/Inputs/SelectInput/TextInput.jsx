import React from 'react'
import {ErrorMessage} from '@hookform/error-message'
import {capitalize} from '../../../../../utils/formater.js'

export const TextInput = React.forwardRef((props, ref) => {
	
	const {inputName, errorDisplay, errors, ...otherProps} = props
	
	return (
		<div className='input__wrapper create-employee__input-wrapper'>
			<label className='input-label' htmlFor={inputName}>{capitalize(inputName)}<span> *</span></label>
			<input className={errorDisplay && 'input-error'} type='text' ref={ref} {...otherProps}/>
			{errorDisplay
				? <ErrorMessage name={inputName}
				                errors={errors}
				                render={({message}) => <p className='form-error'>{message}</p>}/>
				: <div className='form-error--false'></div>}
		</div>
	)
})
