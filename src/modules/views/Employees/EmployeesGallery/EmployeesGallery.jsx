import {useState} from 'react'
import {useGetAllEmployees} from '../../../../api/employees/useGetEmployees.js'
import {EmployeeCard} from '../EmployeeCard/EmployeeCard'
import {Paginator} from '../../../components/Paginator/Paginator.jsx'
import {PaginationLimiter} from '../../../components/PaginationLimiter/PaginationLimiter'
import arrowLeft from '../../../../assets/icons/arrow/chevron_left.svg'
import arrowRight from '../../../../assets/icons/arrow/chevron_right.svg'
import {usePagination} from '../../../../hooks/usePagination.jsx'

export const EmployeesGallery = () => {
	const [page, currentPage, {setPrev, setNext, setPage}] = usePagination()
	const [limit, setLimit] = useState(12)
	const {data, isLoading, isFetched, isError} = useGetAllEmployees(page, limit, {enabled: true})
	const numberOfPages = Math.ceil(data?.employeesLength / limit)
	const firstPage = page === 0
	const lastPage = page === numberOfPages - 1
	
	const nextBtn = <button disabled={lastPage} className={lastPage ? 'icon icon-disabled' : 'icon'} onClick={() => setNext(numberOfPages)}>
		<img src={arrowRight} alt='next page'/></button>
	const prevBtn = <button disabled={firstPage} className={firstPage ? 'icon icon-disabled' : 'icon'} onClick={setPrev}>
		<img src={arrowLeft} alt='previous page'/></button>
	
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
				{numberOfPages > 1
					? <div className='emp-gallery__pagination--nav'>
						{prevBtn}
						{<Paginator totalOfPages={numberOfPages} setPage={setPage} currentPage={currentPage}/>}
						{nextBtn}
					</div>
					: <div className='no-pagination'></div>
				}
			</div>
		</div>
	)
}
