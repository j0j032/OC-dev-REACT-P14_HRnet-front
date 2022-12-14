import {capitalize} from '../../../../../utils/formater.js'
import React from 'react'
import {useQuery, useQueryClient} from 'react-query'
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
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {register, handleSubmit, getValues, setValue, setFocus, reset: resetForm, clearErrors, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'})
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
		<form className='employee-details__infos' onSubmit={handleSubmit(submit)}>
			
			<TextInput inputName='firstname' defaultValue={employee.firstname} errors={errors} label={false} errorDisplay={errors.firstname}
			           {...register('firstname', RQ_ExcludeNumbers)}/>
			<TextInput inputName='lastname' defaultValue={employee.lastname} errors={errors} label={false} errorDisplay={errors.lastname}
			           {...register('lastname', RQ_ExcludeNumbers)}/>
			<TextInput inputName='birthdate' defaultValue={employee.birthdate} errors={errors} errorDisplay={errors.birthdate} label={false}
			           {...register('birthdate', RQ_UsDate)} onClick={showBirthDP} onFocus={showBirthDP}/>
			{isDPBirhtdayShown &&
				<Datepicker currentSelectedValue={getValues('birthdate')} RHFinputName={'birthdate'} locale='en' setInputValue={getInputValue} disableFuture={true}
				            hide={hideBirthDP}/>}
			
			<TextInput inputName='title' defaultValue={employee.title} errors={errors} label={false} errorDisplay={errors.title}{...register('title', RQ_ExcludeNumbers)}/>
			<SelectInput inputName={'department'} defaultValue={employee.department} label={false} {...register('department')}
			             map={teams.map((item) => (<option key={item} value={item}>{capitalize(item)}</option>))}/>
			<TextInput inputName='startDate' defaultValue={employee.hired} label={false} errors={errors} errorDisplay={errors.startDate} onClick={showHiredDP}
			           onFocus={showHiredDP} {...register('startDate', RQ_UsDate)}/>
			{isDPHiredShown &&
				<Datepicker currentSelectedValue={getValues('startDate')} RHFinputName={'startDate'} locale='en' setInputValue={getInputValue} hide={hideHiredDP}/>}
			
			<TextInput type='email' inputName='mail' defaultValue={employee.contact.mail} errors={errors} label={false}
			           errorDisplay={errors.mail} {...register('mail', RQ_validEmail)}/>
			<TextInput inputName='phone' defaultValue={employee.contact.phone} errors={errors} label={false}
			           errorDisplay={errors.phone} {...register('phone', RQ_validUsNumber)}/>
			
			<TextInput inputName='street' defaultValue={employee.address.street} errors={errors} label={false} errorDisplay={errors.street} {...register('street')}/>
			<TextInput inputName='city' defaultValue={employee.address.city} errors={errors} label={false} errorDisplay={errors.city} {...register('city', RQ_ExcludeNumbers)}/>
			<SelectInput inputName={'state'} defaultValue={employee.address.state} label={false}  {...register('state')}
			             map={countryStates.map(state => (<option key={state.abbreviation} value={state.name}>{state.name}</option>))}/>
			<TextInput inputName='zip' defaultValue={employee.address.zip} errors={errors} label={false} errorDisplay={errors.zip} {...register('zip', RQ_validUsZip)}/>
			<button className='form-btn abso' disabled={isSubmitting | errors} type='submit'>Update</button>
		</form>
	)
}
