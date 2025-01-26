/**
 * 定义 枚举
 */

/**
 * 加载 Action 模式
 * FRONTEND 模式从 static-actions.ts 中加载
 * BACKEND 模式向接口请求加载
 */
export enum LoadActionTypeEnum {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
}

export enum StatusEnum {
  OFF = '0',
  RUNNING = '1',
  ONLINE = '2',
  ERROR = '3',
}

/**
 * 菜单页面类型
 */
export enum MenuTypeEnum {
  // 菜单类型
  MENU = 0,
  // 页面类型，实际关联 .vue 文件
  PAGE = 1,
  // 权限类型
  PERM = 2,
  // 外链
  LINK = 3,
  // iframe
  IFRAME = 4,
}

/**
 * 角色类型
 */
export enum RoleTypeEnum {
  NORMAL = 0,
  SUPER_ADMIN = 1,
  LEADER = 2
}

/**
 * 步骤
 */
export enum StepEnum {
  STEP1,
  STEP2,
  STEP3,
  STEP4,
  STEP5,
  STEP6,
  STEP7,
  STEP8,
}

export enum EditEnum {
  ADD,
  EDIT,
  VIEW
}

export enum SexEnum {
  FEMALE,
  MALE
}

export enum HisDataType {
  'TAG',
  'TIME',
  'TAG_ARR',
  'TIME_ARR',
  'TIME_VALUE_ARR',
}
