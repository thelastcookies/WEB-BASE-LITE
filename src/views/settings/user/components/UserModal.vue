<script setup lang="ts">
import type { UserRecord } from '@/api/admin/user/types';
import type { EditEnum as EditEnumType } from '@/constants/enums';
import type { FormInstance } from 'ant-design-vue/es/form/Form';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';

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
  Sex: SexEnum.MALE,
  State: UserStateEnum.ENABLE,
} as UserRecord);

const rules: Record<string, Rule[]> = {
  UserName: [{ required: true, message: '账号不可为空' }],
  RealName: [{ required: true, message: '姓名不可为空' }],
  RoleNames: [{ required: true, message: '角色不可为空' }],
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await formRef.value?.validate();
    const { Success, Msg } = await saveUser(formData.value);
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
    Sex: SexEnum.MALE,
    State: UserStateEnum.ENABLE,
  };
};

const fetch = async (id: string) => {
  if (id) {
    const res = await getUser(id);
    if (res.Data) formData.value = res.Data;
  }
};

watch(open, (v) => {
  if (v && props.id) {
    fetch(props.id);
  }
});

const roleList = ref<DefaultOptionType[]>([]);

const getRoles = async () => {
  const { Data } = await getRoleList({});
  if (!Data?.length) return;
  roleList.value = Data?.filter(item => item.Id !== 'Admin').map(item => {
    return {
      value: item.Id,
      label: item.RoleName,
    };
  });
};
getRoles();

</script>

<template>
  <a-modal v-model:open="open"
           :title="title"
           :confirm-loading="loading"
           ok-text="保存"
           @ok="handleSubmit"
           @cancel="handleClear"
  >
    <a-form ref="formRef" :model="formData" :label-col="{ span: 4 }"
            :rules="rules" :disabled="loading"
            :wrapper-col="{ span: 18 }" class="px-4 pt-4">
      <a-form-item label="账号" name="UserName">
        <a-input v-model:value="formData.UserName" />
      </a-form-item>
      <a-form-item label="姓名" name="RealName">
        <a-input v-model:value="formData.RealName" />
      </a-form-item>
      <a-form-item label="性别" name="Sex">
        <a-radio-group v-model:value="formData.Sex">
          <a-radio :value="SexEnum.MALE">男</a-radio>
          <a-radio :value="SexEnum.FEMALE">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="生日" name="BirthdayText">
        <a-input v-model:value="formData.BirthdayText" />
      </a-form-item>
      <a-form-item label="角色" name="RoleNames">
        <a-select allow-clear
                  show-search
                  option-filter-prop="label"
                  v-model:value="formData.RoleNames"
                  :options="roleList"
        />
      </a-form-item>
      <a-form-item label="备注" name="Remark">
        <a-textarea v-model:value="formData.Remark" />
      </a-form-item>
      <a-form-item label="状态" name="State">
        <a-switch
          v-model:checked="formData.State"
          checked-value="1" un-checked-value="0"
          checked-children="启用" un-checked-children="禁用"></a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
