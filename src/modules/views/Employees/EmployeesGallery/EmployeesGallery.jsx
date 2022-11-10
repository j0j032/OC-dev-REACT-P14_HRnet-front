import {useGetAllEmployees} from '../../../../api/employees/useGetEmployees.js'
import {EmployeeCard} from '../EmployeeCard/EmployeeCard'

export const EmployeesGallery = () => {
	const {data: employees, isLoading, isFetched} = useGetAllEmployees({enabled: true})
	
	return isLoading ? <div>LOADING</div> : (
		<div className='emp-gallery__container'>
			<div className='emp-gallery__wrapper'>
				{isFetched && employees.map((employee) => <EmployeeCard
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
			<p className='emp-gallery__result'>
				<span>{employees.length}</span>{employees.length > 1 ? ' Employees' : ' Employee'}
			</p>
			<div className='emp-gallery__pagination'>
			
			</div>
		</div>
	)
}
