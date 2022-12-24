import React from 'react'
import {ErrorMessage} from '@hookform/error-message'
import {capitalize} from '../../../utils/formater.js'

export const TextInput = React.forwardRef((props, ref) => {
	
	const {
		label = true, showRequired = true, showPlaceholder = false, specifyLabel, inputName, errorDisplay, errors,
		...otherProps
	} = props
	
	return (
		<div className='input__wrapper create-employee__input-wrapper'>
			{label &&
				<label className='input-label' htmlFor={inputName}>
					{specifyLabel ? capitalize(specifyLabel) : capitalize(inputName)}
					{showRequired && <span> *</span>}
				</label>
			}
			<input className={errorDisplay && 'input-error'}
			       placeholder={showPlaceholder ? specifyLabel ? capitalize(specifyLabel) : capitalize(inputName) : null}
			       type='text'
			       ref={ref}
			       {...otherProps}
			/>
			{errorDisplay
				? <ErrorMessage name={inputName}
				                errors={errors}
				                render={({message}) => <p className='form-error'>{message}</p>}/>
				: <div className='form-error--false'></div>}
		</div>
	)
})
