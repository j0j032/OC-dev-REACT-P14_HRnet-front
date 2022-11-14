import {EmployeeCard} from '../EmployeeCard/EmployeeCard'

export const EmployeesGallery = ({employees}) => {
	return (
		<div className='emp-gallery__container'>
			<div className='emp-gallery__wrapper'>
				{employees.map((employee) => <EmployeeCard
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
		</div>
	)
}
