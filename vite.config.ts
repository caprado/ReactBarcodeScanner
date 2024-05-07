import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactBarcodeScanner',
      formats: ['es', 'cjs'],
      fileName: format => {
        if (format === 'es') {
          return 'dist/index.es.js'
        }

        return 'dist/index.cjs.js'
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '**/*.stories.tsx'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        sourcemap: true,
        exports: 'named'
      }
    }
  },
  plugins: [
    react(),
    dts({ insertTypesEntry: true })
  ]
})
