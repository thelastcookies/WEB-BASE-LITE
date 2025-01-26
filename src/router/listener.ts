/**
 * 使用发布订阅模式对路由变化状态进行进行分发
 * 目前是为了在路由变化时同步更新菜单、面包屑和 Tab 状态。
 */
import type { Handler } from 'mitt';
import type { RouteLocationNormalized } from 'vue-router';

const emitter = mitt();

const key = Symbol('ROUTE_CHANGE');

let latestRoute: RouteLocationNormalized;

export const setRouteEmitter = (to: RouteLocationNormalized) => {
  emitter.emit(key, to);
  latestRoute = to;
};

export const listenRouteChange = (
  handler: (route: RouteLocationNormalized) => void,
  immediate = true,
) => {
  emitter.on(key, handler as Handler);
  if (immediate && latestRoute) {
    handler(latestRoute);
  }
};

export const removeRouteListener = () => {
  emitter.off(key);
};
