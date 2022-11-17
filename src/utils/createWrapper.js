export function createWrapper(wrapperId) {
	const wrapperElement = document.createElement('div')
	wrapperElement.setAttribute('id', wrapperId)
	document.body.appendChild(wrapperElement)
	return wrapperElement
}
