import React, {useContext} from 'react'
import Button from '../../../components/common/Button/Button.jsx'
import {ViewContext} from '../../../../context/EmpoyeesViewContext.jsx'
import listIcon from '../../../../assets/icons/list_ul.svg'
import gridIcon from '../../../../assets/icons/grid_round.svg'
import {SearchContext} from '../../../../context/SearchContext.jsx'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'

const EmployeesToolbar = () => {
	const windowSize = useWindowSize()
	const {toggleTableView, tableView} = useContext(ViewContext)
	const {setSearch} = useContext(SearchContext)
	const handleChange = e => e.target.value.length >= 2 ? setSearch(e.target.value) : setSearch('')
	
	const viewIcon = <img className='icon' src={tableView ? gridIcon : listIcon} alt='Change view'/>
	
	return (
		<div className='toolbar-emp__container'>
			<div className='toolbar-emp__container--left'>
				<button className='btn-toggleView' onClick={toggleTableView}>{viewIcon}</button>
				<form onSubmit={(e) => e.preventDefault()}>
					<input type='text' placeholder='🔎  Employee' onChange={handleChange}/>
				</form>
			</div>
			{windowSize.width > 600 && <Button custom='btn--large btn-round' children='+'/>}
		</div>
	)
}

export default React.memo(EmployeesToolbar)
