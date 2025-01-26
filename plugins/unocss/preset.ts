import type { Preset, Rule, UserShortcuts, Variant } from 'unocss';
import antdUnoTheme from './antd-uno-theme.json';

/**
 * 规则配置
 * 一个配置示例：
 *   [/^([pm])([lrtb]*)-normal$/, ([, style, direction]) => {
 *     let property = '';
 *     if (style === 'm') property = 'margin';
 *     else if (style === 'p') property = 'padding';
 *     if (direction === 'l') property += '-left';
 *     else if (direction === 'r') property += '-right';
 *     else if (direction === 't') property += '-top';
 *     else if (direction === 'b') property += '-bottom';
 *     return {
 *       [property]: 'var(--marginSize)',
 *     };
 *   }],
 */

const rules: Rule<Object>[] = [];

/**
 * 快捷方式
 */
const shortcuts: UserShortcuts = [
  ['flex-s', 'flex flex-items-center flex-justify-start'],
  ['flex-c', 'flex flex-items-center flex-justify-center'],
  ['flex-sb', 'flex flex-items-center flex-justify-between'],
  ['flex-sa', 'flex flex-items-center flex-justify-around'],
  ['flex-se', 'flex flex-items-center flex-justify-evenly'],
  ['image-bg', 'bg-no-repeat bg-contain bg-center'],
  ['image-bg-cover', 'bg-no-repeat bg-cover bg-center'],
  ['m-center', 'ml-a mr-a mt-0 mb-0'],
  ['login-input', 'w-full p-16px lh-8 border-rd-10px font-size-18px border-width-1'],
  ['login-btn', 'h-54px w-full font-size-18px font-600 border-rd-10px'],
  ['btn-in-table', 'p-0 h-20px b-0 bg-transparent shadow-none'],
  // [/^(([pm])-([lrtb]+)-(\w+))$/, ([, , style, direction, val]) => {
  //   let output = [] as string[];
  //   direction.split('').forEach(d => {
  //     output.push(style + d + '-' + val);
  //   });
  //   return output.join(' ');
  // }],
];

/**
 * 主题
 */
const theme: Object = {
  ...antdUnoTheme,
};

// 变体
/**
 * 变体配置
 * 一个配置示例：
 * {
 *   name: 'calcVariant',
 *   match: (matcher) => {
 *     if (!matcher.startsWith('calc:')) {
 *       return matcher;
 *     }
 *     let css: CSSEntries = [];
 *     const regExp = /^calc:([a-z]+)-(\d+[a-z%]+)([+\-*\/])(\d+[a-z%]+)$/;
 *     const match = regExp.exec(matcher);
 *     if (match && match.length === 5) {
 *       const [, style, val1, operator, val2] = regExp.exec(matcher) as RegExpExecArray;
 *       const cssStr = `calc(${val1} ${operator} ${val2})`;
 *       if (['height', 'width', 'top', 'bottom', 'left', 'right'].includes(style)) {
 *         css.push([style, cssStr]);
 *       }
 *     }
 *     return {
 *       matcher: 'ph',
 *       body: () => {
 *         return css;
 *       },
 *     };
 *   },
 *   autocomplete: 'calc:(height|width|top|bottom|left|right)-<num>-<num>',
 * }
 */
const variants: Variant<Object>[] = [];

// 组合预设并导出
export default function presetThelastcookies(): Preset {
  return {
    name: 'preset-thelastcookies',
    rules,
    shortcuts,
    theme,
    variants,
  };
}
