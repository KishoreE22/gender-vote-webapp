import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // IMPORTANT: This avoids 404 when hosted under a subpath
})
