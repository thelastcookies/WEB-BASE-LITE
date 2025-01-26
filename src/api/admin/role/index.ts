import type { AdminResponseBody } from '@/api/admin/types';
import type { GetRoleListRequestBody, RoleRecord } from '@/api/admin/role/types';

export const getRoleList = (data: GetRoleListRequestBody) => {
  return usePost<AdminResponseBody<RoleRecord[]>, GetRoleListRequestBody>(
    `${ADMIN_URL}/Base_Manage/Base_Role/GetDataList`,
    data,
  );
};

export const getRole = (id: string) => {
  return usePost<AdminResponseBody<RoleRecord>, Record<string, string>>(
    `${ADMIN_URL}/Base_Manage/Base_Role/GetTheData`,
    { id },
  );
};

export const saveRole = (data: RoleRecord) => {
  return usePost<AdminResponseBody, RoleRecord>(
    `${ADMIN_URL}/Base_Manage/Base_Role/SaveData`,
    data,
    {
      token: true,
    },
  );
};

export const deleteRole = (ids: string[]) => {
  return usePost<AdminResponseBody, string[]>(
    `${ADMIN_URL}/Base_Manage/Base_Role/DeleteData`,
    ids,
    {
      token: true,
    },
  );
};
