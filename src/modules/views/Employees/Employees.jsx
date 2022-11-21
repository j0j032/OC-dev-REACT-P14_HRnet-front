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
import {getAllEmployees} from '../../../api/employees/requests.js'
import {EmployeesCount} from './EmployeesCount/EmployeesCount'
import {NoResult} from '../../components/NoResult/NoResult'
import useDebounce from '../../../hooks/useDebounce.jsx'

export const Employees = () => {
	const [page, currentPage, firstPage, lastPage, {setPrev, setNext, setPage}] = usePagination()
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {search} = useContext(SearchContext)
	const debouncedSearch = useDebounce(search, 500)
	const [limit, setLimit] = useState(12)
	const [tableView, {setToggle: toggleTableView}] = useBoolean(false)
	const {data, isLoading, isError, refetch} = useGetAllEmployees(page, limit, debouncedSearch, {enabled: true})
	
	const {data: totalFound, isLoading: loadingLength} = useQuery(['totalFound', debouncedSearch], () => getAllEmployees(0, 0, search), {
		refetchOnWindowFocus: false
	})
	
	const numberOfPages = search.length < 2
		? Math.ceil(data?.totalEmployees / limit)
		: !loadingLength ? Math.ceil(totalFound.employees.length / limit) : Math.ceil(data?.totalEmployees / limit)
	
	
	const setCompanyTheme = () => {
		localStorage.setItem('company-theme', company.name.split(' ')[0])
		document.documentElement.setAttribute('user-theme', company.name.split(' ')[0])
	}
	
	useEffect(() => {
		setCompanyTheme()
	}, [])
	
	return (
		<>
			<Header company={company}/>
			<MainContent>
				<LateralNav/>
				<ViewContext.Provider value={{tableView, toggleTableView}}>
					<section className='employees__main-section'>
						<EmployeesToolbar/>
						{isLoading || loadingLength ? <Loader/> : isError ? <div>ERROR</div> : data.employees.length !== 0 ? (
							<>
								{tableView ? <EmployeesTable employees={data.employees}/> : <EmployeesGallery employees={data.employees}/>}
								<div className='employees__pagination-container'>
									<PaginationLimiter update={refetch} setLimit={setLimit} text='employees'
									                   totalData={search.length >= 2 ? totalFound.employees.length : data.totalEmployees}
									                   currentPage={currentPage}/>
									<EmployeesCount total={data.totalEmployees} found={totalFound.employees.length}/>
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
						) : <NoResult/>}
					</section>
				</ViewContext.Provider>
			</MainContent>
		</>
	)
}
