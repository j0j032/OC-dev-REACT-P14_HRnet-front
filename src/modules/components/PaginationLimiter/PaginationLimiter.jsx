import {useCallback, useState} from 'react'

export const PaginationLimiter = ({setLimit, text, totalData, currentPage}) => {
	const [selected, setSelected] = useState()
	
	const handleChangeLimit = e => {
		setSelected(e.target.value)
		setLimit(e.target.value)
	}
	
	const defineOptions = useCallback((totalData) => {
		const allOptions = []
		const nbrOfOptions = Math.ceil(totalData / 12)
		for (let i = 1; i < nbrOfOptions + 1; i++) {
			allOptions.push(i * 12)
		}
		// console.log(allOptions.filter(n => (totalData / n) > currentPage - 1))
		return currentPage === 1 ? allOptions.fill(totalData, -1) : allOptions.filter(n => (totalData / n) > currentPage - 1)
	}, [totalData, currentPage])
	
	
	return (
		<div className='pagination-limiter'>
			<p>Show </p>
			<select value={selected} onChange={handleChangeLimit}>
				{defineOptions(totalData).map(option => (<option key={option}>{option}</option>))}
			</select>
			<p>{`${text} per page`}</p>
		</div>
	)
}
