import {LoginForm} from './LoginForm'
import logo from '../../../assets/logos/Hrnet.so-Circle-white.png'

export const Login = () => {
	
	return (
		<main className='login__background'>
			<section className='login__container'>
				<div className='login__heading'>
					<img src={logo} alt='logo Hr net'/>
					<h1>Hello again !</h1>
					<p>Login and get your amazing tools for you and your team !</p>
				</div>
				<LoginForm/>
				<div className='login__links'>
					<a href=''>First time login ?</a>
					<a href=''>Help ?</a>
				</div>
			</section>
		</main>
	)
}
