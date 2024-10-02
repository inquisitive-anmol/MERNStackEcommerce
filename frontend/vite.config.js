import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns';


// dns.setDefaultResultOrder('verbatim'); // Disable address reordering 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   server: {
//     host: '192.168.137.1', // Listen on all addresses
//     port: 4000, // Set your desired port
// },
})
