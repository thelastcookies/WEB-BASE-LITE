<script setup lang="ts">
import type { BaseConfigProps, ComponentConfig } from '@/views/form/types';

const config = defineModel<ComponentConfig<BaseConfigProps>>('config', {
  default: {
    key: 'FormComponent',
    name: '表单组件',
    props: componentCommonPropsDefault,
  },
});

</script>

<template>
  <a-form-item label="字段KEY">
    <a-input v-model:value="config.key" placeholder="请输入字段唯一key值" />
  </a-form-item>
  <a-form-item label="字段名称">
    <a-input v-model:value="config.name" placeholder="请设置字段名称" />
  </a-form-item>
  <a-form-item label="提示文字">
    <a-input v-model:value="config.props.placeholder" placeholder="输入提示" />
  </a-form-item>
  <a-form-item label="是否必填">
    <a-switch v-model:checked="config.props.required" />
  </a-form-item>
</template>

<style scoped>

</style>
