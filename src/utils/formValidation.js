const isNotIncludingNumbers = {
	regex: /^([^0-9]*)$/,
	msg: 'No numbers allowed'
}
const isValidEmail = {
	regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	msg: 'Invalid email address'
}

const isValidUsNumber = {
	regex: /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/gm,
	msg: 'Should be a valid us number (10 digits)'
}

const isValidUsZip = {
	regex: /^\d{5}$/,
	msg: 'Invalid Zip ( need 5 digits)'
}

export const formValidation = {
	isNotIncludingNumbers,
	isValidEmail,
	isValidUsNumber,
	isValidUsZip
}
