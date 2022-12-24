import React, {useCallback, useState} from 'react'

const PaginationLimiter = ({setLimit, totalData, currentPage}) => {
	const [selected, setSelected] = useState()
	
	const handleChangeLimit = useCallback((e) => {
		setSelected(e.target.value)
		setLimit(e.target.value)
	}, [selected])
	
	const defineOptions = useCallback((totalData) => {
		const allOptions = []
		const nbrOfOptions = Math.ceil(totalData / 12)
		for (let i = 1; i < nbrOfOptions + 1; i++) {
			allOptions.push(i * 12)
		}
		return currentPage === 1 ? allOptions.fill(totalData, -1) : allOptions.filter(n => (totalData / n) > currentPage - 1)
	}, [totalData, currentPage])
	
	
	return (
		<div className='pagination-limiter'>
			<select value={selected} onChange={handleChangeLimit}>
				{defineOptions(totalData).map(option => (<option key={option}>{option}</option>))}
			</select>
		</div>
	)
}

export default React.memo(PaginationLimiter)
