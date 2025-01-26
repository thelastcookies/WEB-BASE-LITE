import type { MenuTypeEnum } from '@/constants/enums';
import type { Key } from '@/types';
import type { RouteMeta } from 'vue-router';
import type { TreeNodeInterface } from '@/utils/tree/types';
import type { TreeNode } from '@/utils/tree';

export type ActionRecordRaw =
  ActionRecordPage
  | ActionRecordMenu
  | ActionRecordRedirect
  | ActionRecordLink
  | ActionRecordIFrame;

interface _ActionBase extends TreeNodeInterface {
  // 路由 id
  id: Key;
  // 父级 id
  pId?: Key;
  // 路由短 id，与 id 职能相同，实践中一般使用该值来标识路由项，在构建路由时，会将此项作为 'name' 属性填入 Route 中
  actionId: Key;
  // 浏览器地址栏路径
  url?: string;
  // 路由配置的中文描述
  title?: string;
  // 路由配置的类型
  type: MenuTypeEnum;
  // 图标
  icon?: string;
  // 排序
  sort?: number;
  // 该配置项是否在系统中展示
  showInMenu?: boolean;
  // 自定义的路由元数据
  meta?: RouteMeta;
  // 子节点
  children?: (ActionRecordRaw | TreeNode<ActionRecordRaw>)[];
  // 权限配置
  permissions?: TreeNode<ActionPermission>[];
}

export interface ActionRecordPage extends _ActionBase {
  // 组件配置
  resource: string;
  // 重定向
  redirect?: string;
  // 是否为固定页签
  affix?: boolean;
  // 是否 KeepAlive
  keepAlive?: boolean;
  // 配置携带的默认查询参数
  query?: object;
}

export interface ActionRecordMenu extends _ActionBase {
  url: string;
}

export interface ActionRecordRedirect extends _ActionBase {
  redirect: string;
  component?: string;
}

export interface ActionRecordLink extends _ActionBase {
  url: string;
  // 外链地址
  resource: string;
}

export interface ActionRecordIFrame extends _ActionBase {
  url: string;
  // IFrame 地址
  resource: string;
  keepAlive?: boolean;
}

export interface ActionPermission extends TreeNode {
  id?: string;
  pId?: string;
  name?: string;
  value?: string;
  needAction?: boolean;
  type?: MenuTypeEnum;
}
