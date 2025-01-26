<script setup lang="ts">
import type { ScoreConfigProps } from '@/views/form/types';

const value = defineModel<number>('value');

withDefaults(defineProps<ScoreConfigProps>(), {
  ...scoreConfigPropsDefault,
});

</script>

<template>
  <a-rate :allow-half="enableHalf" allow-clear
          :count="max" v-model:value="value">
    <template #character>
      <BaseIcon :icon="icon" />
    </template>
  </a-rate>
</template>
