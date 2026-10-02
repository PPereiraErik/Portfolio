import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Impede o Vite de procurar postcss.config em pastas acima do projeto
  css: {
    postcss: {},
  },
})
