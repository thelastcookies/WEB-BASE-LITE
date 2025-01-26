import type { UserRecord } from '@/api/admin/user/types';

export const useUserStore = defineStore('user', () => {
  const userInfo = shallowRef({} as UserRecord);
  const permCodes = shallowRef([] as string[]);

  const getUserInfo = async () => {
    return new Promise<void | Error>((resolve, reject) => {
      const { loginEnable } = useAppStore();
      // 如果关闭了路由守卫
      if (!loginEnable) {
        userInfo.value = { Id: 'ROUTER_GUARD_DISABLE_PLACEHOLDER' };
        return resolve();
      }
      // 获取用户信息
      getOperatorInfo().then(res => {
        if (!res.Success) {
          reject(new Error(WITH_UNAUTHORIZED));
        } else {
          userInfo.value = res.Data!.UserInfo;
          permCodes.value = res.Data!.Permissions;
          resolve();
        }
      }).catch(e => reject(e));
    });
  };

  const hasPerm = (code: string | string[]) => {
    const codes = (isArray(code) ? code : [code]) as string[];
    return codes.some(c => permCodes.value.includes(c));
  };

  const $reset = () => {
    userInfo.value = {};
    permCodes.value = [];
  };

  return {
    userInfo,
    hasPerm,
    getUserInfo,
    $reset,
  };
});

