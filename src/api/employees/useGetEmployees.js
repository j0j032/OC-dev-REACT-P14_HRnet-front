import {useQuery} from 'react-query'
import {getAllEmployees} from './requests.js'

export const useGetEmployees = (specificKey, page, limit, value, {enabled}) => {
	return useQuery(['employees', specificKey, page, limit, value], () => getAllEmployees(page, limit, value), {
		enabled,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
}
