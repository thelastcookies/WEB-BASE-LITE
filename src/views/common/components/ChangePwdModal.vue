<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { ChangePwdRequestBody } from '@/api/admin/home/types';

interface ChangePwdForm extends ChangePwdRequestBody {
  newPwdConfirm: string;
}

const open = defineModel('open', { default: false });

const emit = defineEmits<{
  (e: 'ok'): void
}>();

const formRef = ref<HTMLFormElement>();
const loading = ref(false);

const formData = ref<ChangePwdForm>({
  oldPwd: '',
  newPwd: '',
  newPwdConfirm: '',
});

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('新密码不可为空');
  } else {
    if (formData.value.newPwdConfirm !== '') {
      formRef.value!.validateFields('newPwdConfirm');
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入新密码');
  } else if (value !== formData.value.newPwd) {
    return Promise.reject('原密码与确认密码必须相同');
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  oldPwd: [{ required: true, message: '原密码不可为空' }],
  newPwd: [{ required: true, validator: validatePass }],
  newPwdConfirm: [{ validator: validatePass2 }],
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await formRef.value?.validate();
    const params = {
      oldPwd: formData.value.oldPwd,
      newPwd: formData.value.newPwd,
    };
    const { Success, Msg } = await changePwd(params);
    if (Success) {
      message.success('保存成功，注销中');
      open.value = false;
      emit('ok');
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
  open.value = false;
  formRef.value!.resetFields();
};
</script>

<template>
  <a-modal
    v-model:open="open"
    title="修改密码"
    :confirm-loading="loading"
    ok-text="保存"
    @ok="handleSubmit"
    @cancel="handleClear"
  >
    <a-alert mt-4 message="修改密码后需重新登录" type="info" show-icon closable />
    <a-form
      mt-4 pr-4
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :disabled="loading"
      @finish="handleSubmit"
    >
      <a-row>
        <a-col :span="24">
          <a-form-item label="原密码" name="oldPwd">
            <a-input-password v-model:value="formData.oldPwd" placeholder="请输入原密码" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="新密码" name="newPwd">
            <a-input-password v-model:value="formData.newPwd" placeholder="请输入新密码" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="确认密码" name="newPwdConfirm">
            <a-input-password v-model:value="formData.newPwdConfirm" placeholder="请再次输入新密码" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
