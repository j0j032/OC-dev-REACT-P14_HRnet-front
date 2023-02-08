import React, {useCallback} from 'react'
import {BiChevronLeft, BiChevronRight} from 'react-icons/all.js'

const Paginator = ({totalOfPages, setPage, currentPage, lastPage, firstPage, setNext, setPrev}) => {
	const pagination = []
	
	const nextBtn =
		<button disabled={lastPage} onClick={() => setNext(totalOfPages)}>
			<BiChevronRight className={lastPage ? 'icon icon-disabled' : 'icon font-color'}/>
		</button>
	
	const prevBtn =
		<button disabled={firstPage} onClick={setPrev}>
			<BiChevronLeft className={firstPage ? 'icon icon-disabled' : 'icon font-color'}/>
		</button>
	
	const createBtn = useCallback((i) => {
		return (
			<button key={i}
			        onClick={() => setPage(i)}
			        className={currentPage === i ? 'paginator__number activePage' : 'paginator__number'}>{i}
			</button>
		)
	}, [currentPage])
	
	const createDots = () => {
		return <span className='paginator__dots'>...</span>
	}
	
	if (!totalOfPages || totalOfPages <= 1) return <div className='paginator__empty'></div>
	
	if (totalOfPages < 7) {
		for (let i = 1; i <= totalOfPages; i++) {
			pagination.push(createBtn(i))
		}
		return <div className='paginator__container'> {prevBtn}{pagination}{nextBtn}</div>
	}
	
	for (let i = 1; i <= 3; i++) pagination.push(createBtn(i))
	pagination.push(createDots())
	
	for (let i = totalOfPages - 2; i <= totalOfPages; i++) pagination.push(createBtn(i))
	
	
	return (
		<div className='paginator__container'>
			{prevBtn}{pagination}{nextBtn}
		</div>
	)
}

export default React.memo(Paginator)
