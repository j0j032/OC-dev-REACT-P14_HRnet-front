import {Loader} from '../../../components/Loader/Loader.jsx'
import {useQuery} from 'react-query'
import {getEmployeeById} from '../../../../api/employees/requests.js'

export const EmployeeDetails = ({id}) => {
	const {data, isLoading, isError} = useQuery(['employee'], () => getEmployeeById(id), {
		refetchOnWindowFocus: false
	})
	return (
		<>
			{isLoading ? <Loader/> : isError ? <div>ERROR</div> : (
				<div>
					<h1>{data.firstname}</h1>
				</div>
			)}
		</>
	)
}
