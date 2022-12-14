import React from 'react'
import {formatToLocale} from '../utils/formater.js'
import imgPlaceholder from '../assets/imgPlaceholder.svg'
import {parseImgUrl} from '../utils/parseImgUrl.js'

export const employeesColumns =
	[
		{
			Header: '',
			accessor: 'imageUrl',
			Cell: ({cell: {value}}) => (
				<img className='profile-picture picture-xs' src={parseImgUrl(value) !== 'none' ? value : imgPlaceholder} alt={value}/>
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
			accessor: 'address.stateAbb'
		},
		{
			Header: 'Zip',
			accessor: 'address.zip'
		}
	]

export const employeesColumnsMobile =
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
		}
	]
