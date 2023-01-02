import Header from '../../components/desktop/Header/Header.jsx'
import {MainContent} from '../../components/common/MainContent/MainContent.jsx'
import LateralNav from '../../components/common/LateralNav/LateralNav.jsx'
import EmployeesToolbar from './components/EmployeesToolBar/EmployeesToolbar.jsx'
import {useEffect, useState} from 'react'
import {EmployeesGallery} from './components/EmployeesGallery/EmployeesGallery.jsx'
import {ViewContext} from './context/EmpoyeesViewContext.jsx'
import useBoolean from '../../hooks/useBoolean.jsx'
import {EmployeesTable} from './components/EmployeesTable/EmployeesTable.jsx'
import PaginationLimiter from '../../components/common/PaginationLimiter/PaginationLimiter.jsx'
import Paginator from '../../components/common/Paginator/Paginator.jsx'
import {usePagination} from '../../hooks/usePagination.jsx'
import {useGetEmployees} from '../../api/employees.js'
import {Loader} from '../../components/common/Loader/Loader.jsx'
import {EmployeesCount} from './components/EmployeesCount/EmployeesCount.jsx'
import {NoResult} from '../../components/common/NoResult/NoResult.jsx'
import useDebounce from '../../hooks/useDebounce.jsx'
import {Error} from '../../components/common/Error/Error.jsx'
import useWindowSize from '../../hooks/useWindowSize.jsx'
import MobileHeader from '../../components/mobile/MobileHeader/MobileHeader.jsx'
import {MobileNav} from '../../components/mobile/MobileNav/MobileNav.jsx'
import {useGetUserInfos} from '../../api/user.js'

const Employees = () => {
	
	//<editor-fold desc="_STARTERS_">
	const windowSize = useWindowSize()
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState({'lastname': 1})
	const debouncedSearch = useDebounce(search, 500)
	const [tableView, {setToggle: toggleTableView}] = useBoolean(false)
	const [page, currentPage, firstPage, lastPage, {setPrev, setNext, setPage}] = usePagination()
	const [limit, setLimit] = useState(12)
	const {userInfos, company} = useGetUserInfos()
	const {data, isLoading, error, isError, refetch} = useGetEmployees('allEmployees', page, limit, debouncedSearch, sort, company.id, {enabled: true})
	//</editor-fold>
	
	/*const numberOfPages = search.length < 2
		? Math.ceil(data?.totalOfEmployees / limit)
		: Math.ceil(data?.employeesFound / limit)

	*/
	
	const numberOfPages = Math.ceil(data?.totalOfEmployees / limit)
	
	
	const setCompanyTheme = () => {
		localStorage.setItem('company-theme', company.name.split(' ')[0])
		document.documentElement.setAttribute('user-theme', company.name.split(' ')[0])
	}
	
	useEffect(() => {
		setCompanyTheme()
	}, [])
	
	return (
		<>
			{windowSize.width > 600 ? <Header company={company}/> : <MobileHeader company={company}/>}
			<MainContent>
				{windowSize.width > 600 ? <LateralNav/> : <MobileNav user={userInfos}/>}
				<ViewContext.Provider value={{tableView, toggleTableView}}>
					<section className='employees__main-section'>
						<EmployeesToolbar setSearch={setSearch} setSort={setSort}/>
						{isLoading ? <Loader/> : isError ? <Error message={error.message}/> : data.employees.length !== 0 ? (
							<>
								{tableView ? <EmployeesTable employees={data.employees}/> : <EmployeesGallery employees={data.employees}/>}
								<div className='employees__pagination-container'>
									<PaginationLimiter update={refetch}
									                   setLimit={setLimit}
									                   totalData={search.length >= 2 ? data.totalOfEmployees : data.employeesFound}
									                   currentPage={currentPage}/>
									<EmployeesCount total={data.totalOfEmployees} found={search.length >= 2 ? data.employeesFound : data.totalOfEmployees}/>
									<Paginator totalOfPages={numberOfPages}
									           setPage={setPage}
									           currentPage={currentPage}
									           firstPage={firstPage}
									           lastPage={lastPage(numberOfPages)}
									           setPrev={setPrev}
									           setNext={setNext}/>
								</div>
							</>
						) : <NoResult/>}
					
					</section>
				</ViewContext.Provider>
			</MainContent>
		</>
	)
}

export default Employees
