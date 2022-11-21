export const formatToLocale = (date, zone) => {
	const newDate = Date.parse(date)
	const ts = new Date(newDate)
	return ts.toLocaleDateString(zone)
}

export const formatToDBDate = (date) => new Date(date)
