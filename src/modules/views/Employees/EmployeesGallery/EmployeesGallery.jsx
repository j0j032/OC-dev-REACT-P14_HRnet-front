import {useGetAllEmployees} from '../../../../api/employees/useGetEmployees.js'
import {EmployeeCard} from '../EmployeeCard/EmployeeCard'
import {useState} from 'react'
import {Paginator} from '../../../components/Paginator/Paginator.jsx'
import {PaginationLimiter} from '../../../components/PaginationLimiter/PaginationLimiter'

export const EmployeesGallery = () => {
	
	const [page, setPage] = useState(0)
	const [limit, setLimit] = useState(12)
	
	const {data, isLoading, isFetched, isError} = useGetAllEmployees(page, limit, {enabled: true})
	
	const [currentPage, setCurrentPage] = useState(page + 1)
	
	
	const numberOfPages = Math.ceil(data?.employeesLength / limit)
	
	const firstPage = page === 0
	const lastPage = page === numberOfPages - 1
	
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
				
				<PaginationLimiter setLimit={setLimit} text='employees' defaultOption='12' option2='24' option3='36' option4='48'
				                   option5='50'/>
				<p className='emp-gallery__result'>
					<span>{data.employeesLength}</span>{data.employeesLength > 1 ? ' Employees' : ' Employee'}
				</p>
				{numberOfPages > 1 ?
					<div className='emp-gallery__pagination--nav'>
						{!firstPage ?
							<button className='icon' onClick={handlePrevPage}>
								<img src='src/assets/icons/arrow/chevron_left.svg' alt='previous page'/>
							</button> : <div></div>
						}
						{<Paginator totalOfPages={numberOfPages} setPage={handlePageNumber} currentPage={currentPage}/>}
						{!lastPage ?
							<button className='icon' onClick={handleNextPage}>
								<img src='src/assets/icons/arrow/chevron_right.svg' alt='next page'/>
							</button> : <div></div>
						}
					</div> : <div className='no-pagination'></div>
				}
			</div>
		</div>
	)
}
