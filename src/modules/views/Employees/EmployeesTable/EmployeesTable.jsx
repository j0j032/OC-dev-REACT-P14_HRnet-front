import React from 'react'
import {useTable, useSortBy} from 'react-table/src'
import {employeesColumns} from '../../../../config/employeesTableConfig.jsx'

export const EmployeesTable = ({employees}) => {
	
	const data = React.useMemo(() => [...employees], [employees])
	const columns = React.useMemo(() => employeesColumns, [])
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
	
	return (
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
				{rows.map((row, i) => {
					prepareRow(row)
					return (
						<tr key={i} {...row.getRowProps}>
							{
								row.cells.map((cell, i) => (
									<td {...cell.getCellProps()} key={i}>{cell.render('Cell')}</td>
								))
							}
						</tr>
					)
				})}
				</tbody>
			</table>
		</div>
	)
}
