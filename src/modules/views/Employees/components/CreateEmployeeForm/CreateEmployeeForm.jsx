import {useForm} from 'react-hook-form'
import {countryStates, teams} from '../../../../../config/formAutocomplete.js'
import {ErrorMessage} from '@hookform/error-message'
import {useQuery, useQueryClient} from 'react-query'
import {useEffect, useState} from 'react'
import {sendEmployee} from '../../../../../api/employees/requests.js'
import {capitalize} from '../../../../../utils/formater.js'
import {formValidation} from '../../../../../utils/formValidation.js'
import Datepicker from '../../../../components/jojos-react-datepicker/Datepicker/Datepicker.jsx'
import useBoolean from '../../../../../hooks/useBoolean.jsx'
import imgPlaceholder from '../../../../../assets/imgPlaceholder.svg'


export const CreateEmployeeForm = () => {
	const [filePreview, setFilePreview] = useState()
	const {isNotIncludingNumbers, isValidEmail, isValidUsNumber, isValidUsZip, isValidUsDate} = formValidation
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {register, handleSubmit, getValues, setValue, setFocus, reset: resetForm, clearErrors, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'})
	const [picture, setPicture] = useState()
	const queryClient = useQueryClient()
	const [isDPBirhtdayShown, {setTrue: showBirthDP, setFalse: hideBirthDP}] = useBoolean(false)
	const [isDPHiredShown, {setTrue: showHiredDP, setFalse: hideHiredDP}] = useBoolean(false)
	const [isUpdatePPicOpen, {setToggle}] = useBoolean(false)
	
	useEffect(() => {
		setFocus('firstname')
	}, [setFocus])
	
	const companyInfo = {
		id: company.id,
		name: company.name,
		logo: company.logo
	}
	
	const pictureSelected = e => {
		const file = e.target.files[0]
		console.log(file)
		setPicture(file)
		setFilePreview(URL.createObjectURL(file))
	}
	
	const submit = async data => {
		const employee = JSON.stringify(data)
		const company = JSON.stringify(companyInfo)
		const formData = new FormData()
		formData.append('employee', employee)
		formData.append('company', company)
		formData.append('image', picture)
		await sendEmployee(formData)
		await queryClient.invalidateQueries({queryKey: ['employees'], type: 'active'})
		resetForm()
	}
	
	const displayError = (name) => {
		return <ErrorMessage errors={errors} name={name} render={({messages}) =>
			messages && Object.entries(messages).map(([type, message]) => (
				<p className='form-error' key={type}>{message}</p>
			))
		}
		/>
	}
	
	const requiredTextInput = (type, name, regex, specificErrorMsg, errorDisplay) => {
		return (
			<div className='input__wrapper create-employee__input-wrapper'>
				<label className='input-label' htmlFor={name}>{capitalize(name)}<span> *</span></label>
				<input className={errorDisplay && 'input-error'} type={type} {...register(name, {
					required: 'This field is required',
					pattern: {
						value: regex,
						message: specificErrorMsg
					}
				})}/>
				{errorDisplay ? displayError(name) : <div className='form-error--false'></div>}
			</div>
		)
	}
	
	
	const requiredDateInput = (type, name, regex, specificErrorMsg, errorDisplay, hide, isShown, show) => {
		const getInputValue = (value, name) => {
			setValue(name, value)
			clearErrors(name)
		}
		return (
			<div className='input__wrapper create-employee__input-wrapper'>
				<label className='input-label' htmlFor={name}>{capitalize(name)}<span> *</span></label>
				<input onClick={show} onFocus={show} className={errorDisplay && 'input-error'} type={type} {...register(name, {
					required: 'This field is required',
					pattern: {
						value: regex,
						message: specificErrorMsg
					}
				})}/>
				{errorDisplay ? displayError(name) : <div className='form-error--false'></div>}
				{isShown ? <Datepicker currentSelectedValue={getValues(name)} RHFinputName={name} locale='en'
				                       setInputValue={getInputValue} disableFuture={true} hide={hide}
				/> : null}
			</div>
		)
	}
	
	const selectInput = (name, cb) => {
		return (
			<div className='input__wrapper create-employee__input-wrapper'>
				<label className='input-label' htmlFor={name}>{capitalize(name)}</label>
				<select {...register(name)}>{cb}</select>
				<div className='form-error--false'></div>
			</div>
		)
	}
	
	
	return (
		<aside className='create-employee__container'>
			<div className='form-heading'>
				<img onClick={setToggle} className='circle-picture' src={filePreview ? filePreview : imgPlaceholder} alt='preview employee picture'/>
				<h2>Create new employee</h2>
			</div>
			<form onSubmit={handleSubmit(submit)} className='create-employee__form'>
				{isUpdatePPicOpen &&
					<div className='upload-pic'>
						<input onChange={pictureSelected} type='file' accept='image/*' required/>
					</div>
				}
				<div className='scrollable'>
					<div className='form-section'>
						{requiredTextInput('text', 'firstname', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.firstname)}
						{requiredTextInput('text', 'lastname', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.lastname)}
						{requiredDateInput('text', 'birthdate', isValidUsDate.regex, isValidUsDate.msg, errors.birthdate, hideBirthDP, isDPBirhtdayShown, showBirthDP)}
					</div>
					<div className='form-section'>
						{requiredTextInput('text', 'title', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.title)}
						{selectInput('department', teams.map((item) => (
							<option key={item} value={item}>{capitalize(item)}</option>
						)))}
						{requiredDateInput('text', 'startDate', isValidUsDate.regex, isValidUsDate.msg, errors.startDate, hideHiredDP, isDPHiredShown, showHiredDP)}
					</div>
					<div className='form-section'>
						{requiredTextInput('email', 'mail', isValidEmail.regex, isValidEmail.msg, errors.mail)}
						{requiredTextInput('text', 'phone', isValidUsNumber.regex, isValidUsNumber.msg, errors.phone)}
					</div>
					<div className='form-section'>
						{requiredTextInput('text', 'street', null, null, errors.street)}
						{requiredTextInput('text', 'city', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.city)}
						{selectInput('state', countryStates.map(state => (
							<option key={state.abbreviation} value={state.name}>{state.name}</option>
						)))}
						{requiredTextInput('text', 'zip', isValidUsZip.regex, isValidUsZip.msg, errors.zip)}
					</div>
				</div>
				<button className='submit-form-btn' disabled={isSubmitting | errors} type='submit'>Create</button>
			</form>
		</aside>
	)
}
