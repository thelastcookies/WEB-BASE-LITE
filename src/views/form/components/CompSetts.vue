<script setup lang="ts">
import type { ComponentConfig, ComponentConfigProps, FormConfig } from '@/views/form/types';

const compConf = defineModel<ComponentConfig<ComponentConfigProps>>('compConf');

const formConf = defineModel<FormConfig>('formConf', {
  default: {
    layout: 'horizontal',
    labelAlign: 'right',
    labelWidth: 100,
    size: 'middle',
  },
});

const activeTab = ref('comp');

</script>

<template>
  <a-form
    class="w-full h-full"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
  >
    <a-tabs v-model:activeKey="activeTab" centered size="small">
      <a-tab-pane tab="组件设置" key="comp">
        <div class="p-3" v-if="compConf">
          <component :is="FormComponentConfigs[compConf.type]" :config="compConf" />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="表单设置" key="form">
        <div class="p-3">
          <a-form-item label="标签布局">
            <a-radio-group v-model:value="formConf.layout" button-style="solid">
              <a-radio-button value="horizontal">水平</a-radio-button>
              <a-radio-button value="vertical">垂直</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="标签对齐">
            <a-radio-group v-model:value="formConf.labelAlign" button-style="solid">
              <a-radio-button value="left">靠左</a-radio-button>
              <a-radio-button value="right">靠右</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="标签宽度">
            <a-input-number v-model:value="formConf.labelWidth"></a-input-number>
          </a-form-item>
          <a-form-item label="组件尺寸">
            <a-radio-group v-model:value="formConf.size" button-style="solid">
              <a-radio-button value="large">大</a-radio-button>
              <a-radio-button>中</a-radio-button>
              <a-radio-button value="small">小</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-form>
</template>

<style scoped lang="less">
:deep(.ant-tabs-nav::before) {
  border-bottom-color: var(--colorBorder);
}

</style>
