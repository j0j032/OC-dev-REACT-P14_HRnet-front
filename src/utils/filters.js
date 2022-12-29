/**
 * Determines whether an array (value1 in lower case) includes a certain value (value2 in lower case) among its entries,
 * returning true or false as appropriate.
 * @param {String} value1
 * @param {String} value2
 * @returns Boolean
 */
export const isIncluded = (value1, value2) => value1.toLowerCase().includes(value2.toLowerCase())

/**
 * returns the first element in the provided array that satisfies the provided testing function (isIncluded function).
 * If no values satisfy the testing function, undefined is returned.
 * @param {Array} array - Array of object (employees)
 * @param {String} property - Object property by example: 'description' or 'name'
 * @param {String} value - String to search
 * @returns Object || undefined
 */
export const isFound = (array, property, value) => array.find(item => isIncluded(item[property], value))

export const filterMainSearch = (employees, value) => employees
	.filter(item =>
		isIncluded(item.firstname, value) ||
		isIncluded(item.lastname, value) ||
		isIncluded(item.hired, value) ||
		isIncluded(item.department, value) ||
		isIncluded(item.birthdate, value) ||
		isIncluded(item.address.street, value) ||
		isIncluded(item.address.city, value) ||
		isIncluded(item.address.state, value) ||
		isIncluded(item.address.zip, value)
	)
