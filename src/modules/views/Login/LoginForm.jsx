import {Button} from '../../components/Button/Button.jsx'
import {useForm} from 'react-hook-form'
import useBoolean from '../../../hooks/useBoolean.jsx'
import {useLogin} from '../../../api/useLogin.js'


// Elisabeth
// Aa$12345


export const LoginForm = () => {
	const [rememberSwitch, {setToggle: toggleRemember}] = useBoolean(false)
	const {register, handleSubmit, getValues, formState: {errors, isSubmitting}} = useForm()
	const {refetch} = useLogin({user: getValues('user'), pwd: getValues('pwd')}, {enabled: false})
	
	const isChecked = rememberSwitch ? 'isChecked' : null
	
	return (
		<form onSubmit={handleSubmit(refetch)}>
			<div className='input__wrapper'>
				<label htmlFor='user'>Username</label>
				<input {...register('user', {required: true})}/>
				{errors.username && <span>* This field is required</span>}
			</div>
			
			<div className='input__wrapper'>
				<label htmlFor='pwd'>Password</label>
				<input type='password' {...register('pwd', {required: true})}/>
				{errors.password && <span>* This field is required</span>}
			</div>
			
			<div className='input__options'>
				<div className='input__checkbox'>
					<input onClick={toggleRemember}
					       defaultChecked={rememberSwitch}
					       type='checkbox'
					       id='remember-me'/>
					<label htmlFor='remember-me' className={isChecked}>Remember me</label>
				</div>
				<a className='forgot-pwd'>Forgot password ?</a>
			</div>
			<Button disabled={isSubmitting} custom='btn--large login__btn'>Log in</Button>
		</form>
	)
}
