export const formatToLocale = (date, zone) => {
	const newDate = Date.parse(date)
	const ts = new Date(newDate)
	return ts.toLocaleDateString(zone)
}

export function formatPhoneNumber(phoneNumberString) {
	let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		let intlCode = (match[1] ? '+1 ' : '')
		return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
	}
	return null
}

export const capitalize = value => (value && value[0].toUpperCase() + value.slice(1).toLowerCase()) || ''
