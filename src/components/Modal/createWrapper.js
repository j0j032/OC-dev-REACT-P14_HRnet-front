export function createWrapper(wrapperId) {
	const wrapperElement = document.createElement('div')
	wrapperElement.setAttribute('id', wrapperId)
	wrapperElement.classList.add('modal-wrapper', 'animation')
	document.body.appendChild(wrapperElement)
	return wrapperElement
}
