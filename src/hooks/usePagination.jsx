import React, {useState} from 'react'

export const usePagination = () => {
	const [page, setPage] = useState(0)
	const [currentPage, setCurrentPage] = useState(page + 1)
	
	
	const handlePageNumber = (page) => {
		setPage(page - 1)
		setCurrentPage(page)
	}
	
	const handleNextPage = (totalPages) => {
		if (page === totalPages - 1) {
			setPage(totalPages - 1)
			setCurrentPage(totalPages)
		} else {
			setPage(page + 1)
			setCurrentPage(currentPage + 1)
		}
	}
	
	const handlePrevPage = () => {
		if (page === -1) {
			setPage(0)
			setCurrentPage(1)
		} else {
			setPage(page - 1)
			setCurrentPage(currentPage - 1)
		}
	}
	
	return [page, currentPage, {setPrev: handlePrevPage, setNext: handleNextPage, setPage: handlePageNumber}]
}
