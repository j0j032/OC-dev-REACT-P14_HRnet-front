import React, {useState} from 'react'
import {FiChevronDown, FiChevronUp} from 'react-icons/all.js'

export function SortButton({inputName, sortName, setSort}) {
	const [sortMethod, setSortMethod] = useState(1)
	const sortValues = [[sortName, sortMethod]]
	
	const sortEmployees = (arr) => {
		if (sortMethod === 1) {
			setSortMethod(-1)
		}
		if (sortMethod === -1) {
			setSortMethod(1)
		}
		const category = Object.fromEntries(arr)
		setSort(category)
	}
	return (
		<button className='sort-btn' onClick={() => sortEmployees(sortValues)}>
			{inputName} {sortMethod === 1 ? (<FiChevronDown/>) : sortMethod === -1 ? (<FiChevronUp/>) : null}
		</button>
	)
}
