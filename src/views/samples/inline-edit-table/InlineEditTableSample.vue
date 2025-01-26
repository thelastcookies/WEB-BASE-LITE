<script setup lang="ts">
import InlineEditTable from '@/components/common/inline-edit-table/InlineEditTable.vue';
import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';

const tableData = ref([
  {
    fieldA: 'JYCVHZKUGJJSVWIT',
    fieldB: 'UDGJWSBVREUOBBJCD',
    fieldC: 'ZWIHVSMXSOXRXISMKQA',
    fieldD: 'QATUOJJARPJNCJXGLNLB',
    fieldE: 'VHCJGXBVIKFTBISYEAA',
  },
  {
    fieldA: '477000210210287',
    fieldB: '790872699693101',
    fieldC: '028175039600206',
    fieldD: '379232283539199',
    fieldE: '028940622792675',
  },
  {
    fieldA: 'vsdaofwjikakddi',
    fieldB: 'gsnvgvfyforywkz',
    fieldC: 'hkokewkbagtwvjr',
    fieldD: 'ntczrnkmpmhqwzl',
    fieldE: 'vnfxjtiuguljzsm',
  },
  {
    fieldA: '#~~^&_%((#!#&^&',
    fieldB: '%)$__)!_&((%@^*',
    fieldC: '_+$~#^^*(^)+^#@',
    fieldD: '~%!&$&*&)~)!$_!',
    fieldE: ')*^^&+)(^*!*)%)',
  },
]);

const tableColumns: TableEditableColumnProps[] = [
  {
    title: '字段A',
    dataIndex: 'fieldA',
    width: 250,
    editable: true,
  },
  {
    title: '字段B',
    dataIndex: 'fieldB',
    width: 250,
    editable: true,
  },
  {
    title: '字段C',
    dataIndex: 'fieldC',
    width: 250,
    editable: true,
  },
  {
    title: '字段D',
    dataIndex: 'fieldD',
    width: 250,
    editable: true,
  },
  {
    title: '字段E',
    dataIndex: 'fieldE',
    width: 250,
    editable: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 160,
    editable: true,
  },
];

const handleAdd = () => {
  tableData.value.push({
    fieldA: '1234567890-=',
    fieldB: 'qwertyuiop[]',
    fieldC: 'asdfghjkl;',
    fieldD: 'zxcvbnm,./',
    fieldE: '{}|:"<>?!@#',
  });
};
</script>

<template>
  <div class="w-full p-3 flex gap-3">
    <div class="w-70% flex justify-center">
      <InlineEditTable class="w-full"
        v-model:data-source="tableData"
        :columns="tableColumns"
        @add="handleAdd"
      ></InlineEditTable>
    </div>
    <div class="w-30%">
      <div class="text-5">TableData:</div>
      <div v-for="(item, idx) in tableData">
        <span class="">{{ idx }}: </span><span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>
