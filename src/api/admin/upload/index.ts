import type { UploadResponseBody } from '@/api/admin/upload/types';

export const upload = (file: File) => {
  return usePost<UploadResponseBody, Record<string, File>>(
    `${ADMIN_URL}/Base_Manage/Upload/UploadFileByForm`,
    {
      formFile: file,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

