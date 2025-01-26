import type { ImportsMap } from 'unplugin-auto-import/types';

/**
 * 自定义自动导入
 * ```
 * '[package-name]': [
 *     '[import-names]',
 *     // alias
 *     ['[from]', '[alias]'],
 * ]
 * ```
 */
export const customImports: ImportsMap = {
  'axios': [
    // default imports
    ['default', 'axios'], // alias imports: import { default as axios } from 'axios',
  ],
  'nanoid': [
    'nanoid', // named imports: import { nanoid } from 'nanoid',
  ],
  'lodash-es': [
    'cloneDeep',
    'merge',
    'zip',
    'isArray',
    'max',
    'min',
    'sum',
  ],
  'mitt': [
    ['default', 'mitt'],
  ],
  'ant-design-vue': [
    'App',
    'legacyLogicalPropertiesTransformer',
    'theme',
    'message',
    'notification',
    'Empty',
    'Tag',
  ],
};
