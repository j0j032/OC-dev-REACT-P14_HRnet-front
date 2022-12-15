import React, {useContext, useState} from 'react'
import {ViewContext} from '../../../../../context/EmpoyeesViewContext.jsx'
import useWindowSize from '../../../../../hooks/useWindowSize.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'
import {CreateEmployeeForm} from '../CreateEmployeeForm/CreateEmployeeForm'
import {BsGrid3X3Gap, BsPlusLg, FiChevronDown, FiChevronUp, HiOutlineQueueList} from 'react-icons/all.js'

const sortItems = [
	{sort: 'firstname', value: 'Firstname'},
	{sort: 'lastname', value: 'Lastname'},
	{sort: 'department', value: 'Department'},
	{sort: 'address.state', value: 'State'},
	{sort: 'address.city', value: 'City'},
	{sort: 'address.zip', value: 'Zip'}
]

export function SortButton({inputName, sortName, setSort}) {
	const [sortMethod, setSortMethod] = useState(1)
	const sortValues = [[sortName, sortMethod]]
	
	const sortEmployees = (arr) => {
		if (sortMethod === 1) {
			setSortMethod(-1)
		}
		if (sortMethod === -1) {
			setSortMethod(1)
		}
		const category = Object.fromEntries(arr)
		setSort(category)
	}
	return (
		<div>
			<button className='sort-btn' onClick={() => sortEmployees(sortValues)}>
				{inputName} {sortMethod === 1 ? (<FiChevronDown/>) : sortMethod === -1 ? (<FiChevronUp/>) : null}
			</button>
		</div>
	)
}

const EmployeesToolbar = ({setSearch, setSort}) => {
	const windowSize = useWindowSize()
	const {toggleTableView, tableView} = useContext(ViewContext)
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
						<input className='input search' type='text' placeholder='🔎  Search' onChange={handleChange}/>
					</form>
				</div>
				<div className='toolbar-emp__sortBtns-container'>
					{sortItems.map(item => <SortButton inputName={item.value} key={item.sort} sortName={item.sort} setSort={setSort}/>)}
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
