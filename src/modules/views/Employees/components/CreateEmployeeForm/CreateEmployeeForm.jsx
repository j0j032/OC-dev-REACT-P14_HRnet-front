import {useForm} from 'react-hook-form'
import React, {useEffect, useState} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import {capitalize} from '../../../../../utils/formater.js'
import useBoolean from '../../../../../hooks/useBoolean.jsx'
import useModal from '../../../../components/Modal/useModal.jsx'
import {formValidation} from '../../../../../utils/formValidation.js'
import imgPlaceholder from '../../../../../assets/imgPlaceholder.svg'
import {createEmployee} from '../../../../../api/employees/requests.js'
import {countryStates, teams} from '../../../../../config/formAutocomplete.js'
import {UploadPicture} from '../../../../components/common/UploadPicture/UploadPicture'
import {SelectInput} from '../../../../components/common/Inputs/SelectInput.jsx'
import {TextInput} from '../../../../components/common/Inputs/TextInput.jsx'
import Datepicker from '../../../../components/jojos-react-datepicker/Datepicker/Datepicker.jsx'

export const CreateEmployeeForm = () => {
	const [file, setFile] = useState({preview: '', data: {}})
	const queryClient = useQueryClient()
	const {RQ_ExcludeNumbers, RQ_UsDate, RQ_validEmail, RQ_validUsZip, RQ_validUsNumber} = formValidation
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {register, handleSubmit, getValues, setValue, setFocus, reset: resetForm, clearErrors, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'})
	const [isDPBirhtdayShown, {setTrue: showBirthDP, setFalse: hideBirthDP}] = useBoolean(false)
	const [isDPHiredShown, {setTrue: showHiredDP, setFalse: hideHiredDP}] = useBoolean(false)
	const [isOpenModal, {openModal, closeModal}] = useModal(false)
	
	useEffect(() => {
		setFocus('firstname')
	}, [setFocus])
	
	const companyInfo = {
		id: company.id,
		name: company.name,
		logo: company.logo
	}
	
	const getInputValue = (value, name) => {
		setValue(name, value)
		clearErrors(name)
	}
	
	const submit = async data => {
		const employee = JSON.stringify(data)
		const company = JSON.stringify(companyInfo)
		const formData = new FormData()
		formData.append('employee', employee)
		formData.append('company', company)
		if (file.data?.name) formData.append('image', file.data)
		await createEmployee(formData)
		await queryClient.invalidateQueries({queryKey: ['employees'], type: 'active'})
		setFile({preview: '', data: {}})
		resetForm()
	}
	
	return (
		<aside className='create-employee__container'>
			<div className='form-heading'>
				<img onClick={openModal} className='circle-picture' src={file.preview ? file.preview : imgPlaceholder} alt='preview employee picture'/>
				<h2>Create new employee</h2>
			</div>
			<form onSubmit={handleSubmit(submit)} className='create-employee__form'>
				
				{isOpenModal && <UploadPicture file={file} setFile={setFile} isOpen={isOpenModal} close={closeModal}/>}
				
				<div className='scrollable'>
					<div className='form-section'>
						<TextInput inputName='firstname' errors={errors} errorDisplay={errors.firstname} {...register('firstname', RQ_ExcludeNumbers)}/>
						<TextInput inputName='lastname' errors={errors} errorDisplay={errors.lastname} {...register('lastname', RQ_ExcludeNumbers)}/>
						<TextInput inputName='birthdate' errors={errors} errorDisplay={errors.birthdate} {...register('birthdate', RQ_UsDate)} onClick={showBirthDP}
						           onFocus={showBirthDP}/>
						{isDPBirhtdayShown &&
							<Datepicker currentSelectedValue={getValues('birthdate')} RHFinputName={'birthdate'} locale='en' setInputValue={getInputValue} disableFuture={true}
							            hide={hideBirthDP}/>}
					</div>
					
					<div className='form-section'>
						<TextInput inputName='title' errors={errors} errorDisplay={errors.title}{...register('title', RQ_ExcludeNumbers)}/>
						<SelectInput inputName={'department'} {...register('department')} map={teams.map((item) => (<option key={item} value={item}>{capitalize(item)}</option>))}/>
						<TextInput inputName='startDate' errors={errors} errorDisplay={errors.startDate} onClick={showHiredDP}
						           onFocus={showHiredDP} {...register('startDate', RQ_UsDate)}/>
						{isDPHiredShown &&
							<Datepicker currentSelectedValue={getValues('startDate')} RHFinputName={'startDate'} locale='en' setInputValue={getInputValue} hide={hideHiredDP}/>}
					</div>
					
					<div className='form-section'>
						<TextInput type='email' inputName='mail' errors={errors} errorDisplay={errors.mail} {...register('mail', RQ_validEmail)}/>
						<TextInput inputName='phone' errors={errors} errorDisplay={errors.phone} {...register('phone', RQ_validUsNumber)}/>
					</div>
					
					<div className='form-section'>
						<TextInput inputName='street' errors={errors} errorDisplay={errors.street} {...register('street')}/>
						<TextInput inputName='city' errors={errors} errorDisplay={errors.city} {...register('city', RQ_ExcludeNumbers)}/>
						<SelectInput inputName={'state'} {...register('state')}
						             map={countryStates.map(state => (<option key={state.abbreviation} value={state.name}>{state.name}</option>))}/>
						<TextInput inputName='zip' errors={errors} errorDisplay={errors.zip} {...register('zip', RQ_validUsZip)}/>
					</div>
				</div>
				
				<button className='submit-form-btn' disabled={isSubmitting | errors} type='submit'>Create</button>
			</form>
		</aside>
	)
}
