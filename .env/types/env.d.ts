/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 项目标题
  readonly APP_TITLE: string;
  // 项目打包生成文件
  readonly APP_BUILD_NAME: string;
  // 打包时是否开启 sourcemap
  readonly APP_SOURCE_MAP: 'true' | 'false';
  readonly APP_API_BASE_URL: string;
  readonly APP_WHITE_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
