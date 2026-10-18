import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Caminhos relativos: o site funciona em eucomoareia.github.io/Portfolio/
  base: './',
  plugins: [tailwindcss()],
});
