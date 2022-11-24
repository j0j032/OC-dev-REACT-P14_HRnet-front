import {useQuery} from 'react-query'
import {createEmployee} from './requests.js'

export const useCreateEmployee = (data, {enabled}) => {
	return useQuery('createEmployee', () => createEmployee(data), {
		enabled,
		onError: () => console.log('err')
	})
}
