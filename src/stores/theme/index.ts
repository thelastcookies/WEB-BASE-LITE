import 'dayjs/locale/zh-cn';
import { theme } from 'ant-design-vue';
import type { Handler } from 'mitt';

/**
 * 主题状态管理
 * 实现动态主题的基本思路是：
 *   1. 涉及到 Antdv 组件的部分，通过向 <a-config-provider> 组件提供 algorithm 与 token 来实现；
 *   2. 其他部分则依托于根节点 :root 下的 CSS 变量来实现。通过改变变量的值改变样式。
 *
 * CSS 变量的获取来源有以下几种：
 *   1. 大部分 CSS 变量由 themeStyleGenerate 方法消费 Antdv token 来动态导入；
 *   2. 部分自定义变量，写在 @/asserts/style/theme/ 下类似 light.css、dark.css 等各主题的变量文件中，由媒体查询来动态导入；
 *
 * CSS 变量的消费方向有以下几种：
 *   1. 在 less 中使用，注意，在 css 中消费动态生成的变量可能会得到「找不到变量」的提示，因此尽量不要在 css 文件中使用变量。
 *   2. 在 UnoCSS 中使用。建立 UnoCSS 规则与 CSS 变量的关联配置，再将配置通过预设导入 UnoCSS 中。
 */

export const useThemeStore = defineStore('theme', () => {
  // 语言环境，为 Antdv 初始化
  dayjs.locale('zh-cn');

  // 主题配色模式
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const isDarkTheme = ref(darkModeMediaQuery.matches);
  const emitter = mitt();

  const themeModeChange = (e: MediaQueryListEvent) => {
    isDarkTheme.value = e.matches;
    nextTick(() => {
      emitter.emit(THEME_CHANGE_KEY, isDarkTheme.value);
      console.log(isDarkTheme.value ? '🌒 深色模式开启' : '🌖 浅色模式开启');
    });
  };

  const themeAlgorithm = computed(() => {
    return isDarkTheme.value ? theme.darkAlgorithm : theme.defaultAlgorithm;
  });

  const designToken = computed(() => {
    return isDarkTheme.value ? darkToken : defaultToken;
  });

  darkModeMediaQuery.addEventListener('change', themeModeChange);

  tryOnUnmounted(() => {
    darkModeMediaQuery.removeEventListener('change', themeModeChange);
  });

  const listenThemeChange = (
    handler: (isDark: Boolean) => void,
    immediate = true,
  ) => {
    emitter.on(THEME_CHANGE_KEY, handler as Handler);
    if (immediate && isDarkTheme.value) {
      handler(isDarkTheme.value);
    }
  };

  const removeThemeListener = () => {
    emitter.off(THEME_CHANGE_KEY);
  };

  return { isDarkTheme, designToken, themeAlgorithm, listenThemeChange, removeThemeListener };
});
