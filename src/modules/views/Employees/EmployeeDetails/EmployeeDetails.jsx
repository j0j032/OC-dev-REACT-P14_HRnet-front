import {Loader} from '../../../components/common/Loader/Loader.jsx'
import {useQuery} from 'react-query'
import {getEmployeeById} from '../../../../api/employees/requests.js'
import React from 'react'
import {Error} from '../../../components/common/Error/Error'
import {formatToLocale} from '../../../../utils/dateFormater'
import editIcon from '../../../../assets/icons/edit.svg'
import deleteIcon from '../../../../assets/icons/delete.svg'
import sendIcon from '../../../../assets/icons/send.svg'

export const EmployeeDetails = ({id}) => {
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {data, isLoading, error, isError} = useQuery(['employee'], () => getEmployeeById(id), {
		refetchOnWindowFocus: false
	})
	return (
		<>
			{isLoading ? <Loader/> : isError ? <Error message={error.message}/> : (
				<div className='employee-details__container'>
					<img src={data.picture} alt={`Profile picture of ${data.firstname}`}/>
					<div className='employee-details__infos'>
						<div className='employee-details__heading'>
							<div className='employee-details__names'>
								<h1>{data.firstname}</h1>
								<h1>{data.lastname}</h1>
							</div>
							<p> {`Joined ${company.name} : ${formatToLocale(data.hired, 'en-US')}`}</p>
						</div>
						<h3> 💼 {data.title}</h3>
						<p> 👫 {data.department} team</p>
						<div className='employee-details__personal'>
							<h3>Personal details:</h3>
							<p>🎂 {formatToLocale(data.birthdate, 'en-US')}</p>
							<p>📱 {data.contact.phone}</p>
							<p>✉️ {data.contact.mail}</p>
							<p>📫 Address:</p>
							<p>{data.address.street}</p>
							<p>{`${data.address.city} ${data.address.state} ${data.address.zip}`}</p>
						</div>
					</div>
					<div className='employee-details__options'>
						<img className='icon' src={sendIcon} alt={`Send message to ${data.firstname}`}/>
						<img className='icon' src={editIcon} alt={`Edit ${data.firstname} profile`}/>
						<img className='icon' src={deleteIcon} alt={`Delete ${data.firstname} profile`}/>
					</div>
					<div className='employee-details__company'>
						<img src={company.logo} alt='Company logo'/>
					</div>
				</div>
			)}
		</>
	)
}
