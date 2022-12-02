import React, {useContext} from 'react'
import Button from '../../../../components/common/Button/Button.jsx'
import {ViewContext} from '../../../../../context/EmpoyeesViewContext.jsx'
import listIcon from '../../../../../assets/icons/list_ul.svg'
import gridIcon from '../../../../../assets/icons/grid_round.svg'
import {SearchContext} from '../../../../../context/SearchContext.jsx'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'
import {CreateEmployeeForm} from '../CreateEmployeeForm/CreateEmployeeForm'

const EmployeesToolbar = () => {
	const windowSize = useWindowSize()
	const {toggleTableView, tableView} = useContext(ViewContext)
	const {setSearch} = useContext(SearchContext)
	const [isOpenModal, {openModal, closeModal}] = useModal(false)
	const handleChange = e => e.target.value.length >= 2 ? setSearch(e.target.value) : setSearch('')
	
	const viewIcon = <img className='icon' src={tableView ? gridIcon : listIcon} alt='Change view'/>
	
	return (
		<>
			<div className='toolbar-emp__container'>
				<div className='toolbar-emp__container--left'>
					<button className='btn-toggleView' onClick={toggleTableView}>{viewIcon}</button>
					<form onSubmit={(e) => e.preventDefault()}>
						<input type='text' placeholder='🔎  Employee' onChange={handleChange}/>
					</form>
				</div>
				<Button action={openModal} custom={windowSize.width > 600 ? 'btn--large btn-round' : 'btn--small btn-round'} children='+'/>
			</div>
			<Modal modalId='create-employee'
			       handleClose={closeModal}
			       isOpen={isOpenModal}
			       customBtn={{color: 'var(--FONT-color)', border: '1px solid var(--BG-invert-color)'}}
			       customBG={{display: 'flex', flexDirection: 'column'}}>
				<CreateEmployeeForm/>
			</Modal>
		</>
	)
}

export default React.memo(EmployeesToolbar)
