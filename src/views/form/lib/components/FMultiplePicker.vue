<script setup lang="ts">
import type { PickerConfigProps } from '@/views/form/types';
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface';
import type { SelectValue } from 'ant-design-vue/es/select';

const value = defineModel<CheckboxValueType[] | SelectValue>('value');

withDefaults(defineProps<PickerConfigProps>(), {
  ...multiplePickerConfigPropsDefault,
  options: () => multiplePickerConfigPropsDefault.options,
});

</script>

<template>
  <a-checkbox-group v-if="expanding" v-model:value="value as CheckboxValueType[]" :size="size">
    <a-checkbox v-for="op in options" :value="op">{{ op }}</a-checkbox>
  </a-checkbox-group>
  <a-select v-else mode="multiple" v-model:value="value as SelectValue" :size="size" :placeholder="placeholder">
    <a-select-option v-for="op in options" :value="op">{{ op }}</a-select-option>
  </a-select>
</template>
