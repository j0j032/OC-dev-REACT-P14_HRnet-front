import {useQuery} from 'react-query'
import {getAllEmployees} from './requests.js'

export const useGetAllEmployees = (page, limit, {enabled}) => {
	return useQuery(['employees', page, limit], () => getAllEmployees(page, limit), {
		enabled,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	})
}
