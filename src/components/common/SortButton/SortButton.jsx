import React, {useState} from 'react'
import {BsChevronExpand} from 'react-icons/all.js'

export function SortButton({inputName, sortName, setSort}) {
	const [sortMethod, setSortMethod] = useState(1)
	const sortValues = [[sortName, sortMethod]]
	
	const sortEmployees = (e, arr) => {
		e.stopPropagation()
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
		<button className='sort-btn' onClick={(e) => sortEmployees(e, sortValues)}>
			{inputName} <BsChevronExpand/>
		</button>
	)
}
