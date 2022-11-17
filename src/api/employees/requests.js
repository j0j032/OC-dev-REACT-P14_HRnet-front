import axios from 'axios'

const employeesURL = 'http://localhost:3500/employees'

export const getAllEmployees = (page = 1, limit = 12) => axios.get(`${employeesURL}?p=${page}&limit=${limit}`).then(r => r.data)
export const getEmployeeById = (id) => axios.get(`${employeesURL}/${id}`).then(r => r.data)
