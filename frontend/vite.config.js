import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns';


// dns.setDefaultResultOrder('verbatim'); // Disable address reordering 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

})
