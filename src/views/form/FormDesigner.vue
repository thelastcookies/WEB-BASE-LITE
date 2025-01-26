<script setup lang="ts">
import { ComponentConfig, type ComponentConfigProps, FormConfig } from '@/views/form/types';

const compList = ref([] as ComponentConfig<ComponentConfigProps>[]);
const currentComp = ref({} as ComponentConfig<ComponentConfigProps>);
const formConf = ref({
  layout: 'horizontal',
  labelAlign: 'right',
  labelWidth: 100,
  size: undefined,
} as FormConfig);

// TODO: 历史编辑功能
// TODO: 表单验证功能

</script>

<template>
  <div class="w-full h-full flex border border-ant.border border-solid">
    <aside class="w-300px h-full border-r border-ant.border border-r-solid">
      <CompLib />
    </aside>
    <main class="h-full w-[calc(100%-602px)]">
      <DrawArea v-model:comp-list="compList" v-model:current-comp="currentComp" :form-conf="formConf" />
    </main>
    <aside class="w-300px h-full border-l border-ant.border border-l-solid">
      <CompSetts v-model:comp-conf="currentComp" v-model:form-conf="formConf" />
    </aside>
  </div>
</template>
