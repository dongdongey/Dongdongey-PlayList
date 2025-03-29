import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: {
    port: 80,
    host: "0.0.0.0",
    allowedHosts: true,
    /*
    https: {
      key: fs.readFileSync(path.resolve("/Users/dongdongey/mkcert/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve("/Users/dongdongey/mkcert/localhost.pem")),
    }
    */
  }
})
