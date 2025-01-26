/**
 * 用于树形结构数据(TreeNode[])的实用工具
 */
import type { Key } from '@/types';
import type { TreeNodeInterface } from '@/utils/tree/types';
import { TreeNode } from '@/utils/tree';

/**
 * 用于创建树
 * @param tree
 * @param handler
 */
export const createTree = <T extends TreeNodeInterface = TreeNodeInterface>(
  tree: T[],
  handler?: <T extends TreeNodeInterface>(arg: TreeNodeInterface) => T,
): TreeNode<T>[] => {
  return tree.map(node => {
    const tNode = new TreeNode(node, handler);
    const children = tNode.children ?? tNode.Children;
    if (children && children.length) {
      const cl = createTree<T>(children, handler);
      tNode.setChildren(cl);
    }
    return tNode;
  });
};

/**
 * 用于创建浅层（单层）树，即只有第一层会被转换为 TreeNode
 * 因此也会用来创建无嵌套的 TreeNode 数组
 * @param tree
 * @param handler
 */
export const createShallowTree = <T extends TreeNodeInterface = TreeNodeInterface>(
  tree: T[],
  handler?: <T extends TreeNodeInterface>(arg: TreeNodeInterface) => T,
): TreeNode<T>[] => {
  return tree.map(node => new TreeNode(node, handler));
};

/**
 * 按 节点唯一标识符 去查找树中的节点
 * @param tree 由 TreeNode 扩展节点组成的树
 * @param id 节点唯一标识符
 */
export const findTreeNodeById = <T extends TreeNodeInterface = TreeNodeInterface>(
  tree: TreeNode<T>[], id: Key,
): TreeNode<T> | undefined => {
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i].getId() === id) {
      return tree[i];
    } else if (tree[i].getChildren()) {
      const n = findTreeNodeById(tree[i].getChildren()!, id);
      if (n) return n;
    }
  }
};

/**
 * 按 节点 label 去模糊查找树中的节点
 * @param tree 由 TreeNode 扩展节点组成的树
 * @param label 节点 label
 */
export const findTreeNodesByLabel = <T extends TreeNodeInterface = TreeNodeInterface>(
  tree: TreeNode<T>[], label: string,
): TreeNode<T>[] => {
  let nodes: TreeNode<T>[] = [];
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i].getLabel()!.indexOf(label) > -1) {
      nodes.push(tree[i]);
    } else if (tree[i].getChildren()) {
      nodes = [...nodes, ...findTreeNodesByLabel(tree[i].getChildren()!, label)];
    }
  }
  return nodes;
};

/**
 * 按 父节点唯一标识符 去查找 TreeNode[] 数据中符合特征的所有节点
 * @param tree TreeNode[]
 * @param id 父亲节点唯一标识符
 */
export const findTreeNodesByPId = <T extends TreeNodeInterface = TreeNodeInterface>(
  tree: TreeNode<T>[], id: Key,
): TreeNode<T> | undefined => {
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i].getParentId() === id) {
      return tree[i];
    } else if (tree[i].getChildren()) {
      const n = findTreeNodesByPId(tree[i].getChildren()!, id);
      if (n) return n;
    }
  }
};

/**
 * 将 TreeNode 类型的列表转换为树结构
 * 根节点的判断依据为：父亲节点唯一标识符的字段为空或不存在
 * @param list 数组
 */
export const listToTree = <T extends TreeNodeInterface = TreeNodeInterface>(
  list: TreeNodeInterface[],
): TreeNode<T>[] => {
  const treeList = createShallowTree(list);

  const roots: TreeNode<T>[] = [];
  const nodeMap: Record<Key, TreeNode<T>> = {};
  treeList.forEach(node => {
    nodeMap[node.getId()!] = node;
  });

  treeList.forEach(node => {
    const pId = node.getParentId();
    if (node.isRoot()) {
      const root = nodeMap[node.getId()!];
      if (!root.getChildren()) root.setChildren([]);
      roots.push(root);
    } else if (pId) {
      // 否则，将该项添加到父项的 children 数组中
      if (!node.getChildren()) node.setChildren([]);
      nodeMap[pId].getChildren()!.push(nodeMap[node.getId()!]);
    }
  });
  return roots;
};

/**
 * 将 TreeNode 类型的树转换为列表
 * 会将各树节点深度克隆，并去除子级
 * @param tree 数组
 */
export const treeToList = <T extends TreeNodeInterface = TreeNodeInterface>(
  tree: TreeNode<T>[],
): TreeNode<T>[] => {
  const list: TreeNode<T>[] = [];

  function recursion(nodes: TreeNode<T>[]) {
    nodes.forEach(node => {
      const n = cloneDeep(node);
      list.push(n);

      // 如果该节点有子节点，则递归遍历
      if (n.getChildren()?.length > 0) {
        recursion(n.getChildren());
        n.setChildren(undefined);
      }
    });
  }

  recursion(tree);
  return list;
};

/**
 * 根据查询条件查找父节点直到根节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
// const findNodeAncestors = (
//   actions: ActionRecordRaw[],
//   key: Key | RecordName,
//   field: "id" | "actionId" | "title" = "actionId",
// ): ActionRecordRaw[] | undefined => {
//   const action = findAction(actions, key, field)!;
//   if (action) {
//     if (action.pId) {
//       return [action, ...findActionAncestorChain(actions, action.pId, "id")!];
//     } else {
//       return [action];
//     }
//   } else {
//     return undefined;
//   }
// };

/**
 * 查找长子节点直至最深一层
 * @param treeNode
 */
export const findNodeDescendants = <T extends TreeNodeInterface = TreeNodeInterface>(
  treeNode: TreeNode<T>,
): TreeNode<T> | undefined => {
  if (treeNode.getChildren()?.length) {
    return findNodeDescendants(treeNode.getChildren()![0]);
  } else return treeNode;
};
