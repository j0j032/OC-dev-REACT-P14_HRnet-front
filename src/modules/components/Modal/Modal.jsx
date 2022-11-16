import './Modal.scss'

export const Modal = ({children, closeModal}) => {
	return (
		<dialog onClick={closeModal} className='modal__bg'>
			<div onClick={(e) => e.stopPropagation()} className='modal__container'>
				{children}
			</div>
		</dialog>
	)
}
