import {TextInput} from '../../components/common/Inputs/TextInput.jsx'
import React from 'react'
import {useForm} from 'react-hook-form'
import {useLogin} from '../../../api/user/useLogin.js'
import {formValidation} from '../../../utils/formValidation.js'

export const Login = () => {
	
	const {register, handleSubmit, getValues, formState: {errors, isSubmitting}} = useForm()
	const {refetch} = useLogin({user: getValues('username'), pwd: getValues('password')}, {enabled: false})
	const {RQ_only} = formValidation
	
	return (
		<main className='login__background'>
			<section className='login__container'>
				<h1>Hello again !</h1>
				<form className='login-form' onSubmit={handleSubmit(refetch)}>
					<TextInput inputName='username' errors={errors} errorDisplay={errors.username} {...register('username', RQ_only)}/>
					<TextInput inputName='password' type='password' errors={errors} errorDisplay={errors.password} {...register('password', RQ_only)}/>
					<button disabled={isSubmitting} className='form-btn align-right'>Login</button>
				</form>
			</section>
		</main>
	)
}
