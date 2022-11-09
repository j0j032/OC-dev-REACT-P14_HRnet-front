import {useQuery} from 'react-query'
import {Header} from '../../components/Header/Header'
import {MainContent} from '../../components/MainContent/MainContent'
import {LateralNav} from '../../components/LateralNav/LateralNav'
import {EmployeesToolbar} from './EmployeesToolbar'

export const Employees = () => {
	console.log('Page render')
	const {data} = useQuery(['login'], {enabled: false})
	const {userInfos} = data
	const {company} = userInfos
	return (
		<>
			<Header company={company}/>
			<MainContent>
				<LateralNav/>
				<section className='main-section'>
					<EmployeesToolbar/>
				</section>
			</MainContent>
		</>
	)
}
