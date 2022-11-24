import Button from '../../../../components/common/Button/Button.jsx'
import {useForm} from 'react-hook-form'
import {ProfilePicDropzone} from '../../../../components/common/ProfilePicDropzone/ProfilePicDropzone'
import {countryStates, getStateAbbreviation, teams} from '../../../../../config/formAutocomplete.js'
import {useQuery} from 'react-query'
import {useCreateEmployee} from '../../../../../api/employees/useCreateEmployee.js'
import {capitalize, formatPhoneNumber, formatToLocale} from '../../../../../utils/formater.js'
import useNotification from '../../../../../hooks/useNotification.jsx'
import {Toast} from '../../../../components/common/Toast/Toast'

export const CreateEmployeeForm = () => {
	const {register, handleSubmit, getValues, reset, formState: {errors, isSubmitting}} = useForm()
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	
	const {refetch, isSuccess, isError} = useCreateEmployee({
		firstname: capitalize(getValues('firstname')),
		lastname: capitalize(getValues('lastname')),
		birthdate: formatToLocale(getValues('birthdate'), 'en-US'),
		title: capitalize(getValues('title')),
		department: getValues('department'),
		hired: formatToLocale(getValues('startDate'), 'en-US'),
		contact: {
			mail: getValues('mail'),
			phone: formatPhoneNumber(getValues('phone'))
		},
		address: {
			street: getValues('street'),
			city: capitalize(getValues('city')),
			state: getStateAbbreviation(getValues('state')),
			zip: getValues('zip')
		},
		company: {
			id: company.id,
			name: company.name,
			logo: company.logo
		}
	}, {enabled: false})
	
	const submit = () => {
		refetch()
		reset()
		console.log('success')
	}
	
	const notifSuccess = useNotification(isSuccess, 3000)
	const notifError = useNotification(isError, 3000)
	
	return (
		<aside className='create-employee__container'>
			<h1><span>Create</span> new employee</h1>
			{notifSuccess && <Toast type='success' message='✨ New Employee Created !'/>}
			{notifError && <Toast type='error' message='✨ Oups! an error has occurred'/>}
			
			<form onSubmit={handleSubmit(submit)} className='create-employee__form'>
				
				<h4>Identity</h4>
				<section className='input__wrapper create-employee__inputs-section'>
					<div className='create-employee__inputs-wrapper--inline'>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='firstname'>Firstname</label>
							<input type='text' {...register('firstname', {required: true})}/>
							{errors.firstname && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='lastname'>Lastname</label>
							<input type='text' {...register('lastname', {required: true})}/>
							{errors.lastname && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='birthdate'>Birthdate</label>
							<input type='date'{...register('birthdate', {required: true})}/>
							{errors.birthdate && <span>* This field is required</span>}
						</div>
					</div>
					<ProfilePicDropzone/>
				</section>
				
				<h4>Job</h4>
				<section className='input__wrapper create-employee__inputs-section'>
					<div className='create-employee__inputs-wrapper--inline'>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='title'>Title</label>
							<input type='text' {...register('title', {required: true})}/>
							{errors.title && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='department'>Department</label>
							<select {...register('department', {required: true})}>
								{teams.map(team => (
									<option key={team} value={team}>{team}</option>
								))}
							</select>
							{errors.department && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='startDate'>Start Date</label>
							<input type='date'{...register('startDate', {required: true})}/>
							{errors.startDate && <span>* This field is required</span>}
						</div>
					</div>
				</section>
				
				<h4>Contact</h4>
				<section className='input__wrapper create-employee__inputs-section'>
					<div className='create-employee__inputs-wrapper--inline--2'>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='mail'>Email</label>
							<input type='email' {...register('mail', {required: true})}/>
							{errors.mail && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='phone'>Phone</label>
							<input type='tel' {...register('phone', {required: true})}/>
							{errors.phone && <span>* This field is required</span>}
						</div>
					</div>
					<div className='input__wrapper create-employee__input-wrapper street'>
						<label htmlFor='street'>Street</label>
						<input type='text' {...register('street', {required: true})}/>
						{errors.street && <span>* This field is required</span>}
					</div>
					<div className='create-employee__inputs-wrapper--inline'>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='city'>City</label>
							<input type='text' {...register('city', {required: true})}/>
							{errors.city && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='state'>State</label>
							<select {...register('state', {required: true})}>
								{countryStates.map(state => (
									<option key={state.abbreviation} value={state.name}>{state.name}</option>
								))}
							</select>
							{errors.state && <span>* This field is required</span>}
						</div>
						<div className='input__wrapper create-employee__input-wrapper'>
							<label htmlFor='zip'>Zip</label>
							<input type='text'{...register('zip', {required: true})}/>
							{errors.zip && <span>* This field is required</span>}
						</div>
					</div>
				</section>
				<Button disabled={isSubmitting} custom='btn--large login__btn'>Create</Button>
			</form>
		</aside>
	)
}
