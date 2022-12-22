import {capitalize, formatTimestampToDate} from '../../../../../utils/formater.js'
import React from 'react'
import {useQueryClient} from 'react-query'
import {useForm} from 'react-hook-form'
import {TextInput} from '../../../../components/common/Inputs/TextInput.jsx'
import {formValidation} from '../../../../../utils/formValidation.js'
import Datepicker from '../../../../components/jojos-react-datepicker/Datepicker/Datepicker.jsx'
import useBoolean from '../../../../../hooks/useBoolean.jsx'
import {SelectInput} from '../../../../components/common/Inputs/SelectInput.jsx'
import {countryStates, teams} from '../../../../../config/formAutocomplete.js'
import {updateEmployee} from '../../../../../api/employees/requests.js'

export const EditEmployee = ({employee, editMode}) => {
	
	//<editor-fold desc="_STARTERS_">
	const queryClient = useQueryClient()
	const {RQ_ExcludeNumbers, RQ_UsDate, RQ_validEmail, RQ_validUsZip, RQ_validUsNumber} = formValidation
	const {register, handleSubmit, getValues, setValue, clearErrors, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'})
	const [isDPBirhtdayShown, {setTrue: showBirthDP, setFalse: hideBirthDP}] = useBoolean(false)
	const [isDPHiredShown, {setTrue: showHiredDP, setFalse: hideHiredDP}] = useBoolean(false)
	//</editor-fold>
	
	const submit = async (data) => {
		const employeeUpdated = JSON.stringify({_id: employee._id, picture: employee.picture, ...data})
		const formData = new FormData()
		formData.append('employee', employeeUpdated)
		await updateEmployee(formData)
		await queryClient.invalidateQueries({queryKey: ['employees'], type: 'active'})
		await queryClient.invalidateQueries({queryKey: ['employee'], type: 'active'})
		editMode()
	}
	const getInputValue = (value, name) => {
		setValue(name, value)
		clearErrors(name)
	}
	
	return (
		<>
			<form className='edit-employee__form' onSubmit={handleSubmit(submit)}>
				<p>Identity</p>
				<editor-fold desc='_IDENTITY_'>
					<TextInput inputName='firstname'
					           showPlaceholder={true}
					           showRequired={false}
					           defaultValue={employee.firstname}
					           errors={errors}
					           label={false}
					           errorDisplay={errors.firstname}
					           {...register('firstname', RQ_ExcludeNumbers)}
					/>
					<TextInput inputName='lastname'
					           showPlaceholder={true}
					           defaultValue={employee.lastname}
					           errors={errors}
					           label={false}
					           errorDisplay={errors.lastname}
					           {...register('lastname', RQ_ExcludeNumbers)}
					/>
					<TextInput inputName='birthdate'
					           showPlaceholder={true}
					           label={false}
					           defaultValue={formatTimestampToDate(employee.birthdate)}
					           errors={errors}
					           errorDisplay={errors.birthdate}
					           {...register('birthdate', RQ_UsDate)}
					           onClick={showBirthDP}
					           onFocus={showBirthDP}
					/>
					{isDPBirhtdayShown &&
						<Datepicker currentSelectedValue={getValues('birthdate')}
						            RHFinputName='birthdate'
						            locale='en'
						            setInputValue={getInputValue}
						            disableFuture={true}
						            hide={hideBirthDP}
						/>
					}
				</editor-fold>
				<p>Job</p>
				<editor-fold desc='_JOB_'>
					<TextInput inputName='title'
					           showPlaceholder={true}
					           showRequired={false}
					           defaultValue={employee.title}
					           errors={errors}
					           label={false}
					           errorDisplay={errors.title}
					           {...register('title', RQ_ExcludeNumbers)}
					/>
					<SelectInput inputName='department'
					             defaultValue={employee.department}
					             label={false}
					             {...register('department')}
					             map={teams.map((item) => (<option key={item} value={item}>{capitalize(item)}</option>))}
					/>
					<TextInput specifyLabel='Hired'
					           label={false}
					           inputName='startDate'
					           showPlaceholder={true}
					           showRequired={false}
					           defaultValue={formatTimestampToDate(employee.hired)}
					           errors={errors}
					           errorDisplay={errors.startDate}
					           onClick={showHiredDP}
					           onFocus={showHiredDP}
					           {...register('startDate', RQ_UsDate)}
					/>
					{isDPHiredShown &&
						<Datepicker currentSelectedValue={getValues('startDate')}
						            RHFinputName={'startDate'}
						            locale='en'
						            setInputValue={getInputValue}
						            hide={hideHiredDP}
						/>
					}
				</editor-fold>
				<p>Contact</p>
				<editor-fold desc='_CONTACTS_'>
					<TextInput type='email'
					           label={false}
					           showPlaceholder={true}
					           showRequired={false}
					           inputName='mail'
					           defaultValue={employee.contact.mail}
					           errors={errors}
					           errorDisplay={errors.mail}
					           {...register('mail', RQ_validEmail)}
					/>
					<TextInput inputName='phone'
					           showPlaceholder={true}
					           defaultValue={employee.contact.phone}
					           errors={errors}
					           label={false}
					           errorDisplay={errors.phone}
					           {...register('phone', RQ_validUsNumber)}
					/>
				</editor-fold>
				<p>Address</p>
				<editor-fold desc='_ADDRESS_'>
					<TextInput inputName='street'
					           showPlaceholder={true}
					           showRequired={false}
					           label={false}
					           defaultValue={employee.address.street}
					           errors={errors}
					           errorDisplay={errors.street}
					           {...register('street')}
					/>
					<TextInput inputName='city'
					           showPlaceholder={true}
					           defaultValue={employee.address.city}
					           errors={errors}
					           label={false}
					           errorDisplay={errors.city}
					           {...register('city', RQ_ExcludeNumbers)}
					/>
					<SelectInput inputName={'state'}
					             defaultValue={employee.address.state}
					             label={false}
					             {...register('state')}
					             map={countryStates.map(state => (<option key={state.abbreviation} value={state.name}>{state.name}</option>))}
					/>
					<TextInput inputName='zip'
					           showPlaceholder={true}
					           defaultValue={employee.address.zip}
					           errors={errors} label={false}
					           errorDisplay={errors.zip}
					           {...register('zip', RQ_validUsZip)}
					/>
				</editor-fold>
				<button className='form-btn edit-employee__btn' disabled={isSubmitting | errors} type='submit'>Update</button>
			</form>
		</>
	)
}
