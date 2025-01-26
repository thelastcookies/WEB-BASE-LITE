// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss';
import presetThelastcookies from './preset';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
    presetThelastcookies(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  safelist: [
    // 表单生成器 icon
    'i-mdi-pencil',
    'i-mdi-format-list-bulleted',
    'i-mdi-numeric',
    'i-mdi-star-check',
    'i-mdi-radiobox-marked',
    'i-mdi-checkbox-marked-outline',
    'i-mdi-calendar',
    'i-mdi-calendar-clock',
    'i-mdi-account-check',
    'i-mdi-lan',
    'i-mdi-star',
    'i-mdi-eye',
    'i-mdi-heart',
    'i-mdi-trophy',
    'i-mdi-thumb-up',
    // 菜单 icon
    'i-mdi-format-list-text',
    'i-mdi-cog-outline',
    'i-mdi-link',
    'i-mdi-image-filter-drama-outline',
    'i-mdi-engine-outline',
    'i-mdi-clipboard-list-outline',
  ],
});
