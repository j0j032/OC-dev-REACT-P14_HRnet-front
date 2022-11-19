import React, {useContext} from 'react'
import Button from '../../../components/Button/Button.jsx'
import {ViewContext} from '../../../../context/EmpoyeesViewContext.jsx'
import listIcon from '../../../../assets/icons/list_ul.svg'
import gridIcon from '../../../../assets/icons/grid_round.svg'
import {SearchContext} from '../../../../context/SearchContext.jsx'

const EmployeesToolbar = () => {
	const {toggleTableView, tableView} = useContext(ViewContext)
	const {search, setSearch} = useContext(SearchContext)
	const viewIcon = <img className='icon' src={tableView ? gridIcon : listIcon} alt='Change view'/>
	
	const handleSearch = e => {
		e.preventDefault()
		console.log(search)
		setSearch('')
	}
	
	return (
		<div className='toolbar-emp__container'>
			<div className='toolbar-emp__container--left'>
				<button className='btn-toggleView' onClick={toggleTableView}>{viewIcon}</button>
				<form onSubmit={handleSearch}>
					<input type='text' placeholder='🔎  Employee' onChange={(e) => e.target.value.length >= 2 ? setSearch(e.target.value) : setSearch('')}/>
				</form>
			</div>
			<Button custom='btn--large btn-round' children='+'/>
		</div>
	)
}

export default React.memo(EmployeesToolbar)
