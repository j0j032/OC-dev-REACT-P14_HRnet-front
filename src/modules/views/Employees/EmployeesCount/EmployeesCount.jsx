export const EmployeesCount = ({total, found}) => {
	
	const text = total || found > 1 ? 'employees' : 'employee'
	
	return total !== found
		? (<p className='employees__found'>Found <span> {found}</span> of <span> {total}</span> {text}</p>)
		: (<p className='employees__total'><span>{total}</span> {text}</p>)
}
