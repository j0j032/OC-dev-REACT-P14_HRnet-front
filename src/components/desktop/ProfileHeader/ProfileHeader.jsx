import useWindowSize from '../../../hooks/useWindowSize.jsx'
import {smallerScreenNavConfig} from '../../../config/breakPoints.js'
import imgPlaceholder from '../../../assets/imgPlaceholder.webp'
import {mockUser} from '../../../api/mockUser.js'

export const ProfileHeader = () => {
	const windowSize = useWindowSize()
	const data = mockUser
	
	return (
		<div className='profile-header'>
			<img
				className='profile-picture picture-s toggle-user-menu'
				src={data.picture ? data.picture : imgPlaceholder}
				alt={`Profile picture of ${data.firstname}`}/>
			{windowSize.width > smallerScreenNavConfig ?
				<div>
					<div>
						<h1>{data.firstname}</h1>
					</div>
					<p>{data.title}</p>
				</div>
				: null}
		</div>
	)
}
