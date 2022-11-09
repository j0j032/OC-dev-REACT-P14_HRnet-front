import {useQuery} from 'react-query'
import provisoryImg from '../../../../assets/img/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg'

export const ProfileHeader = () => {
	const {data} = useQuery(['login'], {enabled: false})
	const {userInfos} = data
	return (
		<div className='profile-header'>
			<img src={provisoryImg} alt={`Profile picture of ${userInfos.firstname}`}/>
			<div>
				<h1>{userInfos.firstname}</h1>
				<p>{userInfos.title}</p>
			</div>
		</div>
	)
}
