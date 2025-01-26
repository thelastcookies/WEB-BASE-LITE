<script setup lang="ts">
import type { MenuTreeNode, RecordName } from '@/types';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import type { RouteLocationNormalized } from 'vue-router';

defineProps<{
  menu: MenuTreeNode[],
}>();

const openKeys = ref([] as string[]);
const selectedKeys = ref([] as string[]);

const handleMenuClick = ({ key }: MenuInfo) => {
  routeTo({ name: key as string });
};

const { actionTree } = storeToRefs(useActionStore());

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;

  const indexMenuSelectable = ancestorChain.findIndex(action => action.showInMenu === true);
  if (indexMenuSelectable < 0) return;
  selectedKeys.value = [String(ancestorChain[indexMenuSelectable].actionId)];
  const parentMenuIndex = indexMenuSelectable + 1 < ancestorChain.length ? indexMenuSelectable + 1 : indexMenuSelectable;
  openKeys.value = [String(ancestorChain[parentMenuIndex].actionId)];
}, true);

onUnmounted(() => {
  removeRouteListener();
});

</script>

<template>
  <a-menu
    h-full
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleMenuClick"
  >
    <template v-for="item in menu" :key="item.key">
      <SubMenu :item="item" />
    </template>
  </a-menu>
</template>
