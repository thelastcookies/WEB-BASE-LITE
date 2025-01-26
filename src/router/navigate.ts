import type { RecordName, RouteToRecordRaw } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { RouteLocationRaw } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

const actionStore = useActionStore();
const { actionTree } = storeToRefs(actionStore);

export const routeTo = (props: RouteToRecordRaw) => {
  return new Promise<TreeNode<ActionRecordRaw>>((resolve, reject) => {
    const actionId = typeof props === 'object' ? props.name : props;
    const action = findAction(actionTree.value, actionId);
    if (!action) {
      const err = `Router.navigate "routeTo": Cannot find action by id: ${String(actionId)}.`;
      console.error(err);
      reject(Error(err));
    } else if (action.type === MenuTypeEnum.MENU) {
      // 如果是菜单页面，则找寻其直系子节点，直到某一个子节点配置了可跳转的页面
      const descendant = findDescendantWithUrlDefined(action);
      if (descendant) {
        resolve(routeTo({ name: descendant.actionId as RecordName }));
      } else {
        reject(Error(`Router.navigate "routeTo": Cannot find any descendants with 'url' attribute defined in the action with id: ${String(actionId)}.`));
      }
    } else {
      // 构建 Route
      let route: RouteLocationRaw;
      route = { name: action.actionId as RecordName };
      if (typeof props === 'object') {
        props.params && Object.assign(route, { params: props.params });
        props.query && Object.assign(route, { query: props.query });
      }
      router.push(route);
      resolve(action);
    }
  });
};
