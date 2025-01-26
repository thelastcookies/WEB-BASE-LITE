import type { ActionRecordRaw } from '@/types/action';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

/**
 * 根据 Actions 配置，生成路由
 */
export const generateRouterConf = (actionTree: TreeNode<ActionRecordRaw>[]) => {
  // 生成路由配置
  const routes = generateRoutes(actionTree);
  // 获取首页配置
  const homePageId = import.meta.env.APP_HOMEPAGE_ID;
  let homePage: TreeNode<ActionRecordRaw> | undefined;
  if (!homePageId) {
    console.info(`Router.generate "generateRouterConf": Empty configuration item 'APP_HOMEPAGE_ID'.`);
    homePage = findDescendantWithUrlDefined(actionTree[0]);
  } else {
    homePage = findAction(actionTree, homePageId);
  }
  if (!homePage) {
    console.error(`Router.generate "generateRouterConf": Cannot find homepage by id: ${homePageId}.`);
  }

  // 为 Layout 添加指向首页的 redirect
  router.removeRoute('Layout');

  router.addRoute({
    path: '/',
    name: 'Layout',
    redirect: { name: homePage!.actionId as RouteRecordName },
    component: basicRouteMap.Layout,
    children: routes,
  });
};

/**
 * 将 Actions 处理为 RouteMap 并拉平。
 * @param actions 待处理的 actionList
 */
const generateFlatRoutes = (actions: TreeNode<ActionRecordRaw>[]): RouteRecordRaw[] => {
  const routeData = [] as RouteRecordRaw[];
  for (const action of actions) {
    if ('children' in action && action.getChildren()?.length) {
      routeData.push(...generateFlatRoutes(action.getChildren()!));
    }
    const route = actionToRoute(action);
    if (!route) continue;
    routeData.push(route);
  }
  return routeData;
};

/**
 * 将 Actions 处理为 RouteMap。
 * @param actions 待处理的 actionList
 */
const generateRoutes = (actions: TreeNode<ActionRecordRaw>[]) => {
  const routeData = [] as RouteRecordRaw[];
  for (const action of actions) {
    const route = actionToRoute(action);
    if (action.children?.length) {
      route.children = generateRoutes(action.children);
    }
    routeData.push(route);
  }
  return routeData;
};

/**
 * 将 Action 处理为 RouteRecordRaw 类型并返回
 * 如果 Action 没有配置 component 与 url 属性，则视作非实体组件而不会被加入到 router 中
 * @param action
 */
const actionToRoute = (action: TreeNode<ActionRecordRaw>): RouteRecordRaw => {
  const route = {} as RouteRecordRaw;
  route.name = typeof action.actionId === 'number' ? String(action.actionId) : action.actionId;
  if (action.url) {
    route.path = action.url;
    route.props = action.url.search(/:/) > 0;
  } else {
    route.path = '';
  }
  if (action.type === MenuTypeEnum.PAGE) {
    route.component = getRouterModule(action.resource);
  } else if (action.type === MenuTypeEnum.MENU) {
    route.redirect = 'redirect' in action ? action.redirect : {
      name: findDescendantWithUrlDefined(action)?.actionId as RouteRecordName,
    };
  } else if (action.type === MenuTypeEnum.IFRAME) {
    route.component = getRouterModule('IFrame');
    route.meta = { href: action.resource };
  } else if (action.type === MenuTypeEnum.LINK) {
    route.component = getRouterModule('Link');
    route.meta = { href: action.resource };
  }
  if ('meta' in action) {
    route.meta = Object.assign({}, route.meta, action.meta);
  }
  return route;
};

export const findDescendantWithUrlDefined = (
  action: TreeNode<ActionRecordRaw>,
): TreeNode<ActionRecordRaw> | undefined => {
  if (action.children) {
    if (action.children[0]?.url) return action.children[0];
    else findDescendantWithUrlDefined(action.children[0]);
  } else return undefined;
};
