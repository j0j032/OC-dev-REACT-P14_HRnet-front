import axios from 'axios'
import {filterMainSearch} from '../utils/filters.js'
import {useMutation, useQuery, useQueryClient} from 'react-query'

const employeesURL = 'http://localhost:3500/employees'

const getEmployeeById = (id) => axios.get(`${employeesURL}/${id}`).then(r => r.data)

const getAllEmployees = (page = 1, limit = 12, text = '', sortMethod = {'lastname': 1}, companyId) => axios
	.get(employeesURL, {params: {companyId, text, page, limit, sortMethod}})
	.then(r => {
		const employees = text.length >= 2 ? filterMainSearch(r.data.employees, text) : r.data.employees
		const totalEmployees = r.data.employeesLength
		
		return ({employees, totalEmployees})
	})

const createEmployee = (formData) => axios.post(employeesURL, formData, {headers: {'Content-Type': 'multipart/form-data'}})

const updateEmployee = (formData) => axios.put(employeesURL, formData, {headers: {'Content-Type': 'multipart/form-data'}})

const deleteEmployee = (id) => axios.delete(employeesURL, {data: {id}})

export const useGetEmployees = (specificKey, page, limit, value, sort, companyId, {enabled}) => {
	return useQuery(['employees', specificKey, page, limit, value, sort], () => getAllEmployees(page, limit, value, sort, companyId), {
		enabled,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
}

export const useGetEmployee = (id) => {
	return useQuery(['employee'], () => getEmployeeById(id), {
		refetchOnWindowFocus: false
	})
}

export const useCreateEmployee = () => {
	const queryClient = useQueryClient()
	return useMutation(async (formData) => {
		await createEmployee(formData)
	}, {
		onSuccess: () => queryClient.invalidateQueries('employees')
	})
}

export const useUpdateEmployee = () => {
	const queryClient = useQueryClient()
	return useMutation(async (formData) => {
		await updateEmployee(formData)
	}, {
		onSuccess: () => Promise.all([
			queryClient.invalidateQueries('employees'),
			queryClient.invalidateQueries('employee')
		])
	})
}

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient()
	return useMutation(async (id) => {
		await deleteEmployee(id)
	}, {
		onSuccess: () => queryClient.invalidateQueries('employees')
	})
}


