import type { AdminResponseBody } from '@/api/admin/types';
import type { ActionResponseRecord, GetActionsRequestBody, PermissionRecord } from '@/api/admin/action/types';

export const getAction = (id: string) => {
  return usePost<AdminResponseBody<ActionResponseRecord>, Record<string, string>>(
    `${ADMIN_URL}/Base_Manage/Base_Action/GetTheData`,
    { id },
  );
};

export const getPermissionList = (data: GetActionsRequestBody) => {
  return usePost<AdminResponseBody<PermissionRecord[]>, GetActionsRequestBody>(
    `${ADMIN_URL}/Base_Manage/Base_Action/GetPermissionList`,
    data,
  );
};

export const getAllActionList = () => {
  return usePost<AdminResponseBody<ActionResponseRecord[]>>(
    `${ADMIN_URL}/Base_Manage/Base_Action/GetAllActionList`,
  );
};

// 会将权限的内容仅放在 permission 相关字段中
export const getMenuTreeList = (data: GetActionsRequestBody) => {
  return usePost<AdminResponseBody<ActionResponseRecord[]>, GetActionsRequestBody>(
    `${ADMIN_URL}/Base_Manage/Base_Action/GetMenuTreeList`,
    data,
  );
};

// 会将权限的内容放在 permission 相关字段与 children 中
export const getActionTreeList = (data: GetActionsRequestBody) => {
  return usePost<AdminResponseBody<ActionResponseRecord[]>, GetActionsRequestBody>(
    `${ADMIN_URL}/Base_Manage/Base_Action/GetActionTreeList`,
    data,
  );
};

export const saveAction = (data: ActionResponseRecord) => {
  return usePost<AdminResponseBody, ActionResponseRecord>(
    `${ADMIN_URL}/Base_Manage/Base_Action/SaveData`,
    data,
  );
};

export const deleteAction = (ids: string[]) => {
  return usePost<AdminResponseBody, string[]>(
    `${ADMIN_URL}/Base_Manage/Base_Action/DeleteData`,
    ids,
  );
};
