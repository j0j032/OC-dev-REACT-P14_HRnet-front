import arrowRight from '../../../assets/icons/arrow/chevron_right.svg'
import arrowLeft from '../../../assets/icons/arrow/chevron_left.svg'

export const Paginator = ({totalOfPages, setPage, currentPage, lastPage, firstPage, setNext, setPrev}) => {
	const pagination = []
	
	const nextBtn = <button disabled={lastPage} className={lastPage ? 'icon icon-disabled' : 'icon'} onClick={() => setNext(totalOfPages)}>
		<img src={arrowRight} alt='next page'/></button>
	const prevBtn = <button disabled={firstPage} className={firstPage ? 'icon icon-disabled' : 'icon'} onClick={setPrev}>
		<img src={arrowLeft} alt='previous page'/></button>
	
	const createBtn = (i) => {
		return <button key={i}
		               onClick={() => setPage(i)}
		               className={currentPage === i ? 'paginator__number activePage' : 'paginator__number'}
		>{i}</button>
	}
	const createDots = () => {
		return <span className='paginator__dots'>...</span>
	}
	
	if (!totalOfPages || totalOfPages <= 1) return <div className='no-pagination'></div>
	if (totalOfPages < 7) {
		for (let i = 1; i <= totalOfPages; i++) {
			pagination.push(createBtn(i))
		}
		return (<div className='emp-gallery__pagination--nav'> {prevBtn}{pagination}{nextBtn}</div>)
	}
	
	for (let i = 1; i <= 3; i++) {
		pagination.push(createBtn(i))
	}
	pagination.push(createDots())
	
	for (let i = totalOfPages - 2; i <= totalOfPages; i++) {
		pagination.push(createBtn(i))
	}
	return (<div className='emp-gallery__pagination--nav'> {prevBtn}{pagination}{nextBtn}</div>)
}
