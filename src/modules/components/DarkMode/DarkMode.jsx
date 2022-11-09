import './DarkMode.scss'

export const DarkMode = () => {
	return (
		<>
			<input type='checkbox' id='dark-mode-toggle'/>
			<label className='dark-mode-toggle' htmlFor='dark-mode-toggle'>
				<p>🌞</p>
				<p>🌒</p>
			</label>
		</>
	)
}
