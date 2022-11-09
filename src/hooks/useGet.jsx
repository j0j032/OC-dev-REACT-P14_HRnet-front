import {useEffect, useState} from 'react'
import axios from 'axios'

// const urlLodging = './data/lodging.json'

export const useGetData = (url = urlLodging, filter) => {
	const [data, setData] = useState({})
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	
	useEffect(() => {
		setLoading(true)
		axios
			.get(url)
			.then((response) =>
				setData(
					filter ? response.data[filter.method](filter.callback) : response.data
				)
			)
			.catch((error) => {
				console.log(error)
				setError(error)
			})
			.finally(() => setLoading(false))
	}, [])
	
	return {isLoading, data, error}
}
