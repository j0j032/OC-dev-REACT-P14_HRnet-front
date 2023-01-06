export const EmployeesCount = ({total}) => {
	
	const text = total > 1 ? 'employees' : 'employee'
	
	return <p className='employees__total'><span>{total}</span> {text}</p>
}
