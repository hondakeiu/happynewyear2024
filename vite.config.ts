import { PluginOption, defineConfig } from 'vite';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: "/happynewyear2024/",
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, './src/partials/'),
      context: {
        data: {
          productionRoot: 'https://hondakeiu.github.io/happynewyear2024/',
        },
      },
    }) as PluginOption,
  ],
  build: {
    outDir: 'docs',
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
