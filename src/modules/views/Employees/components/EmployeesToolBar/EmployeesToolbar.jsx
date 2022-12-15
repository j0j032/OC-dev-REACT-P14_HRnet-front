import React, {useContext} from 'react'
import {ViewContext} from '../../../../../context/EmpoyeesViewContext.jsx'
import {SearchContext} from '../../../../../context/SearchContext.jsx'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'
import {CreateEmployeeForm} from '../CreateEmployeeForm/CreateEmployeeForm'
import {BsGrid3X3Gap, BsPlusLg, HiOutlineQueueList} from 'react-icons/all.js'

const EmployeesToolbar = () => {
	const windowSize = useWindowSize()
	const {toggleTableView, tableView} = useContext(ViewContext)
	const {setSearch} = useContext(SearchContext)
	const [isOpenModal, {openModal, closeModal}] = useModal(false)
	const handleChange = e => e.target.value.length >= 2 ? setSearch(e.target.value) : setSearch('')
	const viewIcon = tableView
		? <BsGrid3X3Gap className='icon-btn icon-btn--font icon-bigger'/>
		: <HiOutlineQueueList className='icon-btn icon-btn--font icon-bigger'/>
	
	return (
		<>
			<div className='toolbar-emp__container'>
				<div className='toolbar-emp__container--left'>
					<button className='btn btn-transparent' onClick={toggleTableView}>{viewIcon}</button>
					<form onSubmit={(e) => e.preventDefault()}>
						<input className='input search' type='text' placeholder='🔎  Employee' onChange={handleChange}/>
					</form>
				</div>
				<button className='btn btn-round btn-black' onClick={openModal}>
					<BsPlusLg className='icon-btn icon-btn--font white'/>
				</button>
			</div>
			<Modal modalId='create-employee'
			       handleClose={closeModal}
			       isOpen={isOpenModal}
			       customBtn={{color: 'var(--FONT-color)'}}
			       customBG={{display: 'flex', flexDirection: 'column'}}>
				<CreateEmployeeForm/>
			</Modal>
		</>
	)
}

export default React.memo(EmployeesToolbar)
