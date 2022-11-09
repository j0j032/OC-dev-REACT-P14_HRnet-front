import {useState} from 'react'

/**
 * A more functional way to handle booleans state.
 * You can declare it the same way as a useState, but you can define 3 different set functions:
 * {toggle, set false, set true}
 * you can rename these function as you wish
 *
 * @example const [modalIsOpen, {setTrue:openModal, setFalse: closeModal, setToggle: toggleModal}] =
 * useBoolean(false)
 *
 * @param initialState
 * @returns {[boolean,{setTrue: (function(): void), setFalse: (function(): void), setToggle: (function(): void)}]}
 */
const UseBoolean = (initialState = false) => {
	const [state, setState] = useState(initialState)
	
	const handleTrue = () => setState(true)
	const handleFalse = () => setState(false)
	const handleToggle = () => setState(!state)
	return [
		state,
		{
			setTrue: handleTrue,
			setFalse: handleFalse,
			setToggle: handleToggle
		}
	]
}

export default UseBoolean
