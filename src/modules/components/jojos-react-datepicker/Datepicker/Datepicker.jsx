import './Datepicker.scss'
import React from 'react'
import {useEffect, useRef, useState} from 'react'
import {weekDays, dateFormat, years, months, handleSetDays} from '../utils.js'

const Datepicker = ({locale, setInputValue, RHFinputName, currentSelectedValue, disableFuture, hide}) => {
	const [selectedDate, setSelectedDate] = useState('')
	const [days, setDays] = useState(handleSetDays())
	const [month, setMonth] = useState(new Date().getMonth())
	const [year, setYear] = useState(new Date().getFullYear())
	
	
	// Update all states (month, year and days)
	const updateDapickerUI = (value) => {
		const date = new Date(value)
		setMonth(date.getMonth())
		setYear(date.getFullYear())
		setDays(handleSetDays(new Date(date.getFullYear(), date.getMonth(), 1)))
	}
	const openDatepicker = () => {
		// in order to display allways selectedDate otherwise current date
		updateDapickerUI(currentSelectedValue | new Date())
	}
	const handleOnChange = (e) => handleSelectedDate(e.target.value)
	
	const handleSelectedDate = (value) => {
		// update selecteDate if value is a correct string for Date Object and also included in years range
		const date = new Date(value)
		if (
			date.toString() !== 'Invalid Date' &&
			years.includes(date.getFullYear())
		) {
			setSelectedDate(dateFormat(locale, new Date(date)))
			// update month, year and days
			updateDapickerUI(date)
			// callback => Name if using with react-hook-form-library
			setInputValue(dateFormat(locale, new Date(date)), RHFinputName)
		}
		hide()
	}
	
	const handleMonthSelect = (e) => {
		setMonth(e.target.value)
		updateDapickerUI(new Date(year, e.target.value, 1))
	}
	const handleYearSelect = (e) => {
		setYear(e.target.value)
		updateDapickerUI(new Date(e.target.value, month, 1))
	}
	const handlePreviousMonth = (e) => {
		const date = new Date(year, month, 1)
		setMonth(new Date(date.setMonth(date.getMonth() - 1)).getMonth())
		setYear(date.getFullYear())
		setDays(handleSetDays(date))
	}
	const handleNextMonth = (e) => {
		const date = new Date(year, month, 1)
		setMonth(new Date(date.setMonth(date.getMonth() + 1)).getMonth())
		setYear(date.getFullYear())
		setDays(handleSetDays(date))
	}
	
	// onclickoutside : https://blog.logrocket.com/detect-click-outside-react-component-how-to/
	const ref = useRef()
	useEffect(() => {
		const handleClickOutSide = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				hide()
			}
		}
		document.addEventListener('click', handleClickOutSide, true)
		return () => {
			document.removeEventListener('click', handleClickOutSide, true)
		}
	}, [])
	
	const isSelectedDate = (value) => {
		const dateToCheck = currentSelectedValue || dateFormat()
		return dateToCheck === value
	}
	
	const isToday = (value) => {
		const dateToCheck = dateFormat()
		return dateToCheck === value
	}
	
	
	const computeDayClassName = (index, value) => {
		let className = 'week-day'
		const day = new Date(value).getDate()
		const allDays = new Date(value)
		
		const isAfterToday = () => allDays > Date.now()
		
		if ((index < 7 && day > 7) || (index > 27 && day < 14)) {
			className += ' other-month'
		}
		
		if (isSelectedDate(value)) {
			className += ' selected'
		}
		
		if (isToday(value)) {
			className += ' today'
		}
		
		if (disableFuture) {
			if (isAfterToday()) className += ' disabledDay'
		}
		
		
		return className
	}
	
	
	return (
		<div>
			<section ref={ref} className='custom-date-picker-calendar'>
				<nav className='calendar-header'>
					<div
						className='calendar-header-menu calendar-header-menu-button-left'
						onClick={handlePreviousMonth}
					>
						{'<'}
					</div>
					<select
						className='calendar-header-menu'
						value={month}
						onChange={handleMonthSelect}
					>
						{months().map((item, index) => (
							<option key={item} value={index}>
								{item}
							</option>
						))}
					</select>
					<select
						className='calendar-header-menu'
						value={year}
						onChange={handleYearSelect}
					>
						{years.map((item) => (
							<option key={item}>{item}</option>
						))}
					</select>
					<div
						className='calendar-header-menu calendar-header-menu-button-right'
						onClick={handleNextMonth}
					>
						{'>'}
					</div>
				</nav>
				<section className='custom-date-picker-calendar-days'>
					<div className='week-days-header'>
						{weekDays().map((weekDay, index) => (
							<div key={`week-day-${index}`} className='week-day-name'>
								{weekDay.charAt(0).toUpperCase() +
									weekDay.substring(0, 2).slice(1)}
							</div>
						))}
					</div>
					<div className='week-days'>
						{days.map((value, index) => (
							<div
								key={`day-${index}`}
								className={computeDayClassName(index, value)}
								onClick={(e) => handleSelectedDate(value)}
							>
								{new Date(value).getDate()}
							</div>
						))}
					</div>
				</section>
			</section>
			)}
		</div>
	)
}

export default Datepicker
