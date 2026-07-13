import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  // Automatically sets the subfolder path on GitHub Pages production builds
  base: './',
  plugins: [react()],
})
