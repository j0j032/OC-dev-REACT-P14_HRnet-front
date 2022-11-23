import Button from '../../../../components/common/Button/Button.jsx'
import {useForm} from 'react-hook-form'

export const CreateEmployeeForm = () => {
	const {register, handleSubmit, getValues, formState: {errors, isSubmitting}} = useForm()
	
	const handleForm = () => {
		console.log({
			firstname: getValues('firstname'),
			lastname: getValues('lastname'),
			file: getValues('file')
		})
	}
	return (
		<aside className='create-employee__container'>
			<h1><span>Create</span> new employee</h1>
			<form onSubmit={handleSubmit(handleForm)} className='create-employee__form'>
				<h4>Identity</h4>
				<section className='input__wrapper create-employee__inputs-wrapper'>
					
					<div className='create-employee__inputs-wrapper--identity'>
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
					<div>
						<input type='file' {...register('file', {required: true})}/>
					</div>
				</section>
				<Button disabled={isSubmitting} custom='btn--large login__btn'>Create</Button>
			</form>
		</aside>
	)
}
