<script setup lang="ts">
import type { PickerConfigProps } from '@/views/form/types';

const value = defineModel<string>('value');

withDefaults(defineProps<PickerConfigProps>(), {
  ...singlePickerConfigPropsDefault,
  options: () => singlePickerConfigPropsDefault.options,
});

</script>

<template>
  <a-radio-group v-if="expanding" v-model:value="value" :size="size">
    <a-radio v-for="op in options" :value="op">{{ op }}</a-radio>
  </a-radio-group>
  <a-select v-else v-model:value="value" :placeholder="placeholder">
    <a-select-option v-for="op in options" :value="op" :size="size">{{ op }}</a-select-option>
  </a-select>
</template>

