<script setup lang="ts">
import type { TimePickerConfigProps } from '@/views/form/types';
import type { Dayjs } from 'dayjs';

const value = defineModel<[string, string] | [Dayjs, Dayjs]>('value');

const props = withDefaults(defineProps<TimePickerConfigProps>(), {
  ...dateTimeRangePickerConfigPropsDefault,
});

const _type = computed(() => {
  switch (props.format) {
    case 'YYYY':
      return 'year';
    case 'YYYY-MM':
      return 'month';
    case 'YYYY-MM-DD':
      return 'date';
    default:
      return 'date';
  }
});

const _showTime = computed(() => {
  switch (props.format) {
    case 'YYYY-MM-DD HH':
      return { format: 'HH' };
    case 'YYYY-MM-DD HH:mm':
      return { format: 'HH:mm' };
    case 'YYYY-MM-DD HH:mm:ss':
      return { format: 'HH:mm:ss' };
    default:
      return false;
  }
});

const _placeholder = computed(() => {
  if (dateTimeRangePickerConfigPropsDefault.placeholder?.length) {
    return dateTimeRangePickerConfigPropsDefault.placeholder.split(',');
  }
});

</script>

<template>
  <a-range-picker
    v-model:value="value"
    allow-clear
    :format="format"
    :show-time="_showTime"
    :picker="_type"
    :placeholder="_placeholder"
    :size="size"
  />
</template>
