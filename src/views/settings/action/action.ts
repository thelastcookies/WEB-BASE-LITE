import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';

export const menuTypeOptions: DefaultOptionType[] = [
  {
    value: MenuTypeEnum.MENU,
    label: '菜单',
  },
  {
    value: MenuTypeEnum.PAGE,
    label: '页面',
  },
  {
    value: MenuTypeEnum.LINK,
    label: '外链',
  },
  {
    value: MenuTypeEnum.IFRAME,
    label: 'IFrame',
  }
];

export const permTableColumns: TableEditableColumnProps[] = [
  {
    title: '权限名称',
    dataIndex: 'Name',
    width: 250,
    editable: true,
  },
  {
    title: '配置值',
    dataIndex: 'Value',
    editable: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 160,
  },
];

export const metaTableColumns: TableEditableColumnProps[] = [
  {
    title: '键',
    dataIndex: 'key',
    width: 250,
    editable: true,
  },
  {
    title: '值',
    dataIndex: 'value',
    editable: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 160,
  },
];
