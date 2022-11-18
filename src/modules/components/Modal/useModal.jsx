import {useState} from 'react'

const useModal = (initialState = false) => {
	const [state, setState] = useState(initialState)
	
	const handleTrue = () => setState(true)
	const handleFalse = () => setState(false)
	const handleToggle = () => setState(!state)
	return [
		state,
		{
			openModal: handleTrue,
			closeModal: handleFalse,
			toggleModal: handleToggle
		}
	]
}

export default useModal
