import {useState} from 'react'

export const PaginationLimiter = ({setLimit, text, defaultOption, option2, option3, option4, option5}) => {
	
	const options = [
		{value: defaultOption, text: defaultOption},
		{value: option2, text: option2},
		{value: option3, text: option3},
		{value: option4, text: option4},
		{value: option5, text: option5}
	]
	
	const [selected, setSelected] = useState(options[0].value)
	const handleChangeLimit = e => {
		setSelected(e.target.value)
		setLimit(e.target.value)
	}
	
	return (
		<div className='pagination-limiter'>
			<p>Show </p>
			<select value={selected} onChange={handleChangeLimit}>
				{options.map(option => (<option key={option.value}>{option.text}</option>))}
			</select>
			<p>{`${text} per page`}</p>
		</div>
	)
}
