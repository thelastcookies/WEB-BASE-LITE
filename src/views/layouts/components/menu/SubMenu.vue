<script setup lang="ts">
import type { VNodeChild } from 'vue';
import type { MenuTreeNode } from '@/types';

defineProps<{
  item: MenuTreeNode,
}>();

const renderTitle = (title: VNodeChild | (() => VNodeChild)) => {
  if (typeof title === 'function') {
    return title();
  }
  return title;
};

</script>

<template>
  <template v-if="item.children">
    <a-sub-menu :key="item.key">
      <template v-if="item.icon" #icon>
        <BaseIcon :icon="item.icon" />
      </template>
      <template #title>
        {{ renderTitle(item.title) }}
      </template>
      <template v-for="subM in item.children" :key="subM.key">
        <SubMenu :item="subM" />
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.key">
      <template v-if="item.icon" #icon>
        <BaseIcon :icon="item.icon" />
      </template>
      {{ renderTitle(item.title) }}
    </a-menu-item>
  </template>
</template>
