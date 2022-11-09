import React from 'react'
import dropUp from '../../../assets/icons/arrow/caret_up.svg'
import dropDown from '../../../assets/icons/arrow/caret_down.svg'

export const Filter = ({byAsc, byDesc, text}) => {
	return (
		<div className='employee-filter'>
			<p>{text}</p>
			<div className='employee-filter--btns'>
				<img onClick={byAsc} src={dropUp} alt='Sort by asc'/>
				<img onClick={byDesc} src={dropDown} alt='Sort by desc'/>
			</div>
		</div>
	)
}
