import React, {useContext} from 'react'
import Button from '../../../components/Button/Button.jsx'
import {ViewContext} from '../../../../context/EmpoyeesViewContext.jsx'
import listIcon from '../../../../assets/icons/list_ul.svg'
import gridIcon from '../../../../assets/icons/grid_round.svg'

const EmployeesToolbar = () => {
	const {toggleTableView, tableView} = useContext(ViewContext)
	const viewIcon = <img className='icon' src={tableView ? gridIcon : listIcon} alt='Change view'/>
	return (
		<div className='toolbar-emp__container'>
			<div className='toolbar-emp__container--left'>
				<button className='btn-toggleView' onClick={toggleTableView}>{viewIcon}</button>
				<form>
					<input type='text' placeholder='🔎  Employee'/>
				</form>
			</div>
			<Button custom='btn--large btn-round' children='+'/>
		</div>
	)
}

export default React.memo(EmployeesToolbar)
