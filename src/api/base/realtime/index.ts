import type { AdminResponseBody } from '@/api/admin/types';
import type { TagsRequestBody, ValueResponseBody } from '@/api/base/types';

export const getRealtime = (tags: string) => {
  return usePost<AdminResponseBody<ValueResponseBody>, TagsRequestBody>(
    `${ADMIN_URL}/RealTime/GetReal`,
    { tags },
  );
};
