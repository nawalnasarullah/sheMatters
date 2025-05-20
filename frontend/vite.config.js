import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      util: 'util/',
      events: 'events/',
      stream: 'stream-browserify',
      buffer: 'buffer/',
      process: 'process/browser',  // ✅ Add this line
    },
  },
  define: {
    global: 'window',     // ✅ Fix for global
    process: { env: {} }, // ✅ Fix for process.env if needed
  },
  optimizeDeps: {
    include: ['util', 'events', 'stream', 'buffer', 'process'],
  },
})
