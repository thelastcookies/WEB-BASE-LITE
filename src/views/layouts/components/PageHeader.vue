<script setup lang="ts">
import type { RecordName } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { RouteLocationNormalized } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

const actionStore = useActionStore();
const { actionTree } = storeToRefs(actionStore);

const breadcrumb = ref([] as TreeNode<ActionRecordRaw>[]);
const currentRoute = ref<RouteLocationNormalized>();

// 订阅路由变化，设置面包屑
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;
  breadcrumb.value = ancestorChain.reverse();
  currentRoute.value = route;
}, true);

onUnmounted(() => {
  removeRouteListener();
});

const routes = computed(() => {
  return breadcrumb.value.map(item => {
    return {
      path: '',
      breadcrumbName: item.title,
    };
  });
});

const router = useRouter();

// TODO 插槽迁移

const title = computed(() => {
  if (!currentRoute.value) return '';
  return currentRoute.value.query?.title || currentRoute.value.meta?.title as string || '';
});
const subTitle = computed(() => {
  if (!currentRoute.value) return '';
  return currentRoute.value.query?.subTitle || currentRoute.value.meta?.subTitle as string || '';
});

const backBtnEnable = computed(() => {
  if (!currentRoute.value) return false;
  if (currentRoute.value.meta?.backEnable) return null;
  else return false;
});

</script>

<template>
  <a-page-header
    class="!py-4"
    :title="title"
    :sub-title="subTitle"
    :breadcrumb="{ routes }"
    :ghost="false"
    :back-icon="backBtnEnable"
    @back="router.go(-1)"
  >
    <template #backIcon>
      <BaseIcon icon="i-mdi-arrow-left" size="1.2" />
    </template>
  </a-page-header>
</template>

<style scoped lang="less">

</style>
