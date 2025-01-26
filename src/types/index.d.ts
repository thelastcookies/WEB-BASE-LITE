import { VNodeChild } from 'vue';
import type { MessageArgsProps } from 'ant-design-vue/es/message';

export type Key = string | number;
export type RecordName = string | symbol;

/**
 * 任意类型的异步函数
 */
export type AnyPromiseFunction<T extends any[] = any[], R = void> = (
  ...arg: T
) => PromiseLike<R>;

/**
 * 任意类型的普通函数
 */
export type AnyNormalFunction<T extends any[] = any[], R = void> = (...arg: T) => R;

/**
 * 任意类型的函数
 */
export type AnyFunction<T extends any[] = any[], R = void> =
  | AnyNormalFunction<T, R>
  | AnyPromiseFunction<T, R>;

/**
 *  T | null 包装
 */
export type Nullable<T> = null | T;

/**
 * T | Not null 包装
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 字符串类型对象
 */
export type Recordable<T> = Record<string, T>;

/**
 * 字符串类型对象（只读）
 */
export interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T;
}

export interface RouteToRecord {
  name: RecordName;
  title?: string;
  type?: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
}

export type RouteToRecordRaw = Key | RecordName | RouteToRecord;

/**
 * 用于 Antdv 菜单
 */
export interface MenuTreeNode {
  key: Key | RecordName;
  label: string;
  title?: string;
  icon?: string | (() => VNodeChild);
  disabled?: boolean;
  showInMenu?: boolean;
  children?: MenuTreeNode[];
}

export interface IFrameMessage {
  type: 'message';
  content: MessageArgsProps;
}
