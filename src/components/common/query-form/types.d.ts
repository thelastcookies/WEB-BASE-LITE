import type { ColProps } from 'ant-design-vue';

export type QueryFormComponentType =
  'Input'
  | 'Select'
  | 'TreeSelect'
  | 'Radio'
  | 'Checkbox'
  | 'DatePicker'
  | 'RangePicker';

export interface QueryFormField {
  label?: string;
  field: string;
  component: QueryFormComponentType;
  colSpan?: string | number;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  compProps?: any;
}
