import type { Key, RecordName } from '@/types';
import type { ActionPermission, ActionRecordRaw } from '@/types/action';
import type { ActionResponseRecord, PermissionRecord } from '@/api/admin/action/types';
import type { TreeNode } from '@/utils/tree';

export const useActionStore = defineStore('action', () => {
  const actionTree = shallowRef([] as TreeNode<ActionRecordRaw>[]);

  const getActionsFromApi = async () => {
    const { Data } = await getOperatorMenuList();
    return preprocessMenuTree(Data ?? []);
  };

  const getActionsFromConfig = async () => {
    return staticActions;
  };

  const getActions = async () => {
    // 读取 Actions 获取途径
    const loadActionType = import.meta.env.APP_LOAD_ACTION_TYPE;
    const getActionFunc = loadActionType === LoadActionTypeEnum.BACKEND ? getActionsFromApi : getActionsFromConfig;
    // 获取 Actions 配置并保存
    actionTree.value = await getActionFunc();
    return actionTree.value;
  };


  const $reset = () => {
    actionTree.value = [] as TreeNode<ActionRecordRaw>[];
  };

  return {
    actionTree,
    getActions,
    $reset,
  };
});

/**
 * 根据查询条件查找 Action 配置
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
export const findAction = (
  actions: TreeNode<ActionRecordRaw>[],
  key: Key | RecordName,
  field: 'id' | 'actionId' | 'title' = 'actionId',
): TreeNode<ActionRecordRaw> | undefined => {
  let action: TreeNode<ActionRecordRaw>;
  for (let i = 0, len = actions.length; i < len; i++) {
    if (actions[i][field] === key) {
      action = actions[i];
      return action;
    }
    if ('children' in actions[i]) {
      const p = findAction(
        actions[i].children!,
        key,
        field,
      );
      if (p) {
        return p;
      }
    }
  }
};

/**
 * 根据查询条件查找父级 Action 配置直到根节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
export const findActionAncestorChain = (
  actions: TreeNode<ActionRecordRaw>[],
  key: Key | RecordName,
  field: 'id' | 'actionId' | 'title' = 'actionId',
): TreeNode<ActionRecordRaw>[] | undefined => {
  const action = findAction(actions, key, field)!;
  if (action) {
    if (action.pId) {
      return [action, ...findActionAncestorChain(actions, action.pId, 'id')!];
    } else {
      return [action];
    }
  } else {
    return undefined;
  }
};

/**
 * 转换接口数据为 Actions 数据
 * 主要进行字段的转换和过滤
 * @param dataTree 接口数据
 */
export const preprocessMenuTree = (dataTree: ActionResponseRecord[]): TreeNode<ActionRecordRaw>[] => {
  return createTree(dataTree.map((item: ActionResponseRecord) => {
    let action = {} as ActionRecordRaw;
    action.id = item.Id!;
    action.pId = item.ParentId;
    action.actionId = item.MenuId!;
    action.title = item.Name;
    action.type = item.Type!;
    action.sort = Number(item.Sort);
    action.showInMenu = item.ShowInMenu;
    action.icon = item.Icon;

    action.url = item.Url;
    action.resource = item.Resource;
    action.redirect = item.Redirect;
    action.affix = item.Affix;
    action.keepAlive = item.KeepAlive;

    if (item.Meta) {
      action.meta = JSON.parse(item.Meta);
    }
    if (item.PermissionList) {
      action.permissions = preprocessPerms(item.PermissionList);
    }
    if (item.Children) {
      action.children = preprocessMenuTree(item.Children);
    }
    return action;
  }));
};

export const preprocessPerms = (permissionList: PermissionRecord[]): TreeNode<ActionPermission>[] => {
  return createTree(permissionList.map(item => {
    return {
      id: item.Id,
      pId: item.ParentId,
      name: item.Name,
      value: item.Value,
      needAction: item.NeedAction,
      type: MenuTypeEnum.PERM,
    };
  }));
};
