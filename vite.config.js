import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use root '/' for Vercel, and use your repository subfolder path for GitHub Pages
  base: process.env.GITHUB_PAGES ? '/bookmark2/' : '/',
  plugins: [react()],
})
