import {Loader} from '../../../components/Loader/Loader.jsx'
import {useQuery} from 'react-query'
import {getEmployeeById} from '../../../../api/employees/requests.js'
import React from 'react'

export const EmployeeDetails = ({id}) => {
	const {data, isLoading, isError} = useQuery(['employee'], () => getEmployeeById(id), {
		refetchOnWindowFocus: false
	})
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	return (
		<>
			{isLoading ? <Loader/> : isError ? <div>ERROR</div> : (
				<div className='employee-details__container'>
					<img src={data.picture} alt={`Profile picture of ${data.firstname}`}/>
					<div className='employee-details__infos'>
						<div className='employee-details__names'>
							<h1>{data.firstname}</h1>
							<h1>{data.lastname}</h1>
						</div>
						<p>{`Joined ${company.name} : ${data.hired.slice(0, 10)}`}</p>
					</div>
					<div className='employee-details__company'>
						<img src={company.logo} alt='Company logo'/>
					</div>
				</div>
			)}
		</>
	)
}
