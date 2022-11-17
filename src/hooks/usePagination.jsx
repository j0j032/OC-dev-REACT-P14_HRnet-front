import React, {useCallback, useState} from 'react'

export const usePagination = () => {
	const [page, setPage] = useState(0)
	const [currentPage, setCurrentPage] = useState(page + 1)
	
	const firstPage = page === 0
	
	const handlePageNumber = useCallback((page) => {
		setPage(page - 1)
		setCurrentPage(page)
	}, [page])
	
	const handleNextPage = useCallback((totalPages) => {
		if (page === totalPages - 1) {
			setPage(totalPages - 1)
			setCurrentPage(totalPages)
		} else {
			setPage(page + 1)
			setCurrentPage(currentPage + 1)
		}
	}, [page])
	
	const handlePrevPage = useCallback(() => {
		if (page === -1) {
			setPage(0)
			setCurrentPage(1)
		} else {
			setPage(page - 1)
			setCurrentPage(currentPage - 1)
		}
	}, [page])
	
	const lastPage = (totalPages) => page === totalPages - 1
	
	return [page, currentPage, firstPage, lastPage, {setPrev: handlePrevPage, setNext: handleNextPage, setPage: handlePageNumber}]
}
