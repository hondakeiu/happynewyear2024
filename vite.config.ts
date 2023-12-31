import { PluginOption, defineConfig } from 'vite';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, './src/partials/'),
      context: {
        data: {
          productionRoot: '',
        },
      },
    }) as PluginOption,
  ],
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, './index.html'),
      },
    },
  },
  server: {
    host: true,
  },
});
