<script setup lang="ts">
import type { ComponentConfig, TextInputConfigProps } from '@/views/form/types';

const config = defineModel<ComponentConfig<TextInputConfigProps>>('config', {
  default: {
    key: 'TextInput_0',
    name: '单行输入框',
    props: textInputConfigPropsDefault,
  },
});

</script>

<template>
  <BaseConfig v-model:config="config" />
</template>
