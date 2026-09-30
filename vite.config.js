import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Caminhos relativos: o site funciona em luisotv.github.io/Portfolio/
  base: './',
  plugins: [tailwindcss()],
});
