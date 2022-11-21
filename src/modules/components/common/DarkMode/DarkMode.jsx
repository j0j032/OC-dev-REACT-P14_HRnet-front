import './DarkMode.scss'

export const DarkMode = () => {
	
	const setDark = () => {
		localStorage.setItem('theme', 'dark')
		document.documentElement.setAttribute('data-theme', 'dark')
	}
	
	const setLight = () => {
		localStorage.setItem('theme', 'light')
		document.documentElement.setAttribute('data-theme', 'light')
	}
	
	const storedTheme = localStorage.getItem('theme')
	
	const prefersDark =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	
	const defaultDark =
		storedTheme === 'dark' || (storedTheme === null && prefersDark)
	
	if (defaultDark) {
		setDark()
	}
	
	const toggleTheme = (e) => {
		if (e.target.checked) {
			setDark()
		} else {
			setLight()
		}
	}
	
	return (
		<>
			<input type='checkbox' id='dark-mode-toggle' onChange={toggleTheme} defaultChecked={defaultDark}/>
			<label className='dark-mode-toggle' htmlFor='dark-mode-toggle'>
				<p>🌞</p>
				<p>🌒</p>
			</label>
		</>
	)
}
