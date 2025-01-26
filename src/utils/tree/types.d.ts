import type { Key } from '@/types';

/**
 * 通用的树节点的类型声明，其中，
 * TreeNodeIdField: 作为节点唯一标识符的字段
 * TreeNodeParentIdField: 作为父节点唯一标识符的字段
 * TreeNodeLabelField: 作为节点文本的字段
 * TreeNodeSortField: 作为节点排序的字段
 * TreeNodeChildrenField: 作为子层级列表的字段
 */
export type TreeNodeIdField = 'id' | 'Id' | 'key' | 'Key';
export type TreeNodeParentIdField = 'pid' | 'pId' | 'parentId' | 'ParentId';
export type TreeNodeLabelField = 'name' | 'label' | 'title' | 'value';
export type TreeNodeSortField = 'sort' | 'Sort' | 'order' | 'Order';
export type TreeNodeChildrenField = 'children' | 'Children';

export interface TreeNodeInterface extends Partial<Record<TreeNodeIdField, Key>>,
  Partial<Record<TreeNodeParentIdField, Key>>,
  Partial<Record<TreeNodeLabelField, Key>>,
  Partial<Record<TreeNodeSortField, Key>>,
  Partial<Record<TreeNodeChildrenField, TreeNodeInterface[]>> {
  [key: string]: any;
}
