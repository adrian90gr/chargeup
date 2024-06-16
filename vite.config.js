import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Define manual chunks to split large files into separate chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('SomeLargeComponent')) {
            return 'large-component';
          }
          
        }
      }
    },
    chunkSizeWarningLimit: 1500, 
  }
})
