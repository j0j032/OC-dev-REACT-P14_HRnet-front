import {useQuery} from 'react-query'
import {Header} from '../../components/Header/Header'
import {MainContent} from '../../components/MainContent/MainContent'
import {LateralNav} from '../../components/LateralNav/LateralNav'
import {EmployeesToolbar} from './EmployeesToolBar/EmployeesToolbar.jsx'
import {useEffect, useState} from 'react'
import {EmployeesGallery} from './EmployeesGallery/EmployeesGallery'
import {ViewContext} from '../../../context/EmpoyeesViewContext.jsx'
import useBoolean from '../../../hooks/useBoolean.jsx'
import {EmployeesTable} from './EmployeesTable/EmployeesTable'
import {PaginationLimiter} from '../../components/PaginationLimiter/PaginationLimiter.jsx'
import {Paginator} from '../../components/Paginator/Paginator.jsx'
import {usePagination} from '../../../hooks/usePagination.jsx'
import {useGetAllEmployees} from '../../../api/employees/useGetEmployees.js'

export const Employees = () => {
	const [tableView, {setToggle: toggleTableView}] = useBoolean(false)
	const {data: user} = useQuery(['login'], {enabled: false})
	const {userInfos} = user
	const {company} = userInfos
	
	const setCompanyTheme = () => {
		localStorage.setItem('company-theme', company.name.split(' ')[0])
		document.documentElement.setAttribute('user-theme', company.name.split(' ')[0])
	}
	
	useEffect(() => {
		setCompanyTheme()
	}, [])
	
	const [page, currentPage, firstPage, lastPage, {setPrev, setNext, setPage}] = usePagination()
	const [limit, setLimit] = useState(12)
	const {data, isLoading, isError} = useGetAllEmployees(page, limit, {enabled: true})
	const numberOfPages = Math.ceil(data?.employeesLength / limit)
	
	return (
		<>
			<Header company={company}/>
			<MainContent>
				<LateralNav/>
				{isLoading ? <div>LOADING</div> : isError ? <div>ERROR</div> :
					<ViewContext.Provider value={{toggleTableView}}>
						<section className='employees__main-section'>
							<EmployeesToolbar/>
							
							{tableView ? <EmployeesTable employees={data.employees}/> : <EmployeesGallery employees={data.employees}/>}
							
							<div className='employees__pagination-container'>
								<PaginationLimiter setLimit={setLimit} text='employees' totalData={data.employeesLength} currentPage={currentPage}/>
								<p className='employees__totalFound'><span>{data.employeesLength}</span>{data.employeesLength > 1 ? ' Employees' : ' Employee'}</p>
								<Paginator totalOfPages={numberOfPages}
								           setPage={setPage}
								           currentPage={currentPage}
								           firstPage={firstPage}
								           lastPage={lastPage(numberOfPages)}
								           setPrev={setPrev}
								           setNext={setNext}
								/>
							</div>
						
						</section>
					</ViewContext.Provider>
				}
			</MainContent>
		</>
	)
}
