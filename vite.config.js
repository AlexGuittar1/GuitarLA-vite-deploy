import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/GuitarLA-vite-deploy/',
  plugins: [react()],
});
