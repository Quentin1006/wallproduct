import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:  {
      "@lib": path.resolve(__dirname, "src/lib"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "typings": path.resolve(__dirname, "src/typing.ts"),
    }
  },
  plugins: [react()],
})
