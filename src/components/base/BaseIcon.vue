<script setup lang="ts">
/**
 * v0.24.0 弃用 Antdv 组件库
 * v0.11.0 引入 iconify-mdi 为主要图标库
 * https://icones.js.org/collection/mdi
 */
import type { VNodeChild } from 'vue';

const props = withDefaults(defineProps<{
  icon: string | ((...args: any[]) => VNodeChild),
  type?: 'iconify' | 'image' | 'logo',
  size?: number | string
}>(), {
  // 单位：rem
  size: 1,
  type: 'iconify',
});

const sizeStyle = computed(() => {
  if (props.type === 'iconify') {
    return {
      height: `${Number(props.size)}rem`,
      width: `${Number(props.size)}rem`,
    };
  } else {
    return {
      height: `${props.size}rem`,
      width: `${props.size}rem`,
      'line-height': `${props.size}rem`,
      'font-size': `${props.size}rem`,
    };
  }
});

const iconUrl = computed(() => {
  let url = props.icon as string;
  if (url.startsWith('/')) {
    return url.replace('/', '');
  } else if (url.startsWith('~')) {
    url = url.replace('~/', '');
    return new URL(`../../assets/images/${url}`, import.meta.url).href;
  } else {
    return '';
  }
});

</script>

<template>
  <template v-if="type === 'iconify'">
    <span
      :class="icon"
      v-bind="$attrs"
      :style="[sizeStyle]"
      class="base-icon inline-block vertical-sub"
    />
  </template>
  <template v-else>
    <img
      v-bind="$attrs"
      :class="{'logo': type === 'logo'}"
      :style="['base-icon', sizeStyle]"
      :src="iconUrl" :alt="type" />
  </template>
</template>

<style scoped lang="less">
.logo {
  cursor: pointer;
  // will-change: filter;
  transition: filter 0.5s;
}

.logo:hover {
  filter: drop-shadow(0px 0px 3px var(--colorPrimaryHover));
}
</style>
