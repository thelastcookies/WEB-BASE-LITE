<script setup lang="ts">
import type { RoleRecord } from '@/api/admin/role/types';
import type { FormInstance } from 'ant-design-vue/es/form/Form';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { EditEnum as EditEnumType } from '@/constants/enums';

const open = defineModel('open', { default: false });

const props = withDefaults(defineProps<{
  id?: string;
  type: EditEnumType;
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
const formData = ref({
  RoleType: RoleTypeEnum.NORMAL,
} as RoleRecord);

const rules: Record<string, Rule[]> = {
  RoleName: [{ required: true, message: '角色名不可为空' }],
  RoleType: [{ required: true, message: '角色类型不可为空' }],
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await formRef.value?.validate();
    const { Success, Msg } = await saveRole(formData.value);
    if (Success) {
      message.success('保存成功');
      emit('submit');
      handleClear();
      open.value = false;
    } else {
      message.error({ content: '保存失败，' + Msg });
    }
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
  formData.value = {
    RoleType: RoleTypeEnum.NORMAL,
  };
};

const fetch = async (id: string) => {
  if (id) {
    const res = await getRole(id);
    if (res.Data) formData.value = res.Data;
  }
};

watch(open, (v) => {
  if (v && props.id) {
    fetch(props.id);
  }
});

</script>

<template>
  <a-modal v-model:open="open"
           :title="title"
           :confirm-loading="loading"
           ok-text="保存"
           @ok="handleSubmit"
           @cancel="handleClear"
  >
    <a-form ref="formRef" :model="formData" :label-col="{ span: 5 }"
            :rules="rules" :disabled="loading"
            :wrapper-col="{ span: 18 }" class="px-4 pt-4">
      <a-form-item label="角色名" name="RoleName">
        <a-input v-model:value="formData.RoleName" />
      </a-form-item>
      <a-form-item label="角色类型" name="RoleType">
        <a-select v-model:value="formData.RoleType" :options="roleTypeOptions" />
      </a-form-item>
      <a-form-item label="备注" name="Remark">
        <a-textarea v-model:value="formData.Remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
