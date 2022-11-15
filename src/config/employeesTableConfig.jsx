import React from 'react'

export const employeesColumns =
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
