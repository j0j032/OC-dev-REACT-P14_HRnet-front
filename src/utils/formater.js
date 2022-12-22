export function formatTimestampToDate(date) {
	let yyyy = date.substring(0, 4)
	let mm = date.substring(4, 6)
	let dd = date.substring(6, 8)
	return mm + '/' + dd + '/' + yyyy
}

export const capitalize = value => (value && value[0].toUpperCase() + value.slice(1).toLowerCase()) || ''
