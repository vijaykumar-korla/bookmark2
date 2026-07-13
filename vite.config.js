import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Dynamically switches the base path depending on the deployment platform
  base: process.env.VERCEL ? '/' : '/bookmark2/',
  plugins: [react()],
})
