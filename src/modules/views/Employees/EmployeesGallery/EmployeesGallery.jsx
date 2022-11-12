import {useGetAllEmployees} from '../../../../api/employees/useGetEmployees.js'
import {EmployeeCard} from '../EmployeeCard/EmployeeCard'
import {useState} from 'react'

const options = [
	{value: '12', text: '12'},
	{value: '24', text: '24'},
	{value: '36', text: '36'},
	{value: '48', text: '48'},
	{value: '50', text: '50'}
]

export const EmployeesGallery = () => {
	const [page, setPage] = useState(0)
	const [limit, setLimit] = useState(12)
	const {data, isLoading, isFetched} = useGetAllEmployees(page, limit, {enabled: true})
	const [selected, setSelected] = useState(options[0].value)
	
	const handleChangeLimit = e => {
		setSelected(e.target.value)
		setLimit(e.target.value)
	}
	
	const numberOfPages = () => {
		if (isLoading) {
			return 'LOADING'
		}
		if (isFetched) {
			return (data.employeesLength / limit)
		}
	}
	
	
	return isLoading ? <div>LOADING</div> : (
		<div className='emp-gallery__container'>
			<div className='emp-gallery__wrapper'>
				{isFetched && data.employees.map((employee) => <EmployeeCard
					key={employee._id}
					hired={employee.hired}
					picture={employee.picture}
					firstname={employee.firstname}
					lastname={employee.lastname}
					title={employee.title}
					department={employee.department}
					contact={employee.contact}
					address={employee.address}
				/>)}
			</div>
			
			<div className='emp-gallery__pagination'>
				<div className='emp-gallery__pagination--limit'>
					<p>Show </p>
					<select value={selected} onChange={handleChangeLimit}>
						{options.map(option => (<option key={option.value}>{option.text}</option>))}
					</select>
					<p>employees per page</p>
				</div>
				<p className='emp-gallery__result'>
					<span>{data.employeesLength}</span>{data.employeesLength > 1 ? ' Employees' : ' Employee'}
				</p>
				<div>
					{numberOfPages()}
				</div>
			</div>
		</div>
	)
}
