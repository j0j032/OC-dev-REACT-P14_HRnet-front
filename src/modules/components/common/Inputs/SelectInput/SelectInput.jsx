import React from 'react'
import {capitalize} from '../../../../../utils/formater.js'

export const SelectInput = React.forwardRef((props, ref) => {
	const {inputName, map, ...otherProps} = props
	
	return (
		<div className='input__wrapper create-employee__input-wrapper'>
			<label className='input-label' htmlFor={inputName}>{capitalize(inputName)}<span> *</span></label>
			<select ref={ref} {...otherProps}>{map}</select>
			<div className='form-error--false'></div>
		</div>
	)
})
