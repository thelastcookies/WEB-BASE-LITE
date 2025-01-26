import type { RoleTypeEnum, SexEnum } from '@/constants/enums';

export interface GetUserListRequestBody {
  PageIndex?: number;
  PageRows?: number;
  SortField?: string;
  SortType?: string;
  Search?: {
    all?: boolean;
    userId?: string;
    keyword?: string;
    userName?: string;
    roleId?: string;
  };
}

export interface SaveUserRequestBody {
  Id?: string;
  CreateTime?: string;
  CreatorId?: string;
  Deleted?: boolean;
  UserName?: string;
  Password?: string;
  RealName?: string;
  Sex?: SexEnum;
  Birthday?: string;
  DepartmentId?: string;
  OrgId?: string;
  State?: string;
  Remark?: string;
  newPwd?: string;
  RoleIdList?: string[];
}

export interface UserListOptionItem {
  value: string;
  text: string;
}

export interface UserRecord {
  Id?: string;
  CreateTime?: string;
  CreatorId?: string;
  Deleted?: false,
  UserName?: string;
  Password?: string;
  RealName?: string;
  Sex?: SexEnum;
  Birthday?: string;
  DepartmentId?: string;
  OrgId?: string;
  State?: string;
  Remark?: string;
  RoleNames?: string;
  RoleIdList?: string[];
  RoleNameList?: string[];
  RoleType?: RoleTypeEnum;
  DepartmentName?: string;
  SexText?: string;
  BirthdayText?: string;
}

