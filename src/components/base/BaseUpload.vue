<script setup lang="ts">
import type { UploadProps } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue/es/upload/interface';

const files = defineModel<UploadProps['fileList']>('files');

const emit = defineEmits<{
  (e: 'upload', params: UploadChangeParam): void
}>();

const handleChange = (params: UploadChangeParam) => {
  emit('upload', params);
};

</script>

<template>
  <a-upload
    name="formFile"
    v-model:file-list="files"
    list-type="picture"
    :max-count="1"
    :action="`${ADMIN_URL}/Base_Manage/Upload/UploadFileByForm`"
    @change="handleChange"
  >
    <a-button>
      <BaseIcon icon="i-mdi-upload" />
      上传
    </a-button>
  </a-upload>
</template>
