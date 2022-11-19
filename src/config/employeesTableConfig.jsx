import React from 'react'
import {formatToLocale} from '../utils/dateFormater.js'

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
			Cell: ({value}) => <span>{formatToLocale(value, 'en-US')}</span>
		},
		{
			Header: 'Department',
			accessor: 'department'
		},
		{
			Header: 'Birthdate',
			accessor: 'birthdate',
			Cell: ({value}) => <span>{formatToLocale(value, 'en-US')}</span>
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
