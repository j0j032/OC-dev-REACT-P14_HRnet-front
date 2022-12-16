import {useQuery} from 'react-query'
import {getAllEmployees} from './requests.js'

export const useGetEmployees = (specificKey, page, limit, value, sort, {enabled}) => {
	return useQuery(['employees', specificKey, page, limit, value, sort], () => getAllEmployees(page, limit, value, sort), {
		enabled,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
}
