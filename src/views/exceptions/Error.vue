<script setup lang="ts">
import notFoundSvg from '~/exceptions/404.svg';

const router = useRouter();

const back = () => {
  router.replace({
    path: '/',
  });
};
</script>

<template>
  <a-result title="NOT FOUND" sub-title="对不起，当前访问的页面不存在">
    <template #icon>
      <img :src="notFoundSvg" alt="404.svg">
    </template>
    <template #extra>
      <a-button type="primary" @click="back">
        返回首页
      </a-button>
    </template>
  </a-result>
</template>
