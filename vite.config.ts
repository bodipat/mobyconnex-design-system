import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    // ชุด legacy: รองรับ WebView/เบราว์เซอร์รุ่นเก่า (LINE/Facebook in-app, Android 7+, iOS 12+)
    legacy({
      targets: ['Android >= 7', 'iOS >= 12', 'Chrome >= 61', 'Safari >= 12', 'Firefox >= 60'],
      modernPolyfills: true,
      renderLegacyChunks: true,
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: { chunkSizeWarningLimit: 900 },
  server: { host: true, port: 5173 },
})
