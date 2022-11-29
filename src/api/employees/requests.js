import axios from 'axios'
import {filterMainSearch} from '../../utils/filters'

const employeesURL = 'http://localhost:3500/employees'
const API_ENDPOINT = 'https://ijs7yfiy4f.execute-api.eu-west-3.amazonaws.com/getPresignedImageUrl'


export const getEmployeeById = (id) => axios.get(`${employeesURL}/${id}`).then(r => r.data)

export const getAllEmployees = (page = 1, limit = 12, text = '', tags = []) => axios
	.get(employeesURL, {params: {text, page, limit}})
	.then(r => {
		const employees = text.length >= 2 ? filterMainSearch(r.data.employees, text) : r.data.employees
		const totalEmployees = r.data.employeesLength
		
		return ({employees, totalEmployees})
	})

export const createEmployee = (formData) => axios.post(employeesURL, formData).then(r => r.data)


export const getPresignedUrl = () => axios.get(API_ENDPOINT).then(r => {
	console.log(r.data)
	return r.data
})
