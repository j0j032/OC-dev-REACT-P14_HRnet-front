import './Modal.css'
import {useEffect} from 'react'
import ReactPortal from './ReactPortal.jsx'

const Modal = ({modalId = 'new-modal', children, isOpen, handleClose, customBG, customBtn}) => {
	
	useEffect(() => {
		const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [handleClose])
	
	if (!isOpen) return null
	
	return (
		<ReactPortal wrapperId={modalId}>
			<div onClick={handleClose} className='modal__bg' style={customBG}>
				<div onClick={(e) => e.stopPropagation()} className='modal__container'>
					<button onClick={handleClose} className='modal__closeBtn' style={customBtn}>✕</button>
					{children}
				</div>
			</div>
		</ReactPortal>
	)
}

export default Modal
