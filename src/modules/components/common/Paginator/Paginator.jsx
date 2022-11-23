import arrowRight from '../../../../assets/icons/arrow/chevron_right.svg'
import arrowLeft from '../../../../assets/icons/arrow/chevron_left.svg'
import React, {useCallback} from 'react'
import useWindowSize from '../../../../hooks/useWindowSize.jsx'

const Paginator = ({totalOfPages, setPage, currentPage, lastPage, firstPage, setNext, setPrev}) => {
	const windowSize = useWindowSize()
	const pagination = []
	
	const nextBtn = <button disabled={lastPage} className={lastPage ? 'icon icon-disabled' : 'icon'} onClick={() => setNext(totalOfPages)}>
		<img src={arrowRight} alt='next page'/>
	</button>
	const prevBtn =
		<button disabled={firstPage} className={firstPage ? 'icon icon-disabled' : 'icon'} onClick={setPrev}>
			<img src={arrowLeft} alt='previous page'/></button>
	
	const createBtn = useCallback((i) => {
		return <button key={i}
		               onClick={() => setPage(i)}
		               className={currentPage === i ? 'paginator__number activePage' : 'paginator__number'}
		>{i}</button>
	}, [currentPage])
	
	const createDots = () => {
		return <span className='paginator__dots'>...</span>
	}
	if (windowSize.width < 600) {
		return (<div className='paginator__container'> {prevBtn}{nextBtn}</div>)
	}
	
	if (!totalOfPages || totalOfPages <= 1) return <div className='paginator__empty'></div>
	if (totalOfPages < 7) {
		for (let i = 1; i <= totalOfPages; i++) {
			pagination.push(createBtn(i))
		}
		return (<div className='paginator__container'> {prevBtn}{pagination}{nextBtn}</div>)
	}
	
	for (let i = 1; i <= 3; i++) {
		pagination.push(createBtn(i))
	}
	pagination.push(createDots())
	
	for (let i = totalOfPages - 2; i <= totalOfPages; i++) {
		pagination.push(createBtn(i))
	}
	return (<div className='paginator__container'> {prevBtn}{pagination}{nextBtn}</div>)
	
}

export default React.memo(Paginator)
