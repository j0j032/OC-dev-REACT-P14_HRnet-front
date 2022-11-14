import {useQuery} from 'react-query'
import {Header} from '../../components/Header/Header'
import {MainContent} from '../../components/MainContent/MainContent'
import {LateralNav} from '../../components/LateralNav/LateralNav'
import {EmployeesToolbar} from './EmployeesToolBar/EmployeesToolbar.jsx'
import {useEffect} from 'react'
import {EmployeesGallery} from './EmployeesGallery/EmployeesGallery'
import {ViewContext} from '../../../context/EmpoyeesViewContext.jsx'
import useBoolean from '../../../hooks/useBoolean.jsx'
import {EmployeesTable} from './EmployeesTable/EmployeesTable'

export const Employees = () => {
	const [tableView, {setToggle: toggleTableView}] = useBoolean(false)
	const {data} = useQuery(['login'], {enabled: false})
	const {userInfos} = data
	const {company} = userInfos
	
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
				<ViewContext.Provider value={{toggleTableView}}>
					<section className='main-section'>
						<EmployeesToolbar/>
						{tableView ? <EmployeesTable/> : <EmployeesGallery/>}
					</section>
				</ViewContext.Provider>
			</MainContent>
		</>
	)
}
