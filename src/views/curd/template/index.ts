import type { QueryFormField } from '@/components/common/query-form/types';
import type { TableColumnProps } from 'ant-design-vue';
import type { TemplateMockRecord } from '@/views/curd/template/types';

export const queryFields: QueryFormField[] = [
  {
    label: '文本',
    field: 'inputName',
    component: 'Input',
    compProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      placeholder: '请选择',
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '起止时间',
    field: 'RangePickerName',
    component: 'RangePicker',
    compProps: {
      placeholder: ['请选择开始时间', '请选择结束时间'],
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '下拉框多选',
    field: 'selectMultiName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },

];

export const tableColumns: TableColumnProps[] = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'index',
  },
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: '字段1',
    dataIndex: 'field1',
  },
  {
    title: '字段2',
    dataIndex: 'field2',
  },
  {
    title: '字段3',
    dataIndex: 'field3',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
  },
];

export const mockData = {
  'success': true,
  'errorCode': 0,
  'msg': 'string',
  'data': <TemplateMockRecord[]>[
    {
      id: '1',
      field1: 'r1field1',
      field2: 'r1field2',
      field3: 'r1field3',
    }, {
      id: '2',
      field1: 'r2field1',
      field2: 'r2field2',
      field3: 'r2field3',
    }, {
      id: '3',
      field1: 'r3field1',
      field2: 'r3field2',
      field3: 'r3field3',
    }, {
      id: '4',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '5',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '6',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '7',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '8',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '9',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '10',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '11',
      field1: 'r1field1',
      field2: 'r1field2',
      field3: 'r1field3',
    }, {
      id: '12',
      field1: 'r2field1',
      field2: 'r2field2',
      field3: 'r2field3',
    }, {
      id: '13',
      field1: 'r3field1',
      field2: 'r3field2',
      field3: 'r3field3',
    }, {
      id: '14',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '15',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '16',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '17',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '18',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '19',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    }, {
      id: '20',
      field1: 'r4field1',
      field2: 'r4field2',
      field3: 'r4field3',
    },
  ],
  'total': 256,
};
