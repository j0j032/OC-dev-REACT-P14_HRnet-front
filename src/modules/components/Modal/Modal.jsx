import './Modal.scss'
import {useEffect} from 'react'
import ReactPortal from './ReactPortal.jsx'

const Modal = ({children, isOpen, handleClose}) => {
	
	useEffect(() => {
		const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [handleClose])
	
	if (!isOpen) return null
	
	return (
		<ReactPortal wrapperId='modal-container'>
			<div onClick={handleClose} className='modal__bg'>
				<div onClick={(e) => e.stopPropagation()} className='modal__container'>
					<button onClick={handleClose} className='modal__closeBtn'>✕</button>
					{children}
				</div>
			</div>
		</ReactPortal>
	)
}

export default Modal
