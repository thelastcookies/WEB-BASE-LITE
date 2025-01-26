import type { TableColumnProps } from 'ant-design-vue';
import type { QueryFormField } from '@/components/common/query-form/types';

export enum UserStateEnum {
  ENABLE = '1',
  DISABLE = '0',
}

export const userTableColumns: TableColumnProps[] = [
  {
    title: '账号',
    dataIndex: 'UserName',
  },
  {
    title: '用户名',
    width: 120,
    dataIndex: 'RealName',
  },
  {
    title: '性别',
    width: 80,
    dataIndex: 'SexText',
  },
  {
    title: '生日',
    dataIndex: 'BirthdayText',
  },
  {
    title: '角色',
    dataIndex: 'RoleNames',
  },
  {
    title: '备注',
    dataIndex: 'Remark',
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'State',
    customRender: ({ text }) => {
      let color = '';
      let label = '';
      if (text === UserStateEnum.ENABLE) {
        color = 'processing';
        label = '启用';
      } else if (text === UserStateEnum.DISABLE) {
        color = 'error';
        label = '禁用';
      }
      return h(Tag, { color }, () => label);
    },
  },
  {
    title: '操作',
    width: 160,
    dataIndex: 'operation',
  },
];

export const userTableSearchFields: QueryFormField[] = [
  {
    label: '关键字',
    field: 'keyword',
    component: 'Input',
    compProps: {
      placeholder: '请输入关键字',
    },
  },
];

