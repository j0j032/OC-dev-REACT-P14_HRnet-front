import {useQuery} from 'react-query'
import {getAllEmployees} from './requests.js'

export const useGetEmployees = (queryKey, page, limit, value, {enabled}) => {
	return useQuery([queryKey, page, limit, value], () => getAllEmployees(page, limit, value), {
		enabled,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
}
