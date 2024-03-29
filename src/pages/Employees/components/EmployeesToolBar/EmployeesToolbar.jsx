import React, {useContext} from 'react'
import {ViewContext} from '../../context/EmpoyeesViewContext.jsx'
import {Modal} from 'basic-modal-react'
import {CreateEmployeeForm} from '../CreateEmployeeForm/CreateEmployeeForm.jsx'
import {BsGrid3X3Gap, BsPlusLg, BsSortUpAlt, TbList} from 'react-icons/all.js'
import {sortItems} from '../../../../config/sortBtns.js'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import {SortButton} from '../../../../components/common/SortButton/SortButton.jsx'

const EmployeesToolbar = ({setSearch, setSort}) => {
	
	//<editor-fold desc="_STARTERS_">
	const {toggleTableView, tableView} = useContext(ViewContext)
	const [isOpenModal, {setTrue: openModal, setFalse: closeModal}] = useBoolean(false)
	const [isFiltersOpen, {setToggle: toggleFilterBox}] = useBoolean(false)
	const handleChange = e => e.target.value.length >= 2 ? setSearch(e.target.value) : setSearch('')
	const viewIcon = tableView
		? <BsGrid3X3Gap className='icon-btn icon-btn--font icon-bigger'/>
		: <TbList className='icon-btn icon-btn--font icon-bigger'/>
	//</editor-fold>
	
	return (
		<>
			<div className='toolbar-emp__container'>
				<div className='toolbar-emp__container--left'>
					<button className='btn btn-transparent' onClick={toggleTableView}>{viewIcon}</button>
					<form onSubmit={(e) => e.preventDefault()}>
						<input className='input search' type='text' placeholder='🔎  Search' onChange={handleChange}/>
					</form>
					<BsSortUpAlt className='icon-btn icon-btn--font icon-bigger' onClick={toggleFilterBox}/>
				</div>
				{isFiltersOpen &&
					<div className='toolbar-emp__sortBtns-container'>
						{sortItems.map(item => <SortButton inputName={item.value}
						                                   key={item.sort}
						                                   sortName={item.sort}
						                                   setSort={setSort}/>)}
					</div>
				}
				<button className='btn btn-round btn-black' onClick={openModal}>
					<BsPlusLg className='icon-btn icon-btn--font white'/>
				</button>
			</div>
			<Modal modalId='modal'
			       handleClose={closeModal}
			       isOpen={isOpenModal}
			       customBtn={{color: 'var(--FONT-color)'}}
			       customBG={{display: 'flex', flexDirection: 'column'}}>
				<CreateEmployeeForm/>
			</Modal>
		</>
	)
}

export default EmployeesToolbar
