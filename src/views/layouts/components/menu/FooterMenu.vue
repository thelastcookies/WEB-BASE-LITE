<script setup lang="ts">
import type { MenuTreeNode, RecordName } from '@/types';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import type { RouteLocationNormalized } from 'vue-router';

const props = defineProps<{
  menu: MenuTreeNode[],
}>();

const menuNative = computed(() => {
  // 为防止一级菜单过多导致的样式问题，将一级菜单限制为 4 个以下
  if (props.menu.length > 4) {
    console.warn(`FooterMenu.vue: The length of menu in mobile exceeds the limit '6', the excess will be truncated.`);
    return props.menu.slice(0, 4);
  } else {
    return props.menu;
  }
});

const selectedKeys = ref([] as string[]);

const handleMenuClick = ({ key }: MenuInfo) => {
  selectedKeys.value = [key as string];
  routeTo({ name: key as string });
};

// 设置菜单项宽度
const { width } = useWindowSize();
// -1px: 避免临界宽度时触发 overflow，导致样式异常
const menuItemWidth = width.value / menuNative.value.length - 1 + 'px';

const { actionTree } = storeToRefs(useActionStore());

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;
  selectedKeys.value = [ancestorChain[ancestorChain.length - 1].actionId as string];
}, true);

onUnmounted(() => {
  removeRouteListener();
});

</script>
<template>
  <a-menu
    v-if="menuNative.length"
    class="flex-sb"
    v-model:selectedKeys="selectedKeys"
    mode="horizontal"
    @click="handleMenuClick"
  >
    <a-menu-item v-for="item in menuNative" :key="item.key"
      :style="{width: menuItemWidth}"
    >
      <template v-if="item.icon" #icon>
        <BaseIcon :icon="item.icon" size="1.5" />
      </template>
      <div class="text-ant.fs-sm mt-1.5">{{ item.title }}</div>
    </a-menu-item>
  </a-menu>
</template>

<style scoped lang="less">
.ant-menu {
  :deep(.ant-menu-item) {
    --uno: flex-c flex-col pt-3 pb-4;

    &:after {
      --uno: b-b-0;
    }

    .ant-menu-title-content {
      --uno: m0;
    }
  }

  .ant-menu-submenu::after {
    --uno: b-b-0;
  }
}
</style>

