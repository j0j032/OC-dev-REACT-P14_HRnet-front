/**
 * Returns a formatted string of a date object 'mm/dd/yyyy' in function of locales in param
 * @param {String} locales BCP 47 see: https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @param {Date} dateObject example: new Date('01/01/2020')
 * @returns {String} 'mm/dd/yyyy' by default
 */
const dateFormat = (locales = 'en', dateObject = new Date()) =>
	new Intl.DateTimeFormat(locales, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(dateObject)

/**
 * Fill and returns years array from 100 year before current year
 * @returns {Array} [1922, 1923,...]
 */
const years = Array(150)
	.fill()
	.map((v = new Date().getFullYear() - 100, index) => v + index)

/**
 * Returns array of a week days starting to Sunday in function of locales param for translation
 * @param {String} locales BCP 47 see https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @returns {Array} array of string example for 'en' param : ['Sunday', Monday',...]
 */
const weekDays = (locales = 'en') => {
	const startDate = new Date(1898, 11, 31)
	const array = []
	for (let i = 0; i < 7; i++) {
		array.push(
			new Date(startDate.setDate(startDate.getDate() + 1)).toLocaleString(
				locales,
				{weekday: 'long'}
			)
		)
	}
	return array
}

/**
 * Returns array of month name starting to January in function of locales param for translation
 * @param {String} locales BCP 47 see https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @returns {Array} array of string example for 'en' param: ['January', 'February',...]
 */
const months = (locales = 'en') => {
	const startDate = new Date(1898, 11, 1)
	const array = []
	for (let i = 0; i < 12; i++) {
		array.push(
			new Date(startDate.setMonth(startDate.getMonth() + 1)).toLocaleString(
				locales,
				{month: 'long'}
			)
		)
	}
	return array
}

/**
 * By default init days calendar in function of current date
 * @returns {Array} Array of String Date format 'mm/dd/yyyy' example ['09/01/2020', '09/02/2020',...]
 */
const handleSetDays = (value = new Date()) => {
	const days = Array(42)
	const firstDay = new Date(value.setDate(1))
	
	// handle first Week
	// complete start of the first week from first day of the month
	for (let i = 0; i <= firstDay.getDay(); i++) {
		const yesterday = new Date(
			new Date(firstDay).setDate(firstDay.getDate() - i)
		)
		days[firstDay.getDay() - i] = dateFormat('en', yesterday)
	}
	// complete remainder of the days
	for (let i = firstDay.getDay() + 1; i < days.length; i++) {
		const tomorrow = new Date(firstDay.setDate(firstDay.getDate() + 1))
		days[i] = dateFormat('en', tomorrow)
	}
	return days
}

export {years, weekDays, months, dateFormat, handleSetDays}
