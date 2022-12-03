import imgPlaceholder from '../../../../../assets/imgPlaceholder.svg'
import {formatToLocale} from '../../../../../utils/formater.js'
import React from 'react'
import {useQuery} from 'react-query'
import {useForm} from 'react-hook-form'
import {TextInput} from '../../../../components/common/Inputs/TextInput.jsx'
import {formValidation} from '../../../../../utils/formValidation.js'

export const EditEmployee = ({data}) => {
	const {data: user} = useQuery(['login'], {enabled: false}), {userInfos} = user, {company} = userInfos
	const {register, handleSubmit, getValues, setValue, setFocus, reset: resetForm, clearErrors, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'})
	
	const submit = () => {
		console.log(getValues('firstname'))
		console.log(getValues('lastname'))
	}
	
	return (
		<form className='employee-details__infos' onSubmit={handleSubmit(submit)}>
			
			<TextInput inputName='lastname' defaultValue={data.lastname} errors={errors} label={false} errorDisplay={errors.lastname}
			           {...register('lastname', formValidation.RQ_ExcludeNumbers)}/>
			<TextInput inputName='firstname' defaultValue={data.firstname} errors={errors} label={false} errorDisplay={errors.firstname}
			           {...register('firstname', formValidation.RQ_ExcludeNumbers)}/>
			
			{/*<div className='employee-details__heading'>
				<div className='employee-details__names'>
					<input type='text' defaultValue={data.firstname} {...register('firstname')}/>
				
				</div>
				<p> {`Joined ${company.name} : ${formatToLocale(data.hired, 'en-US')}`}</p>
			</div>
			<h3> 💼 {data.title}</h3>
			<p> 👫 {data.department} team</p>
			<div className='employee-details__personal'>
				<h3>Personal details:</h3>
				<p>🎂 {formatToLocale(data.birthdate, 'en-US')}</p>
				<p>📱 {data.contact.phone}</p>
				<p>✉️ {data.contact.mail}</p>
				<p>📫 Address:</p>
				<p>{data.address.street}</p>
				<p>{`${data.address.city} ${data.address.state} ${data.address.zip}`}</p>
			</div>*/}
			<button className='submit-form-btn abso' disabled={isSubmitting | errors} type='submit'>Create</button>
		</form>
	)
}
