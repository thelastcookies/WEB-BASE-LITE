<script setup lang="ts">
import type { ComponentConfig, TextareaInputConfigProps } from '@/views/form/types';

const config = defineModel<ComponentConfig<TextareaInputConfigProps>>('config', {
  default: {
    key: 'TextareaInput_0',
    name: '多行输入框',
    props: textareaInputConfigPropsDefault,
  },
});

</script>

<template>
  <BaseConfig v-model:config="config" />
  <a-form-item label="最大字数">
    <a-input-number :min="1" v-model:value="config.props.max" />
  </a-form-item>
</template>
