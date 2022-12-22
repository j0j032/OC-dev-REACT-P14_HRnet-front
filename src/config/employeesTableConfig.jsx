import React from 'react'
import {formatTimestampToDate} from '../utils/formater.js'
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
			Header: 'Birthdate',
			accessor: 'birthdate',
			Cell: ({value}) => <span>{formatTimestampToDate(value)}</span>
		},
		{
			Header: 'Department',
			accessor: 'department'
		},
		{
			Header: 'Start date',
			accessor: 'hired',
			Cell: ({value}) => <span>{formatTimestampToDate(value)}</span>
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

export const employeesColumnsMediumScreen = [
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
		Header: 'Birthdate',
		accessor: 'birthdate',
		Cell: ({value}) => <span>{formatTimestampToDate(value)}</span>
	},
	{
		Header: 'Department',
		accessor: 'department'
	},
	{
		Header: 'Start date',
		accessor: 'hired',
		Cell: ({value}) => <span>{formatTimestampToDate(value)}</span>
	}
]

export const employeesColumnsMobile = [
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
		Header: 'Department',
		accessor: 'department'
	}
]
