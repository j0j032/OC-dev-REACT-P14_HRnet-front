import React from 'react'
import {useTable} from 'react-table/src/hooks/useTable'

export const EmployeesTable = ({employees}) => {
	
	const data = React.useMemo(() => [...employees], [employees])
	
	const columns = React.useMemo(() => (
		[
			{
				Header: '',
				accessor: 'picture',
				Cell: ({cell: {value}}) => (
					<img className='employees-table__img' src={value} alt={value}/>
				)
			},
			{
				Header: 'Firstname',
				accessor: 'firstname'
			},
			{
				Header: 'Lastname',
				accessor: 'lastname'
			},
			{
				Header: 'Start date',
				accessor: 'hired',
				Cell: ({value}) => <span>{value.slice(0, 10)}</span>
			},
			{
				Header: 'Department',
				accessor: 'department'
			},
			{
				Header: 'Birthdate',
				accessor: 'birthdate',
				Cell: ({value}) => <span>{value.slice(0, 10)}</span>
			},
			{
				Header: 'Street',
				accessor: 'address.street'
			},
			{
				Header: 'City',
				accessor: 'address.city'
			},
			{
				Header: 'State',
				accessor: 'address.state'
			},
			{
				Header: 'Zip',
				accessor: 'address.zip'
			}
		
		]
	), [])
	
	const tableInstance = useTable({columns, data})
	const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
	return (
		<div className='employees-table__container'>
			<table className='employees-table__wrapper' cellSpacing='0' cellPadding='0' {...getTableProps()}>
				<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
				</thead>
				
				<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps}>
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
