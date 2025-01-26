<script setup lang="ts">
import notFoundSvg from '~/exceptions/404.svg';
</script>

<template>
  <a-result title="NOT FOUND" sub-title="页面不存在，请检查菜单配置">
    <template #icon>
      <img :src="notFoundSvg" alt="404.svg">
    </template>
  </a-result>
</template>
