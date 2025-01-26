<script setup lang="ts">
const { hasPerm } = useUserStore();
</script>

<template>
  <div>
    <div class="text-10 text-center">示例页面</div>
    <div class="mt-4 flex gap-3 px-10">
      <a-button v-if="hasPerm(PermEnum.PAGE_BUTTON_ADD)" type="primary">权限新增</a-button>
      <a-button v-if="hasPerm(PermEnum.PAGE_BUTTON_DELETE)" type="primary" danger>权限删除</a-button>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
