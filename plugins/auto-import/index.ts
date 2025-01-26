import AutoImport from 'unplugin-auto-import/vite';
import type { PluginOption } from 'vite';
import { customImports } from './custom-imports';

export const AutoImportPluginConfig: PluginOption = AutoImport({
  include: [
    /\.tsx?$/, // .ts, .tsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
  ],
  imports: [
    'vue',
    'vue-router',
    'pinia',
    '@vueuse/core',
    '@vueuse/math',
    customImports,
  ],
  dts: './plugins/auto-import/auto-imports.d.ts',
  dirs: [
    'src/api/**/*.ts',
    'src/constants/**/*.ts',
    'src/hooks',
    'src/router',
    'src/stores/**/*.ts',
    'src/types/**/*.ts',
    'src/utils/**/*.ts',
    'src/views/**/*.vue',
    'src/views/**/*.ts',
    'src/components/common/echarts/*.ts',
    '!src/views/curd/**/*.ts',
  ],
  ignoreDts: [
    'src/views/form/libs',
  ],
  vueTemplate: true,
});
