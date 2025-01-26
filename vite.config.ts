import { defineConfig, loadEnv } from 'vite';
import { createVitePlugins } from './plugins';
import { fileURLToPath } from 'node:url';

const baseSrc = fileURLToPath(new URL('./src', import.meta.url));
const imageSrc = fileURLToPath(new URL('./src/assets/images', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // 从 /.env/.env 中读取环境变量
  const env = loadEnv('', process.cwd() + '/.env', 'APP_');
  let conf = {};
  // 一些开发和构建时的配置
  if (command === 'serve') {
    Object.assign(conf, {
      server: {
        host: '0.0.0.0',
        port: 8194,
      },
    });
  } else if (command === 'build') {
    Object.assign(conf, {
      base: '/' + env.APP_BUILD_NAME + '/',
      build: {
        outDir: env.APP_BUILD_NAME,
        sourcemap: env.APP_SOURCE_MAP === 'true',
      },
    });
  }
  // 一些通用配置
  Object.assign(conf, {
    // .env 目录以及前缀设置
    envDir: '.env',
    envPrefix: 'APP_',
    // plugins
    plugins: createVitePlugins(),
    resolve: {
      alias: [{
        find: '@',
        replacement: baseSrc,
      }, {
        find: '~',
        replacement: imageSrc,
      }],
    },
  });
  return conf;
});
