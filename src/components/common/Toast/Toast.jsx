import {motion} from 'framer-motion'
import {BsPatchCheckFill, IoClose, RiErrorWarningFill, TiWarning} from 'react-icons/all.js'
import {capitalize} from '../../../utils/formater.js'
import {useRef} from 'react'

export const Toast = ({type, message}) => {
	// types: success, error, warning
	
	const ref = useRef(null)
	
	const icon = type === 'success'
		? <BsPatchCheckFill className='toast-icon toast-icon--success'/>
		: type === 'warning'
			? <TiWarning className='toast-icon toast-icon--warning'/>
			: <RiErrorWarningFill className='toast-icon toast-icon--error'/>
	
	const hideToast = () => ref.current.classList.add('hide')
	
	return (
		<motion.div initial={{x: -100}}
		            animate={{x: 0}}
		            exit={{x: -100}}
		            ref={ref}
		            className={
			            type === 'success' ? ' toast toast__success'
				            : type === 'error' ? ' toast toast__error'
					            : type === 'warning' ? ' toast toast__warning'
						            : ' toast toast__default'}>
			<div>
				{icon}
				<div>
					<h5>{capitalize(type)}</h5>
					<p>{message}</p>
				</div>
			</div>
			<IoClose className='icon icon-btn' onClick={hideToast}/>
		</motion.div>
	)
}
