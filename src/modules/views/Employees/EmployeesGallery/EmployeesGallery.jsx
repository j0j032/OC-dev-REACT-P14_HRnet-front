import {useState} from 'react'
import {useGetAllEmployees} from '../../../../api/employees/useGetEmployees.js'
import {EmployeeCard} from '../EmployeeCard/EmployeeCard'
import {Paginator} from '../../../components/Paginator/Paginator.jsx'
import {PaginationLimiter} from '../../../components/PaginationLimiter/PaginationLimiter'
import {usePagination} from '../../../../hooks/usePagination.jsx'

export const EmployeesGallery = () => {
	const [page, currentPage, {setPrev, setNext, setPage}] = usePagination()
	const [limit, setLimit] = useState(12)
	const {data, isLoading, isFetched, isError} = useGetAllEmployees(page, limit, {enabled: true})
	const numberOfPages = Math.ceil(data?.employeesLength / limit)
	const firstPage = page === 0
	const lastPage = page === numberOfPages - 1
	
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
				<PaginationLimiter setLimit={setLimit} text='employees' totalData={data.employeesLength} currentPage={currentPage}/>
				<p className='emp-gallery__result'><span>{data.employeesLength}</span>{data.employeesLength > 1 ? ' Employees' : ' Employee'}</p>
				<Paginator totalOfPages={numberOfPages}
				           setPage={setPage}
				           currentPage={currentPage}
				           firstPage={firstPage}
				           lastPage={lastPage}
				           setPrev={setPrev}
				           setNext={setNext}
				/>
			</div>
		</div>
	)
}
