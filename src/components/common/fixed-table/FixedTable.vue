<script setup lang="ts">
/**
 * 可固定高度的 Antdv Table 组件
 * 全部属性、插槽转发，因此支持所有官方文档配置
 * 需要有明确高度的容器，否则会失去效果
 * （本质上是纯 CSS 实现，不过为了方便使用，特地以组件形式呈现）
 *
 * TODO: 没有分页器的表格
 * TODO: 没有 title 的表格
 */

import type { Slot } from 'vue';

// Antdv Table 组件支持的插槽 key
type ATableSlotKeys = 'emptyText'
  | 'expandIcon'
  | 'title'
  | 'footer'
  | 'summary'
  | 'expandedRowRender'
  | 'expandColumnTitle'
  | 'bodyCell'
  | 'headerCell'
  | 'customFilterIcon'
  | 'customFilterDropdown';

</script>

<template>
  <a-table v-bind="$attrs">
    <template
      v-for="(_, name) in $slots as Record<ATableSlotKeys, Slot>" :key="name"
      v-slot:[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-table>
</template>

<style scoped lang="less">
:deep(.ant-spin-nested-loading) {
  height: 100% !important;
}

:deep(.ant-table) {
  height: calc(100% - 64px);

  .ant-table-container {
    height: calc(100% - 64px);

    .ant-table-content {
      height: 100%;
      overflow-y: auto;

      .ant-table-thead {
        position: sticky;
        top: 0;
        z-index: var(--zIndexLevel1);
      }
    }
  }
}
</style>
