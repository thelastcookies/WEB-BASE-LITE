<script setup lang="ts">
import type { ComponentConfig, TimePickerConfigProps } from '@/views/form/types';

const config = defineModel<ComponentConfig<TimePickerConfigProps>>('config', {
  default: {
    key: 'DateTimeRangePicker_0',
    name: '时间区间选择',
    props: dateTimeRangePickerConfigPropsDefault,
  },
});

</script>

<template>
  <BaseConfig v-model:config="config" />
  <a-form-item label="数据格式">
    <a-select v-model:value="config.props.format">
      <a-select-option value="YYYY-MM-DD">年-月-日</a-select-option>
      <a-select-option value="YYYY-MM-DD HH:mm">年-月-日 时:分</a-select-option>
      <a-select-option value="YYYY-MM-DD HH:mm:ss">年-月-日 时:分:秒</a-select-option>
    </a-select>
  </a-form-item>
</template>
