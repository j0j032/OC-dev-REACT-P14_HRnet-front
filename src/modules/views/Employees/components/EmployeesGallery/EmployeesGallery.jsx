import {EmployeeCard} from '../EmployeeCard/EmployeeCard.jsx'

export const EmployeesGallery = ({employees}) => {
	return (
		<div className='emp-gallery__container'>
			<div className='emp-gallery__wrapper'>
				{employees.map((employee) => <EmployeeCard key={employee._id} data={employee}/>)}
			</div>
		</div>
	)
}
