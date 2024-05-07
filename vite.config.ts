import { resolve } from 'path'
import resolved from '@rollup/plugin-node-resolve'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactBarcodeScanner',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.es.js' : 'index.cjs.js'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        sourcemap: false,
        exports: 'named'
      }
    }
  },
  plugins: [
    react(),
    resolved(),
    dts({
      insertTypesEntry: true,
      exclude: [
        '**/*.d.ts',
        'vite.config.ts',
        '**/*.stories.tsx'
      ]
    })
  ]
})
