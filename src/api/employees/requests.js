import axios from 'axios'

const employeesURL = 'http://localhost:3500/employees'

export const getAllEmployees = async (page, limit) => axios.get(`${employeesURL}?p=${page}&limit=${limit}`).then(r => r.data)
