import axios from 'axios'
import {filterMainSearch} from '../../utils/filters'

const employeesURL = 'http://localhost:3500/employees'

//export const getAllEmployees = (page = 1, limit = 12) => axios.get(`${employeesURL}?p=${page}&limit=${limit}`).then(r => r.data)
export const getEmployeeById = (id) => axios.get(`${employeesURL}/${id}`).then(r => r.data)

/*export const getAllEmployees = (page = 1, limit = 12, value = '', tags = []) => axios
	.get(`${employeesURL}?p=${page}&limit=${value.length < 2 ? limit : 0}`).then(r => {
		const employees = value.length >= 2 ? filterMainSearch(r.data.employees, value) : r.data.employees
		const totalEmployeesLength = r.data.employeesLength
		return ({employees, totalEmployeesLength})
	})*/

export const getAllEmployees = (page = 1, limit = 12, text = '', tags = []) => axios
	.get(employeesURL, {params: {text, page, limit}})
	.then(r => {
		const employees = text.length >= 2 ? filterMainSearch(r.data.employees, text) : r.data.employees
		const totalEmployeesLength = r.data.employeesLength
		//console.log('-page:' + page + ' -limit:' + limit + ' -text:' + text + ' -tags:' + tags)
		//console.log(r.data.employees.length)
		return ({employees, totalEmployeesLength})
	})
