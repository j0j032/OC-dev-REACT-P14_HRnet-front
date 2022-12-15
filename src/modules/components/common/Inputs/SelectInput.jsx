import React from 'react'
import {capitalize} from '../../../../utils/formater.js'

export const SelectInput = React.forwardRef((props, ref) => {
	const {label = true, inputName, showRequired = false, specifyLabel, map, ...otherProps} = props
	
	return (
		<div className='input__wrapper create-employee__input-wrapper'>
			{label && <label className='input-label' htmlFor={inputName}>{specifyLabel ? capitalize(specifyLabel) : capitalize(inputName)}
				{showRequired && <span> *</span>}
			</label>}
			<select ref={ref} {...otherProps}>{map}</select>
			<div className='form-error--false'></div>
		</div>
	)
})
