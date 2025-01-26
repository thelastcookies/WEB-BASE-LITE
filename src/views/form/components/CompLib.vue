<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { ComponentConfig, ComponentConfigProps } from '@/views/form/types';

const handleClone = (el: ComponentConfig<ComponentConfigProps>) => {
  return Object.assign(cloneDeep(el), {
    key: el.type + '_' + nanoid(8),
    mode: 'edit',
  });
};

</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-38px lh-38px text-center
            border-b border-ant.border border-b-solid">组件库
    </div>
    <div class="p-3">
      <div v-for="(group, gi) in componentGroups" :key="gi">
        <div class="mb-2">{{ group.name }}</div>
        <vue-draggable
          v-model="group.components"
          :group="{ name: 'FormDesigner', pull: 'clone', put: false }"
          :sort="false"
          :clone="handleClone"
          class="grid grid-cols-2 grid-gap-2 mb-4"
        >
          <div v-for="comp in group.components" :key="comp.type" class="comp-item">
            <BaseIcon v-if="comp.icon" :icon="comp.icon" />
            <span class="ml-1">{{ comp.name }}</span>
          </div>
        </vue-draggable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.comp-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: var(--borderRadiusLG);
  background-color: var(--colorBgContainer);
  border: 1px solid var(--colorBorder);
  transition: all var(--motionDurationMid);

  &:hover {
    background-color: var(--colorPrimaryBg);
    border-color: var(--colorPrimaryBorderHover);
    color: var(--colorPrimaryTextHover);
    cursor: grab;
  }
}
</style>
