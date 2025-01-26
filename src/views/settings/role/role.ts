import type { TableColumnProps } from 'ant-design-vue';
import type { QueryFormField } from '@/components/common/query-form/types';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';
import type { RoleRecord } from '@/api/admin/role/types';

export const roleTypeOptions: DefaultOptionType[] = [
  {
    value: RoleTypeEnum.SUPER_ADMIN,
    label: '超级管理员',
    disabled: true,
  },
  {
    value: RoleTypeEnum.LEADER,
    label: '部门管理员',
  },
  {
    value: RoleTypeEnum.NORMAL,
    label: '普通角色',
  },
];

export const roleTableColumns: TableColumnProps[] = [
  {
    title: '角色名',
    dataIndex: 'RoleName',
    width: 200,
  },
  {
    title: '角色类型',
    dataIndex: 'RoleType',
    width: 200,
    customRender: ({ record }) => {
      return roleTypeOptions.find(it => it.value === (record as RoleRecord).RoleType)?.label;
    },
  },
  {
    title: '备注',
    dataIndex: 'Remark',
  },
  {
    title: '操作',
    width: 160,
    dataIndex: 'operation',
  },
];

export const roleTableSearchFields: QueryFormField[] = [
  {
    label: '角色名',
    field: 'roleName',
    component: 'Input',
    compProps: {
      placeholder: '请输入角色名',
    },
  },
];
