<script setup lang="ts">
import type { ComponentConfig, ScoreConfigProps } from '@/views/form/types';

const config = defineModel<ComponentConfig<ScoreConfigProps>>('config', {
  default: {
    key: 'Score_0',
    name: '评分',
    props: scoreConfigPropsDefault,
  },
});

const iconList = ['i-mdi-star', 'i-mdi-eye', 'i-mdi-heart', 'i-mdi-trophy', 'i-mdi-thumb-up'];

</script>

<template>
  <BaseConfig v-model:config="config" />
  <a-form-item label="图标设置">
    <a-radio-group size="small" v-model:value="config.props.icon">
      <template v-for="icon in iconList">
        <a-radio-button :value="icon">
          <BaseIcon :icon="icon" />
        </a-radio-button>
      </template>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="最大分值">
    <a-input-number :min="0" :max="20" v-model:value="config.props.max" />
  </a-form-item>
  <!--  <a-form-item label="显示分值">-->
  <!--    <el-switch v-model:value="config.props.showScore"/>-->
  <!--  </a-form-item>-->
  <a-form-item label="允许半分">
    <a-switch v-model:checked="config.props.enableHalf" />
  </a-form-item>
  <!--  <a-form-item label="图标颜色">-->
  <!--    <el-color-picker v-model:value="config.props.color"/>-->
  <!--  </a-form-item>-->
</template>
