export const EmployeesCount = ({total, totalFound, search}) => {
	const text = total > 1 ? 'employees' : 'employee'
	
	return search.length > 1
		? <p className='employees__total'>found <span>{totalFound}</span> of <span>{total}</span> {text}</p>
		: <p className='employees__total'><span>{total}</span> {text}</p>
	
}
