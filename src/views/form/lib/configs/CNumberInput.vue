<script setup lang="ts">
import type { ComponentConfig, NumberInputConfigProps } from '@/views/form/types';

const config = defineModel<ComponentConfig<NumberInputConfigProps>>('config', {
  default: {
    key: 'NumberInput_0',
    name: '数字输入框',
    props: numberInputConfigPropsDefault,
  },
});

</script>

<template>
  <BaseConfig v-model:config="config" />
  <a-form-item label="输入范围">
    <a-input-number v-model:value="config.props.min" placeholder="最小值" />
    <span class="vertical-mid px-1">~</span>
    <a-input-number v-model:value="config.props.max" placeholder="最大值" />
  </a-form-item>
</template>
