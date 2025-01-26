<script setup lang="ts">
import type { ComponentConfig, TimePickerConfigProps } from '@/views/form/types';

const config = defineModel<ComponentConfig<TimePickerConfigProps>>('config', {
  default: {
    key: 'DateTimePicker_0',
    name: '时间选择',
    props: dateTimePickerConfigPropsDefault,
  },
});

</script>

<template>
  <BaseConfig v-model:config="config" />
  <a-form-item label="数据格式">
    <a-select v-model:value="config.props.format">
      <a-select-option value="YYYY">年</a-select-option>
      <a-select-option value="YYYY-MM">年-月</a-select-option>
      <a-select-option value="YYYY-MM-DD">年-月-日</a-select-option>
      <a-select-option value="YYYY-MM-DD HH">年-月-日 时</a-select-option>
      <a-select-option value="YYYY-MM-DD HH:mm">年-月-日 时:分</a-select-option>
      <a-select-option value="YYYY-MM-DD HH:mm:ss">年-月-日 时:分:秒</a-select-option>
    </a-select>
  </a-form-item>
</template>
