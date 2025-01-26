<script setup lang="ts">
import type { Recordable } from '@/types';
import type { UploadProps } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue/es/upload/interface';
import type { UploadResponseBody } from '@/api/admin/upload/types';

const formData = ref<Recordable<string>>({
  fileUrl: '',
});

const fileList = ref<UploadProps['fileList']>([]);

const handleUpload = ({ file }: UploadChangeParam) => {
  if (file.status === 'done') {
    // 上传成功后
    const { url } = file.response as UploadResponseBody;
    formData.value.fileUrl = url;
    message.success('上传成功');
  } else if (file.status === 'removed') {
    // 文件被移除后
    formData.value.fileUrl = '';
    message.success('移除成功');
  } else if (file.status === 'error') {
    // 上传错误时
    message.error('上传失败');
  } else if (file.status === 'uploading') {
    // 正在上传时
  }
};

const uploadedFile = {
  url: 'http://118.195.147.150:5011/Upload/0d50dade8587449fb117127e90d1e1e3/屏幕截图 2024-10-18 115214.jpg',
};

const uploadedFormData = ref<Recordable<string>>({
  fileUrl: '',
});
const uploadedFileList = ref<UploadProps['fileList']>([]);

onMounted(() => {
  // 模拟接口获取的文件 url
  const urlList = uploadedFile.url.split('/');
  const name = urlList[urlList.length - 1];
  uploadedFileList.value = [{
    uid: '-1',
    name,
    status: 'done',
    url: uploadedFile.url,
  }];
  uploadedFormData.value.fileUrl = uploadedFile.url;
});

</script>

<template>
  <a-row>
    <a-col :span="8">
      <a-form :model="formData"
        :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }"
        class="px-3 pt-3">
        <a-form-item label="文件上传" name="fileUrl">
          <BaseUpload :files="fileList" @upload="handleUpload"></BaseUpload>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="8">
      <div class="w-full flex p-8">
        <div>
          <div class="text-5">formData</div>
          <div v-for="(value, key) in formData">{{ key }}: {{ value }}</div>
        </div>
      </div>
    </a-col>
    <a-col :span="8">
      <div>
        <div class="text-5">fileList</div>
        <div v-for="(value, key) in fileList">{{ key }}: {{ value }}</div>
      </div>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="8">
      <a-form :model="uploadedFormData"
        :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }"
        class="px-3 pt-3">
        <a-form-item label="已上传内容的回显" name="fileUrl">
          <BaseUpload :files="uploadedFileList" @upload="handleUpload"></BaseUpload>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="8">
      <div class="w-full flex p-8">
        <div>
          <div class="text-5">uploadedFormData</div>
          <div v-for="(value, key) in uploadedFormData">{{ key }}: {{ value }}</div>
        </div>
      </div>
    </a-col>
    <a-col :span="8">
      <div class="w-full flex p-8">
        <div>
          <div class="text-5">uploadedFileList</div>
          <div v-for="(value, key) in uploadedFileList">{{ key }}: {{ value }}</div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>
