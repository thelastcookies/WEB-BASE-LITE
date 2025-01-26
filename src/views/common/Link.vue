<script setup lang="ts">
const href = useRoute().meta.href as URL;
const openNewTab = () => {
  window.open(href);
};
openNewTab();
</script>

<template>
  <a-result>
    <template #title>已在新标签页中打开页面</template>
    <template #subTitle>如果没有正常跳转，请点击按钮重试</template>
    <template #icon>
      <BaseIcon icon="i-mdi-link-variant" size="4.5" c-ant.blue-5 />
    </template>
    <template #extra>
      <a-button type="primary" @click="openNewTab">再次打开</a-button>
    </template>
  </a-result>
</template>
