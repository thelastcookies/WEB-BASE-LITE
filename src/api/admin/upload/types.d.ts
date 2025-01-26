import type { UploadFileStatus } from 'ant-design-vue/es/upload/interface';

export interface UploadResponseBody {
  name: string;
  status: UploadFileStatus;
  thumbUrl: string;
  url: string;
}
