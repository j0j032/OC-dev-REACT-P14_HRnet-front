export const Paginator = ({totalOfPages, setPage, currentPage}) => {
	const pagination = []
	
	const createBtn = (i) => {
		return <button key={i}
		               onClick={() => setPage(i)}
		               className={currentPage === i ? 'paginator__number activePage' : 'paginator__number'}
		>{i}</button>
	}
	const createDots = () => {
		return <span className='paginator__dots'>...</span>
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
	return <div className='paginator__container'>{pagination}</div>
}
