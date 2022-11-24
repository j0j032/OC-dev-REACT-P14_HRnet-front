import dashboard from '../../../../assets/icons/lateralNAv/dashboard.svg'
import inbox from '../../../../assets/icons/lateralNAv/inbox.svg'
import calendar from '../../../../assets/icons/lateralNAv/calendar.svg'
import jobs from '../../../../assets/icons/lateralNAv/jobs.svg'
import candidate from '../../../../assets/icons/lateralNAv/candidate.svg'
import career from '../../../../assets/icons/lateralNAv/Career site.svg'
import referals from '../../../../assets/icons/lateralNAv/my-referals.svg'
import employeesIcon from '../../../../assets/icons/lateralNAv/employees.svg'
import structure from '../../../../assets/icons/lateralNAv/structure.svg'
import report from '../../../../assets/icons/lateralNAv/report.svg'
import {Link} from './Link.jsx'

const profileLinks = [
	{icon: dashboard, text: 'Dashboard', path: '/dashboard', disabled: true},
	{icon: inbox, text: 'Inbox', path: '/inbox', disabled: true},
	{icon: calendar, text: 'Calendar', path: '/calendar', disabled: true}
]
const recruitementLinks = [
	{icon: jobs, text: 'Jobs', path: '/jobs', disabled: true},
	{icon: candidate, text: 'Candidate', path: '/candidate', disabled: true},
	{icon: career, text: 'Career Site', path: '/career-site', disabled: true},
	{icon: referals, text: 'My referrals', path: '/my-refferals', disabled: true}
]
const organizationLinks = [
	{icon: employeesIcon, text: 'Employees', path: '/employees', disabled: true},
	{icon: structure, text: 'Structure', path: '/structure', disabled: true},
	{icon: report, text: 'Report', path: '/report', disabled: true}
]

export const Menu = () => {
	
	return (
		<nav className='navigation__container'>
			<div className='navigation__link-wrapper'>
				{profileLinks.map((link, i) => (
					<Link key={`${i + link.text}`} icon={link.icon} text={link.text} path={link.path}/>)
				)}
			</div>
			<div className='customHR'></div>
			<div className='navigation__link-wrapper'>
				<h3>Recruitement</h3>
				{recruitementLinks.map((link, i) => (
					<Link key={`${i + link.text}`} icon={link.icon} text={link.text} path={link.path}/>)
				)}
			</div>
			<div className='customHR'></div>
			<div className='navigation__link-wrapper'>
				<h3>Organization</h3>
				{organizationLinks.map((link, i) => (
					<Link key={`${i + link.text}`} icon={link.icon} text={link.text} path={link.path}/>)
				)}
			</div>
		</nav>
	)
}
