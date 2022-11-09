import {LoginForm} from './LoginForm'

export const Login = () => {
	console.log('render')
	
	return (
		<main className='login__background'>
			<section className='login__container'>
				<div className='login__heading'>
					<img src='public/assets/Hrnet.so-favicon.png' alt='logo Hr net'/>
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
