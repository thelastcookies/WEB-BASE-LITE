<script setup lang="ts">
import type { NumberInputConfigProps } from '@/views/form/types';

const value = defineModel<number>('value');

withDefaults(defineProps<NumberInputConfigProps>(), {
  ...numberInputConfigPropsDefault,
});

</script>

<template>
  <a-input-number v-model:value="value" :max="max" :min="min" :size="size" />
</template>
