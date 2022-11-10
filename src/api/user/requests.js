import axios from 'axios'

//Routes
// base: 'http://localhost:3500/auth'
// login :'/' - logout: '/logout' - refresh: '/refresh'
const authURL = 'http://localhost:3500/auth'

export const handleLogin = async (formData) => axios.post(authURL, formData).then(r => r.data)
export const handleLogout = async () => axios.get(`${authURL}/logout`).then(r => r.data)
