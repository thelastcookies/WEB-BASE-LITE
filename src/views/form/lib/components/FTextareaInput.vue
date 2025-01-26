<script setup lang="ts">
import type { TextareaInputConfigProps } from '@/views/form/types';

const value = defineModel<string>('value');

withDefaults(defineProps<TextareaInputConfigProps>(), {
  ...textareaInputConfigPropsDefault,
});

</script>

<template>
  <a-textarea
    v-model:value="value"
    show-count
    :auto-size="{ minRows: 2, maxRows: 3 }"
    :maxlength="max"
    :placeholder="placeholder"
    :size="size" />
</template>
