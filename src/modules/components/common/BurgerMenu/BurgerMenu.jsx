export const BurgerMenu = ({state, toggle}) => {
	return (
		<div onClick={toggle} className={!state ? 'icon nav-icon-5' : 'icon nav-icon-5 open'}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	)
}
