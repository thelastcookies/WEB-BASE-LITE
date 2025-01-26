<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue/es/form/Form';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { EditEnum as EditEnumType } from '@/constants/enums';
import type { TemplateMockRecord } from '@/views/curd/template/types';

const open = defineModel('open', { default: false });

const props = withDefaults(defineProps<{
  type?: EditEnumType;
  data?: any;
}>(), {
  type: EditEnum.VIEW,
});

const emit = defineEmits<{
  (e: 'submit'): void
}>();

const loading = ref<boolean>(false);

const titleEnum = {
  [EditEnum.ADD]: '新增',
  [EditEnum.EDIT]: '编辑',
  [EditEnum.VIEW]: '查看',
};
const title = computed(() => {
  return titleEnum[props.type];
});

const formRef = ref<FormInstance>();
const formData = ref<TemplateMockRecord>({});

const rules: Record<string, Rule[]> = {};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await formRef.value?.validate();
    // const { Success, Msg } = await saveUser(formData.value);
    // if (Success) {
    //   message.success('保存成功');
    //   emit('submit');
    //   handleClear();
    // } else {
    //   message.error({ content: '保存失败，' + Msg });
    // }
    open.value = false;
  } catch (e) {
    if ((e as ValidateErrorEntity)?.errorFields) {
      message.error((e as ValidateErrorEntity)?.errorFields[0].errors[0]);
    } else {
      message.error('保存失败');
    }
  }
  loading.value = false;
};

const handleClear = () => {
  formRef.value!.resetFields();
  formData.value = {};
};

watch(open, (v) => {
  if (v && props.data) {
    formData.value = merge({}, props.data);
  }
});

</script>

<template>
  <a-modal v-model:open="open" :title="title"
    :confirm-loading="loading" :mask-closable="false"
    ok-text="保存"
    @ok="handleSubmit"
    @cancel="handleClear">
    <a-form ref="formRef" autocomplete="off" :model="formData"
      :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }"
      :rules="rules" :disabled="loading || type === EditEnum.VIEW"
      class="px-3 pt-3">
      <a-form-item label="Id" name="id">
        <a-input v-model:value="formData.id" />
      </a-form-item>
      <a-form-item label="字段1" name="field1">
        <a-input v-model:value="formData.field1" />
      </a-form-item>
      <a-form-item label="字段2" name="field2">
        <a-input v-model:value="formData.field2" />
      </a-form-item>
      <a-form-item label="字段3" name="field3">
        <a-input v-model:value="formData.field3" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
