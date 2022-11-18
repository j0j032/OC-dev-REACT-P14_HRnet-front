import {useQuery} from 'react-query'
import {getAllEmployees} from './requests.js'

export const useGetAllEmployees = (page, limit, value, {enabled}) => {
	return useQuery(['employees', page, limit, value], () => getAllEmployees(page, limit, value), {
		enabled,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
}
