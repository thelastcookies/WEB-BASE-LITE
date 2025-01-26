/**
 * @description: 命名规则转换
 * 转换结果示例：
 *   LOWER_CAMEL_CASE: 'fooBar'
 *   UPPER_CAMEL_CASE: 'FooBar'
 *   SNAKE_CASE: 'foo_bar'
 *   KEBAB_CASE: 'foo-bar'
 *   CONSTANT_CASE: 'FOO_BAR'
 */

export enum NamingStyleTransfer {
  TO_LOWER_CAMEL_CASE = 'lowerCamelCase',
  TO_UPPER_CAMEL_CASE = 'upperCamelCase',
  TO_SNAKE_CASE = 'snakeCase',
  TO_KEBAB_CASE = 'kebabCase',
  TO_CONSTANT_CASE = 'constantCase'
}
