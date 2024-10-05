import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(env.SPOTIFY_CLIENT_ID)
        },
        plugins: [react()],
    }
})