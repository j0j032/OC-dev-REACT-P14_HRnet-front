import React, {useState} from 'react'
import {useTable, useSortBy} from 'react-table/src'
import {employeesColumns, employeesColumnsMediumScreen, employeesColumnsMobile} from '../../../../../config/employeesTableConfig.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'
import {EmployeeDetails} from '../EmployeeDetails/EmployeeDetails.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'
import {useQueryClient} from 'react-query'
import {mediumScreenTable, mobileScreenTable} from '../../../../../config/breakPoints.js'

export const EmployeesTable = ({employees}) => {
	const windowSize = useWindowSize()
	const [modalIsOpen, {openModal, closeModal}] = useModal(false)
	const [employeeId, setEmployeeId] = useState('')
	
	const columnItemsDisplay = windowSize.width < mobileScreenTable ? employeesColumnsMobile : windowSize.width > mobileScreenTable && windowSize.width < mediumScreenTable ? employeesColumnsMediumScreen : employeesColumns
	
	
	const data = React.useMemo(() => [...employees], [employees])
	const columns = React.useMemo(() => columnItemsDisplay, [windowSize.width])
	const tableInstance = useTable({columns, data}, useSortBy)
	const {getTableProps, getTableBodyProps, rows, prepareRow} = tableInstance
	const queryClient = useQueryClient()
	
	const handleOpenModal = (row) => {
		setEmployeeId(row)
		openModal()
	}
	
	const handleCloseModal = async () => {
		await queryClient.removeQueries('employee')
		closeModal()
	}
	
	return (
		<>
			<div className='employees-table__container'>
				<table className='employees-table__wrapper' cellSpacing='0' cellPadding='0' {...getTableProps()}>
					<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)
						return (
							<tr key={row.original._id} {...row.getRowProps} onClick={() => handleOpenModal(row.original._id)}>
								{
									row.cells.map((cell, i) => (
										<td {...cell.getCellProps()} key={`${i}:${cell.row.original._id}`}>{cell.render('Cell')}</td>
									))
								}
							</tr>
						)
					})}
					</tbody>
				</table>
			</div>
			<Modal handleClose={handleCloseModal}
			       modalId='modal'
			       isOpen={modalIsOpen}
			       customBtn={{color: 'var(--COMPANY-theme-color)'}}
			       customBG={{backdropFilter: 'blur(2px)'}}>
				<EmployeeDetails id={employeeId} closeModal={handleCloseModal}/>
			</Modal>
		</>
	)
}
