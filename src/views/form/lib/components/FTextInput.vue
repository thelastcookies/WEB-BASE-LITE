<script setup lang="ts">
import type { TextInputConfigProps } from '@/views/form/types';

const value = defineModel<string>('value');

withDefaults(defineProps<TextInputConfigProps>(), {
  ...textInputConfigPropsDefault,
});

</script>

<template>
  <a-input v-model:value="value" :placeholder="placeholder" :size="size" />
</template>
