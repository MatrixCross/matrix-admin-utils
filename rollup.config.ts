import { defineConfig } from 'rollup'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: 'src/index.ts',
  plugins: [typescript()],
  external: ['vue', 'js-cookie', 'clipboard', 'crypto-js'],
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      esModule: false,
      sourcemap: true,
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: true,
    },
    {
      format: 'iife',
      file: pkg.jsdelivr,
      name: 'Test',
      extend: true,
      globals: {
        'js-cookie': 'Cookies',
        vue: 'Vue',
        clipboard: 'Clipboard',
        'crypto-js': 'CryptoJS',
      },
    },
  ],
})
