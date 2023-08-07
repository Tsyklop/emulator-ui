import path from 'node:path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {babel} from '@rollup/plugin-babel';
import {startMockServer} from 'mock-config-server';

import {mockServerConfig} from './mock-server.config';

startMockServer(mockServerConfig);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({extensions: ['.ts', '.tsx'], babelHelpers: 'bundled', skipPreflightCheck: true}),
    react({

    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:31299',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve('src'),
      },
    ],
  },
});