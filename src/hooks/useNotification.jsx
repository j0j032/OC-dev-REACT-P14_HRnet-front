import {useEffect, useRef, useState} from 'react'

/**
 * This custom Hook is made to render a notification for an amount of time
 *
 * @param {function | boolean} deps - To watch and toggle the notification
 * @param {number} delay - To set the time the notification will be displayed (in milliseconds,
 * ex: 3sec will be 3000)
 * @returns {boolean}
 */
const UseNotification = (deps, delay) => {
    const didMount = useRef(false)
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        if (didMount.current) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
            }, delay)
            return () => {
                clearTimeout(timer)
            }
        } else didMount.current = true
    }, [deps, delay])
    
    return visible
}

export default UseNotification
