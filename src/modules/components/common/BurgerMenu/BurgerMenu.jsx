export const BurgerMenu = ({state, toggle}) => {
	return (
		<div onClick={toggle} className={!state ? 'bar nav-bar-5' : 'bar nav-bar-5 open'}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	)
}
