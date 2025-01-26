<script setup lang="ts">
import type { QueryFormField } from '@/components/common/query-form/types';
import type { Rule } from 'ant-design-vue/es/form';
import type { Recordable } from '@/types';

const queryFields: QueryFormField[] = [
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
    label: '时间',
    field: 'DatePickerName',
    component: 'DatePicker',
    compProps: {
      placeholder: '请选择时间',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '起止时间',
    field: 'RangePickerName',
    component: 'RangePicker',
    compProps: {
      placeholder: ['请选择开始时间', '请选择结束时间'],
    },
  },
  {
    label: '起止月份',
    field: 'MonthRangePickerName',
    component: 'RangePicker',
    compProps: {
      picker: 'month',
      placeholder: ['请选择开始月份', '请选择结束月份'],
    },
  },
];

// TODO 时区问题
const qForm = ref<Recordable<any>>({
  inputName: '1234',
  RangePickerName: [dayjs().subtract(8, 'h'), dayjs()],
  MonthRangePickerName: [dayjs(), dayjs()],
});
const onQuery = (form: Record<string, string>) => {
  qForm.value = form;
};

const rules: Record<string, Rule[]> = {
  inputName: [
    { required: true, message: '文本内容不可为空' },
    { min: 3, max: 5, message: '文本内容长度要在 3 到 5 之间' },
  ],
  DatePickerName: [{ required: true, message: '时间选择不可为空' }],
  RangePickerName: [{
    validator(_, value) {
      if (!value || value.length !== 2) {
        return Promise.reject('请选择时间范围');
      }
      const [start, end] = value;
      if (dayjs(start).isSame(end, 'month')) {
        return Promise.resolve();
      }
      return Promise.reject('起止时间不可跨月');
    },
  }],
};

const checkFields: QueryFormField[] = [
  {
    label: '单选组',
    field: 'RadioName',
    component: 'Radio',
    compProps: {
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
    label: '多选组',
    field: 'CheckboxName',
    component: 'Checkbox',
    compProps: {
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
    label: '多选组全选',
    field: 'CheckboxAllName',
    component: 'Checkbox',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    compProps: {
      selectAllEnable: true,
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
const cForm = ref<Recordable<any>>({
  RadioName: 'valueA',
  CheckboxName: ['valueA'],
  CheckboxAllName: ['valueA', 'valueB', 'valueC', 'valueD'],
});

const selectFields: QueryFormField[] = [
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
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
  {
    label: '下拉框全选',
    field: 'selectAllName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      selectAllEnable: true,
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
    label: 'Api下拉框',
    field: 'apiSelectName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      getOptions: async () => {
        const res = await getUserList({});
        return res.Data!.map(user => {
          return {
            label: user.RealName,
            value: user.Id,
          };
        });
      },
    },
  },
  {
    label: '树下拉框',
    field: 'TreeSelectName',
    component: 'TreeSelect',
    compProps: {
      treeNodeFilterProp: 'label',
      treeData: [{
        label: '选项A',
        value: 'valueA',
        children: [{
          label: '选项AA',
          value: 'valueAA',
        }, {
          label: '选项AB',
          value: 'valueAB',
        }],
      }, {
        label: '选项B',
        value: 'valueB',
        children: [{
          label: '选项BA',
          value: 'valueBA',
        }, {
          label: '选项BB',
          value: 'valueBB',
        }, {
          label: '选项BC',
          value: 'valueBC',
        }],
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
    label: '树平铺格式',
    field: 'TreeIdPidName',
    component: 'TreeSelect',
    compProps: {
      treeCheckable: true,
      treeDataSimpleMode: true,
      treeNodeFilterProp: 'label',
      treeData: [{
        id: 'valueA',
        pId: null,
        label: '选项A',
        value: 'valueA',
      }, {
        id: 'valueAA',
        pId: 'valueA',
        label: '选项AA',
        value: 'valueAA',
      }, {
        id: 'valueAB',
        pId: 'valueA',
        label: '选项AB',
        value: 'valueAB',
      }, {
        id: 'valueAC',
        pId: 'valueA',
        label: '选项AC',
        value: 'valueAC',
      }, {
        id: 'valueB',
        pId: null,
        label: '选项B',
        value: 'valueB',
      }, {
        id: 'valueBA',
        pId: 'valueB',
        label: '选项BA',
        value: 'valueBA',
      }, {
        id: 'valueBB',
        pId: 'valueB',
        label: '选项BB',
        value: 'valueBB',
      }, {
        id: 'valueBC',
        pId: 'valueB',
        label: '选项BC',
        value: 'valueBC',
      }],
    },
  },
  {
    label: 'Api树下拉框',
    field: 'apiTreeSelectName',
    component: 'TreeSelect',
    compProps: {
      fieldNames: {
        value: 'Id',
        label: 'Name',
        children: 'Children',
      },
      treeCheckable: true,
      getTreeData: async () => {
        const res = await getMenuTreeList({});
        return createTree(res.Data!);
      },
    },
  }];
const sForm = ref<Recordable<any>>({
  selectName: 'valueA',
  selectAllName: ['valueA', 'valueB', 'valueC', 'valueD'],
  apiSelectName: ['1522888670812573696', '1181928860648738816', 'Admin'],
});

</script>
<template>
  <div class="w-full">
    <a-divider>文本，时间，插槽与校验</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="queryFields"
        :rules="rules"
        v-model:form="qForm"
        @query="onQuery"
      >
        <div class="flex justify-between">
          <BaseIcon icon="i-mdi:flag-triangle" class="c-red" />
          插槽内容
          <BaseIcon icon="i-mdi:flag-triangle" class="c-green" />
        </div>
      </QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="w-50% pl-8">
        <div class="text-5">QueryForm</div>
        <div v-for="(value, key) in qForm">{{ key }}: {{ value }}</div>
      </div>
      <div class="w-50% pl-8">
        <div class="text-5">Rules</div>
        <div v-for="(value, key) in rules">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <a-divider>单选、多选框</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="checkFields"
        v-model:form="cForm"
      ></QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="pl-8">
        <div class="text-5">CheckableForm</div>
        <div v-for="(value, key) in cForm">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <a-divider>选择器、树选择器</a-divider>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="selectFields"
        v-model:form="sForm"
      ></QueryForm>
    </div>
    <div class="w-full flex p-8">
      <div class="pl-8">
        <div class="text-5">SelectableForm</div>
        <div v-for="(value, key) in sForm">{{ key }}: {{ value }}</div>
      </div>
    </div>
  </div>
</template>
