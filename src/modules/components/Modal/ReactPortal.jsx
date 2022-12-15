import {createPortal} from 'react-dom'
import {createWrapper} from './createWrapper.js'
import {useLayoutEffect, useState} from 'react'

const ReactPortal = ({children, wrapperId = 'react-portal-wrapper'}) => {
	
	const [wrapperElement, setWrapperElement] = useState(null)
	
	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId), systemCreated = false
		if (!element) {
			systemCreated = true
			element = createWrapper(wrapperId)
			requestAnimationFrame(() => {
				element.classList.remove('animation')
			})
		}
		setWrapperElement(element)
		
		return () => {
			if (systemCreated && element.parentNode) {
				element.parentNode.removeChild(element)
			}
		}
	}, [wrapperId])
	
	if (wrapperElement === null) return null
	
	return createPortal(children, wrapperElement)
}

export default ReactPortal
