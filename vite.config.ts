import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the built app also works when served from a sub-path
// (GitHub Pages project site), not just from the domain root.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
