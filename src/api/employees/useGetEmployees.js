import {useQuery} from 'react-query'
import {getAllEmployees} from './requests.js'

export const useGetAllEmployees = ({enabled}) => {
	return useQuery('employees', () => getAllEmployees(), {
		enabled
	})
}
