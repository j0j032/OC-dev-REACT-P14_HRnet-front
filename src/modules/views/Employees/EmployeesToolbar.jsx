import React from 'react'
import filterIcon from '../../../assets/icons/search/patter.svg'
import {Button} from '../../components/Button/Button.jsx'
import {Filter} from './Filter'
import {idFilters} from './filters'


export const EmployeesToolbar = () => {
	return (
		<div className='toolbar-emp__container'>
			<div className='toolbar-emp__filters'>
				<form>
					<input type='text' placeholder='🔎  Employee'/>
				</form>
				<div className='toolbar-emp__filters'>
					<img className='icon' src={filterIcon} alt='filter icon'/>
					<div className='employee-filter--bar'>
						{idFilters.map((filter, i) => (
							<Filter key={i} text={filter.text} byAsc={filter.byAsc} byDesc={filter.byDesc}/>
						))}
					</div>
				</div>
			</div>
			<Button custom='btn--large btn-round' children='+'/>
		</div>
	)
}
