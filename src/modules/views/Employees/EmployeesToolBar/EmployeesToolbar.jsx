import React, {useContext} from 'react'
import {Button} from '../../../components/Button/Button.jsx'
import {ViewContext} from '../../../../context/EmpoyeesViewContext.jsx'

export const EmployeesToolbar = () => {
	const {toggleTableView} = useContext(ViewContext)
	return (
		<div className='toolbar-emp__container'>
			<div className='toolbar-emp__filters'>
				<form>
					<input type='text' placeholder='🔎  Employee'/>
				</form>
				<button onClick={toggleTableView}>ToggleView</button>
			</div>
			<Button custom='btn--large btn-round' children='+'/>
		</div>
	)
}
