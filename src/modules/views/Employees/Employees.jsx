import {useQuery} from 'react-query'
import Header from '../../components/Header/Header'
import {MainContent} from '../../components/MainContent/MainContent'
import LateralNav from '../../components/LateralNav/LateralNav'
import EmployeesToolbar from './EmployeesToolBar/EmployeesToolbar.jsx'
import {useContext, useEffect, useState} from 'react'
import {EmployeesGallery} from './EmployeesGallery/EmployeesGallery'
import {ViewContext} from '../../../context/EmpoyeesViewContext.jsx'
import useBoolean from '../../../hooks/useBoolean.jsx'
import {EmployeesTable} from './EmployeesTable/EmployeesTable.jsx'
import PaginationLimiter from '../../components/PaginationLimiter/PaginationLimiter.jsx'
import Paginator from '../../components/Paginator/Paginator.jsx'
import {usePagination} from '../../../hooks/usePagination.jsx'
import {useGetAllEmployees} from '../../../api/employees/useGetEmployees.js'
import {Loader} from '../../components/Loader/Loader'
import {SearchContext} from '../../../context/SearchContext.jsx'

export const Employees = () => {
	const {search} = useContext(SearchContext)
	const [page, currentPage, firstPage, lastPage, {setPrev, setNext, setPage}] = usePagination()
	const [limit, setLimit] = useState(12)
	const [tableView, {setToggle: toggleTableView}] = useBoolean(false)
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {data, isLoading, isError, refetch} = useGetAllEmployees(page, limit, search, {enabled: true})
	const numberOfPages = search.length < 2 ? Math.ceil(data?.employeesLength / limit) : Math.ceil(data?.employees.length / limit)
	
	
	useEffect(() => {
		!isLoading && search.length > 0 ? setLimit(data.employeesLength) : setLimit(12)
	}, [search])
	
	const setCompanyTheme = () => {
		localStorage.setItem('company-theme', company.name.split(' ')[0])
		document.documentElement.setAttribute('user-theme', company.name.split(' ')[0])
	}
	
	if (!isLoading) console.log(data)
	
	useEffect(() => {
		setCompanyTheme()
	}, [])
	
	console.log(search)
	
	return (
		<>
			<Header company={company}/>
			<MainContent>
				<LateralNav/>
				<ViewContext.Provider value={{tableView, toggleTableView}}>
					<section className='employees__main-section'>
						<EmployeesToolbar/>
						{isLoading ? <Loader/> : isError ? <div>ERROR</div> : (
							<>
								{tableView ? <EmployeesTable employees={data.employees}/> : <EmployeesGallery employees={data.employees}/>}
								<div className='employees__pagination-container'>
									<PaginationLimiter update={refetch} setLimit={setLimit} text='employees'
									                   totalData={search.length >= 2 ? data.employees.length : data.employeesLength}
									                   currentPage={currentPage}/>
									<p className='employees__totalFound'>
										<span>{search.length < 2 ? data.employeesLength : data.employees.length}</span>{data.employees.length > 1 ? ' Employees' : ' Employee'}</p>
									<Paginator totalOfPages={numberOfPages}
									           setPage={setPage}
									           currentPage={currentPage}
									           firstPage={firstPage}
									           lastPage={lastPage(numberOfPages)}
									           setPrev={setPrev}
									           setNext={setNext}
									/>
								</div>
							</>
						)}
					</section>
				</ViewContext.Provider>
			</MainContent>
		</>
	)
}
