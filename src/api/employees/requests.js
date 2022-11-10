import axios from 'axios'

const employeesURL = 'http://localhost:3500/employees'

export const getAllEmployees = async () => axios.get(employeesURL).then(r => r.data)
