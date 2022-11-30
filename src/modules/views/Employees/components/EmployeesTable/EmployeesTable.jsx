import React, {useState} from 'react'
import {useTable, useSortBy} from 'react-table/src'
import {employeesColumns, employeesColumnsMobile} from '../../../../../config/employeesTableConfig.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'
import {EmployeeDetails} from '../EmployeeDetails/EmployeeDetails.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'

export const EmployeesTable = ({employees}) => {
	const windowSize = useWindowSize()
	const [modalIsOpen, {openModal, closeModal}] = useModal(false)
	const [employeeId, setEmployeeId] = useState('')
	const data = React.useMemo(() => [...employees], [employees])
	const columns = React.useMemo(() => windowSize.width > 600 ? employeesColumns : employeesColumnsMobile, [windowSize.width])
	const tableInstance = useTable({columns, data}, useSortBy)
	const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
	
	
	const displayActiveSortCaret = (condition) => condition
		? <div className='sort-caret__container'>
			<span className='sort-caret sort-caret--inactive'>▲</span>
			<span className='sort-caret'>▼</span>
		</div>
		: <div className='sort-caret__container'>
			<span className='sort-caret'>▲</span>
			<span className='sort-caret sort-caret--inactive'>▼</span>
		</div>
	
	const inactiveSortCaret = <div className='sort-caret__container'>
		<span className='sort-caret sort-caret--inactive'>▲</span>
		<span className='sort-caret sort-caret--inactive'>▼</span>
	</div>
	
	
	const handleOpenModal = (row) => {
		setEmployeeId(row)
		openModal()
	}
	
	return (
		<>
			<div className='employees-table__container'>
				<table className='employees-table__wrapper' cellSpacing='0' cellPadding='0' {...getTableProps()}>
					<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.filter((header) => header.Header !== '').map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}
									{column.isSorted ? displayActiveSortCaret(column.isSortedDesc) : inactiveSortCaret}
								</th>
							))}
						</tr>
					))}
					</thead>
					
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
			<Modal handleClose={closeModal}
			       modalId='employee-details-modal'
			       isOpen={modalIsOpen}
			       customBtn={{color: 'var(--FONT-color)', border: '1px solid var(--BG-invert-color)'}}
			       customBG={{backdropFilter: 'blur(2px)'}}>
				<EmployeeDetails id={employeeId} closeModal={closeModal}/>
			</Modal>
		</>
	)
}
