import {useGetAllEmployees} from '../../../../api/employees/useGetEmployees.js'
import {EmployeeCard} from '../EmployeeCard/EmployeeCard'
import {useState} from 'react'
import {Paginator} from '../../../components/Paginator/Paginator.jsx'

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
	const [selected, setSelected] = useState(options[0].value)
	
	const {data, isLoading, isFetched, isError} = useGetAllEmployees(page, limit, {enabled: true})
	
	const [currentPage, setCurrentPage] = useState(page + 1)
	const handleChangeLimit = e => {
		setSelected(e.target.value)
		setLimit(e.target.value)
	}
	
	const numberOfPages = Math.ceil(data?.employeesLength / limit)
	
	const handlePageNumber = (page) => {
		setPage(page - 1)
		setCurrentPage(page)
	}
	
	const handleNextPage = () => {
		if (page === numberOfPages - 1) {
			setPage(numberOfPages - 1)
			setCurrentPage(numberOfPages)
		} else {
			setPage(page + 1)
			setCurrentPage(currentPage + 1)
		}
	}
	
	const handlePrevPage = () => {
		if (page === -1) {
			setPage(0)
			setCurrentPage(1)
		} else {
			setPage(page - 1)
			setCurrentPage(currentPage - 1)
		}
	}
	
	
	return isLoading ? <div>LOADING</div> : isError ? <div>ERROR</div> : (
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
					<button disabled={page === 0} onClick={handlePrevPage}>Prev</button>
					{<Paginator totalOfPages={numberOfPages} setPage={handlePageNumber}/>}
					<button disabled={page === numberOfPages - 1} onClick={handleNextPage}>Next</button>
				</div>
			</div>
		</div>
	)
}
