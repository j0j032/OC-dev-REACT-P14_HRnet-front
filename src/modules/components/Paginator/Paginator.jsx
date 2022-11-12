export const Paginator = ({totalOfPages, setPage}) => {
	const pagination = []
	
	const createBtn = (i) => {
		return <button key={i} onClick={() => setPage(i)}>{i}</button>
	}
	const createDots = () => {
		return <span>...</span>
	}
	
	if (!totalOfPages) return <p>No pages</p>
	if (totalOfPages < 7) {
		for (let i = 1; i <= totalOfPages; i++) {
			pagination.push(createBtn(i))
		}
		return pagination
	}
	
	for (let i = 1; i <= 3; i++) {
		pagination.push(createBtn(i))
	}
	pagination.push(createDots())
	
	for (let i = totalOfPages - 2; i <= totalOfPages; i++) {
		pagination.push(createBtn(i))
	}
	return pagination
}
