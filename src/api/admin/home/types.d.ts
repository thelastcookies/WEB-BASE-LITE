import type { UserRecord } from '@/api/admin/user/types';

export interface LoginRequestBody {
  userName: string;
  password: string;
}

export interface ChangePwdRequestBody {
  oldPwd: string;
  newPwd: string;
}

export interface UserNameRequestBody {
  userName: string;
}

export interface OperatorInfo {
  UserInfo: UserRecord;
  Permissions: string[];
}
