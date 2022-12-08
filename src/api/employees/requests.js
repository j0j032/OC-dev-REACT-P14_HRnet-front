import axios from 'axios'
import {filterMainSearch} from '../../utils/filters'

const employeesURL = 'http://localhost:3500/employees'


export const getEmployeeById = (id) => axios.get(`${employeesURL}/${id}`).then(r => r.data)

export const getAllEmployees = (page = 1, limit = 12, text = '') => axios
	.get(employeesURL, {params: {text, page, limit}})
	.then(r => {
		const employees = text.length >= 2 ? filterMainSearch(r.data.employees, text) : r.data.employees
		const totalEmployees = r.data.employeesLength
		
		return ({employees, totalEmployees})
	})

export const createEmployee = (formData) => axios.post(employeesURL, formData, {headers: {'Content-Type': 'multipart/form-data'}})

export const updateEmployee = (formData) => axios.put(employeesURL, formData, {headers: {'Content-Type': 'multipart/form-data'}})

export const deleteEmployee = (id) => axios.delete(employeesURL, {data: {id}})
