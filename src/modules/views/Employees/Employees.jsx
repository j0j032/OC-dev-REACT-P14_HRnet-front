import {useQuery} from 'react-query'
import Header from '../../components/desktop/Header/Header'
import {MainContent} from '../../components/common/MainContent/MainContent'
import LateralNav from '../../components/common/LateralNav/LateralNav'
import EmployeesToolbar from './components/EmployeesToolBar/EmployeesToolbar.jsx'
import {useEffect, useState} from 'react'
import {EmployeesGallery} from './components/EmployeesGallery/EmployeesGallery'
import {ViewContext} from '../../../context/EmpoyeesViewContext.jsx'
import useBoolean from '../../../hooks/useBoolean.jsx'
import {EmployeesTable} from './components/EmployeesTable/EmployeesTable.jsx'
import PaginationLimiter from '../../components/common/PaginationLimiter/PaginationLimiter.jsx'
import Paginator from '../../components/common/Paginator/Paginator.jsx'
import {usePagination} from '../../../hooks/usePagination.jsx'
import {employees} from '../../../api/employees.js'
import {Loader} from '../../components/common/Loader/Loader'
import {EmployeesCount} from './components/EmployeesCount/EmployeesCount'
import {NoResult} from '../../components/common/NoResult/NoResult'
import useDebounce from '../../../hooks/useDebounce.jsx'
import {Error} from '../../components/common/Error/Error'
import useWindowSize from '../../../hooks/useWindowSize.jsx'
import MobileHeader from '../../components/mobile/MobileHeader/MobileHeader'
import {MobileNav} from '../../components/mobile/MobileNav/MobileNav'
import {useGetUserInfos} from '../../../api/user.js'

export const Employees = () => {
	const windowSize = useWindowSize()
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState({'lastname': 1})
	const debouncedSearch = useDebounce(search, 500)
	const [tableView, {setToggle: toggleTableView}] = useBoolean(false)
	const [page, currentPage, firstPage, lastPage, {setPrev, setNext, setPage}] = usePagination()
	const [limit, setLimit] = useState(12)
	const {userInfos, company} = useGetUserInfos()
	const {data, isLoading, error, isError, refetch} = employees('allEmployees', page, limit, debouncedSearch, sort, {enabled: true})
	const {data: totalFound, isLoading: loadingLength} = employees('totalFound', 0, 0, debouncedSearch, sort, {enabled: true})
	
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
			{windowSize.width > 600 ? <Header company={company}/> : <MobileHeader company={company}/>}
			<MainContent>
				{windowSize.width > 600 ? <LateralNav/> : <MobileNav user={userInfos}/>}
				<ViewContext.Provider value={{tableView, toggleTableView}}>
					<section className='employees__main-section'>
						<EmployeesToolbar setSearch={setSearch} setSort={setSort}/>
						{isLoading || loadingLength ? <Loader/> : isError ? <Error message={error.message}/> : data.employees.length !== 0 ? (
							<>
								{tableView ? <EmployeesTable employees={data.employees}/> : <EmployeesGallery employees={data.employees}/>}
								<div className='employees__pagination-container'>
									<PaginationLimiter update={refetch}
									                   setLimit={setLimit}
									                   text='employees'
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
