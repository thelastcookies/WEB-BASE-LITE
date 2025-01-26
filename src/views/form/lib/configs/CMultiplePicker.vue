<script setup lang="ts">
import type { ComponentConfig, PickerConfigProps } from '@/views/form/types';
import { VueDraggable } from 'vue-draggable-plus';

const config = defineModel<ComponentConfig<PickerConfigProps>>('config', {
  default: {
    key: 'MultiplePicker_0',
    name: '多选框',
    props: multiplePickerConfigPropsDefault,
  },
});

const handleOptionAdd = () => {
  config.value.props.options.push(`选项${config.value.props.options.length + 1}`);
};

</script>

<template>
  <BaseConfig v-model:config="config" />
  <a-form-item label="选项设置">
    <a-button type="primary" ghost @click="handleOptionAdd">
      <template #icon>
        <BaseIcon icon="i-mdi-plus" />
      </template>
      添加选项
    </a-button>
    <vue-draggable handle=".moveable" :animation="200" v-model="config.props.options">
      <a-input v-for="(options, i) in config.props.options" :key="i"
               v-model:value="config.props.options[i]"
               class="mt-1">
        <template #addonBefore>
          <BaseIcon class="moveable cursor-move" icon="i-mdi-drag" />
        </template>
        <template #addonAfter>
          <BaseIcon @click="config.props.options.splice(i, 1)" icon="i-mdi-trash-can-outline" />
        </template>
      </a-input>
    </vue-draggable>
  </a-form-item>
  <a-form-item label="选项展开">
    <a-switch v-model:checked="config.props.expanding" />
  </a-form-item>
</template>
