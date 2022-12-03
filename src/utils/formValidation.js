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

const isValidUsDate = {
	regex: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
	msg: 'Invalid date format (mm/dd/yyyy)'
}

const required = 'This field is required'

const RQ_ExcludeNumbers = {
	required,
	pattern: {
		value: isNotIncludingNumbers.regex,
		message: isNotIncludingNumbers.msg
	}
}

const RQ_UsDate = {
	required,
	pattern: {
		value: isValidUsDate.regex,
		message: isValidUsDate.msg
	}
}

const RQ_validEmail = {
	required,
	pattern: {
		value: isValidEmail.regex,
		message: isValidEmail.msg
	}
}

const RQ_validUsZip = {
	required,
	pattern: {
		value: isValidUsZip.regex,
		message: isValidUsDate.msg
	}
}

const RQ_validUsNumber = {
	required,
	pattern: {
		value: isValidUsNumber.regex,
		message: isValidUsNumber.msg
	}
}

export const formValidation = {
	isNotIncludingNumbers,
	isValidEmail,
	isValidUsNumber,
	isValidUsZip,
	isValidUsDate,
	RQ_ExcludeNumbers,
	RQ_UsDate,
	RQ_validEmail,
	RQ_validUsZip,
	RQ_validUsNumber
}
