import {Link} from './Link.jsx'
import {
	BiNetworkChart,
	BsPeople,
	GoCalendar, HiOutlineChartBarSquare,
	HiOutlineChatBubbleBottomCenterText,
	HiOutlineInboxArrowDown,
	IoIosPeople,
	TbArrowBearLeft2,
	TbBriefcase,
	VscDashboard
} from 'react-icons/all.js'
import React from 'react'
import useWindowSize from '../../../hooks/useWindowSize.jsx'
import {smallerScreenNavConfig, mobileConfig} from '../../../config/breakPoints.js'

const profileLinks = [
	{icon: <VscDashboard className='icon'/>, text: 'Dashboard', path: '/dashboard', disabled: true},
	{icon: <HiOutlineInboxArrowDown className='icon'/>, text: 'Inbox', path: '/inbox', disabled: true},
	{icon: <GoCalendar className='icon'/>, text: 'Calendar', path: '/calendar', disabled: true}
]
const recruitementLinks = [
	{icon: <TbBriefcase className='icon'/>, text: 'Jobs', path: '/jobs', disabled: true},
	{icon: <BsPeople className='icon'/>, text: 'Candidate', path: '/candidate', disabled: true},
	{icon: <TbArrowBearLeft2 className='icon'/>, text: 'Career Site', path: '/career-site', disabled: true},
	{icon: <HiOutlineChatBubbleBottomCenterText className='icon'/>, text: 'My referrals', path: '/my-refferals', disabled: true}
]
const organizationLinks = [
	{icon: <IoIosPeople className='icon'/>, text: 'Employees', path: '/employees', disabled: true},
	{icon: <BiNetworkChart className='icon'/>, text: 'Structure', path: '/structure', disabled: true},
	{icon: <HiOutlineChartBarSquare className='icon'/>, text: 'Report', path: '/report', disabled: true}
]

export const Menu = () => {
	const windowSize = useWindowSize()
	return (
		<nav className='navigation__container'>
			<div className='navigation__link-wrapper'>
				{profileLinks.map((link, i) => (
					<Link key={`${i + link.text}`} icon={link.icon} text={link.text} path={link.path}/>)
				)}
			</div>
			<div className='customHR'></div>
			<div className='navigation__link-wrapper'>
				{windowSize.width > smallerScreenNavConfig || windowSize.width < mobileConfig ? <h3>Recruitement</h3> : null}
				{recruitementLinks.map((link, i) => (
					<Link key={`${i + link.text}`} icon={link.icon} text={link.text} path={link.path}/>)
				)}
			</div>
			<div className='customHR'></div>
			<div className='navigation__link-wrapper'>
				{windowSize.width > smallerScreenNavConfig || windowSize.width < mobileConfig ? <h3>Organization</h3> : null}
				{organizationLinks.map((link, i) => (
					<Link key={`${i + link.text}`} icon={link.icon} text={link.text} path={link.path}/>)
				)}
			</div>
		</nav>
	)
}
