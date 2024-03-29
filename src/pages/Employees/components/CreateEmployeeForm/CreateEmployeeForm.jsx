import {useForm} from 'react-hook-form'
import React, {useEffect, useState} from 'react'
import {capitalize} from '../../../../utils/formater.js'
import useBoolean from '../../../../hooks/useBoolean.jsx'
import {formValidation} from '../../../../utils/formValidation.js'
import imgPlaceholder from '../../../../assets/imgPlaceholder.webp'
import {countryStates, teams} from '../../../../config/selectInputs.js'
import {UploadPicture} from '../../../../components/common/UploadPicture/UploadPicture.jsx'
import {SelectInput} from '../../../../components/common/Inputs/SelectInput.jsx'
import {TextInput} from '../../../../components/common/Inputs/TextInput.jsx'
import {Datepicker} from 'basic-datepicker-react'
import {useCreateEmployee} from '../../../../api/employees.js'
import {useGetUserInfos} from '../../../../api/user.js'
import {Toast} from '../../../../components/common/Toast/Toast'
import useNotification from '../../../../hooks/useNotification.jsx'

export const CreateEmployeeForm = () => {
	
	//<editor-fold desc="_STARTERS_">
	const storedTheme = localStorage.getItem('theme')
	const [file, setFile] = useState({preview: '', data: {}})
	const {RQ_ExcludeNumbers, RQ_UsDate, RQ_validEmail, RQ_validUsZip, RQ_validUsNumber, RQ_only} = formValidation
	const {
		register, handleSubmit, getValues, setValue, setFocus, reset: resetForm, clearErrors, formState: {
			errors,
			isSubmitting
		}
	} = useForm({criteriaMode: 'all'})
	const [isDPBirhtdayShown, {setTrue: showBirthDP, setFalse: hideBirthDP}] = useBoolean(false)
	const [isDPHiredShown, {setTrue: showHiredDP, setFalse: hideHiredDP}] = useBoolean(false)
	const [isOpenModal, {setTrue: openModal, setFalse: closeModal}] = useBoolean(false)
	const {company} = useGetUserInfos()
	const {mutate, isError: creationFailed, isLoading: isCreating} = useCreateEmployee()
	//</editor-fold>
	
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
		await mutate(formData)
		setFile({preview: '', data: {}})
		resetForm()
	}
	
	
	const notifCreationSuccess = useNotification(isCreating, 3000)
	const notifCreationFailed = useNotification(creationFailed, 3000)
	
	return (
		<aside className='create-employee__container'>
			{notifCreationSuccess && <Toast type='success' message='Employee Created'/>}
			{notifCreationFailed && <Toast type='error' message='sorry, an error has occured'/>}
			<div className='form-heading'>
				<img onClick={openModal} className='profile-picture picture-m' src={file.preview ? file.preview : imgPlaceholder} alt='preview employee picture'/>
				<h2>Create new employee</h2>
			</div>
			<form onSubmit={handleSubmit(submit)} className='create-employee__form'>
				{isOpenModal && <UploadPicture file={file} setFile={setFile} isOpen={isOpenModal} close={closeModal}/>}
				<div className='scrollable'>
					<editor-fold desc='IDENTITY'>
						<div className='form-section'>
							<TextInput inputName='firstname'
							           errors={errors}
							           errorDisplay={errors.firstname}
							           {...register('firstname', RQ_ExcludeNumbers)}
							/>
							<TextInput inputName='lastname'
							           errors={errors}
							           errorDisplay={errors.lastname}
							           {...register('lastname', RQ_ExcludeNumbers)}
							/>
							<TextInput inputName='birthdate'
							           errors={errors}
							           errorDisplay={errors.birthdate}
							           {...register('birthdate', RQ_UsDate)}
							           onClick={showBirthDP}
							           onFocus={showBirthDP}/>
							{isDPBirhtdayShown &&
								<Datepicker currentSelectedValue={getValues('birthdate')}
								            RHFinputName='birthdate'
								            locale='en'
								            theme={storedTheme === 'dark' ? 'dark' : 'light'}
								            setInputValue={getInputValue}
								            disableFuture={true}
								            hide={hideBirthDP}
								/>
							}
						</div>
					</editor-fold>
					<editor-fold desc='JOB'>
						<div className='form-section'>
							<TextInput inputName='title'
							           errors={errors}
							           errorDisplay={errors.title}
							           {...register('title', RQ_ExcludeNumbers)}
							/>
							<SelectInput inputName={'department'}
							             {...register('department')}
							             map={teams.map(item => <option key={item} value={item}>{capitalize(item)}</option>)}
							/>
							<TextInput inputName='startDate'
							           specifyLabel='Hired'
							           errors={errors}
							           errorDisplay={errors.startDate}
							           onClick={showHiredDP}
							           onFocus={showHiredDP}
							           {...register('startDate', RQ_UsDate)}/>
							{isDPHiredShown &&
								<Datepicker currentSelectedValue={getValues('startDate')}
								            RHFinputName='startDate'
								            theme={storedTheme === 'dark' ? 'dark' : 'light'}
								            locale='en'
								            setInputValue={getInputValue}
								            hide={hideHiredDP}
								/>
							}
						</div>
					</editor-fold>
					<editor-fold desc='CONTACT'>
						<div className='form-section'>
							<TextInput type='email'
							           inputName='mail'
							           errors={errors}
							           errorDisplay={errors.mail}
							           {...register('mail', RQ_validEmail)}
							/>
							<TextInput inputName='phone'
							           errors={errors}
							           errorDisplay={errors.phone}
							           {...register('phone', RQ_validUsNumber)}
							/>
						</div>
					</editor-fold>
					<editor-fold desc='ADDRESS'>
						<div className='form-section'>
							<TextInput inputName='street'
							           errors={errors}
							           errorDisplay={errors.street}
							           {...register('street', RQ_only)}
							/>
							<TextInput inputName='city'
							           errors={errors}
							           errorDisplay={errors.city}
							           {...register('city', RQ_ExcludeNumbers)}
							/>
							<SelectInput inputName={'state'}
							             {...register('state')}
							             map={countryStates.map(state => (<option key={state.abbreviation} value={state.name}>{state.name}</option>))}
							/>
							<TextInput inputName='zip'
							           errors={errors}
							           errorDisplay={errors.zip}
							           {...register('zip', RQ_validUsZip)}
							/>
						</div>
					</editor-fold>
				</div>
				<button className='form-btn align-right' disabled={isSubmitting | errors} type='submit'>Create</button>
			</form>
		</aside>
	)
}
