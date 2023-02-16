import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const API_URLS = {
    development: 'http://localhost:3500',
    production: 'http://13.37.209.39/api'
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    
    console.log(`Vite running in mode ${mode}`)
    
    return {
        plugins: [react()],
        define: {
            URL_API: JSON.stringify(API_URLS[mode])
        }
    }
})
