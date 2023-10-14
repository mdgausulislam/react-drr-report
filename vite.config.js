import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default  {
  build: {
    rollupOptions: {
      input: 'src/main.js', // Replace with your entry file
    },
  },
};
