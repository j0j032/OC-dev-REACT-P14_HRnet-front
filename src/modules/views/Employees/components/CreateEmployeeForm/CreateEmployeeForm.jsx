import {useForm} from 'react-hook-form'
import {countryStates, teams} from '../../../../../config/formAutocomplete.js'
import {ErrorMessage} from '@hookform/error-message'
import {useQuery, useQueryClient} from 'react-query'
import {useState} from 'react'
import {sendEmployee} from '../../../../../api/employees/requests.js'
import {capitalize} from '../../../../../utils/formater.js'
import {formValidation} from '../../../../../utils/formValidation.js'

export const CreateEmployeeForm = () => {
	const {isNotIncludingNumbers, isValidEmail, isValidUsNumber, isValidUsZip} = formValidation
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {register, handleSubmit, getValues, reset: resetForm, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'})
	const [picture, setPicture] = useState()
	const queryClient = useQueryClient()
	
	const companyInfo = {
		id: company.id,
		name: company.name,
		logo: company.logo
	}
	
	const pictureSelected = e => {
		const file = e.target.files[0]
		console.log(file)
		setPicture(file)
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
			<h1><span>Create</span> new employee</h1>
			<form onSubmit={handleSubmit(submit)} className='create-employee__form'>
				<h4>Identity</h4>
				<section className='input__wrapper create-employee__inputs-section'>
					<div className='create-employee__inputs-wrapper--inline'>
						{requiredTextInput('text', 'firstname', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.firstname)}
						{requiredTextInput('text', 'lastname', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.lastname)}
						
						<div className='input__wrapper create-employee__input-wrapper'>
							<label className='input-label' htmlFor='birthdate'>Birthdate<span> *</span></label>
							<input type='date'{...register('birthdate', {required: true})}/>
							{errors.birthdate && <span>* This field is required</span>}
						</div>
					
					
					</div>
					
					<input onChange={pictureSelected} type='file' accept='image/*'/>
				</section>
				
				<h4>Job</h4>
				<section className='input__wrapper create-employee__inputs-section'>
					<div className='create-employee__inputs-wrapper--inline'>
						{requiredTextInput('text', 'title', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.title)}
						{selectInput('department', teams.map((item) => (
							<option key={item} value={item}>{capitalize(item)}</option>
						)))}
						
						<div className='input__wrapper create-employee__input-wrapper'>
							<label className='input-label' htmlFor='startDate'>Start Date<span> *</span></label>
							<input type='date'{...register('startDate', {required: true})}/>
							{errors.startDate && <span>* This field is required</span>}
						</div>
					</div>
				</section>
				
				<h4>Contact</h4>
				<section className='input__wrapper create-employee__inputs-section'>
					<div className='create-employee__inputs-wrapper--inline--2'>
						{requiredTextInput('email', 'mail', isValidEmail.regex, isValidEmail.msg, errors.mail)}
						{requiredTextInput('text', 'phone', isValidUsNumber.regex, isValidUsNumber.msg, errors.phone)}
					</div>
					{requiredTextInput('text', 'street', null, null, errors.street)}
					<div className='create-employee__inputs-wrapper--inline'>
						{requiredTextInput('text', 'city', isNotIncludingNumbers.regex, isNotIncludingNumbers.msg, errors.city)}
						{selectInput('state', countryStates.map(state => (
							<option key={state.abbreviation} value={state.name}>{state.name}</option>
						)))}
						{requiredTextInput('text', 'zip', isValidUsZip.regex, isValidUsZip.msg, errors.zip)}
					</div>
				</section>
				<input disabled={isSubmitting} type='submit'/>
			</form>
		</aside>
	)
}
