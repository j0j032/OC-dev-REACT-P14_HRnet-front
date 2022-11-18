import axios from 'axios'
import {filterMainSearch} from '../../utils/filters'

const employeesURL = 'http://localhost:3500/employees'

//export const getAllEmployees = (page = 1, limit = 12) => axios.get(`${employeesURL}?p=${page}&limit=${limit}`).then(r => r.data)
export const getEmployeeById = (id) => axios.get(`${employeesURL}/${id}`).then(r => r.data)
export const getAllEmployees = (page = 1, limit = 12, value = '', tags = []) => axios
	.get(`${employeesURL}?p=${page}&limit=${limit}`).then(r => {
		const employees = value.length >= 2 ? filterMainSearch(r.data.employees, value) : r.data.employees
		const employeesLength = r.data.employeesLength
		return ({employees, employeesLength})
	})
