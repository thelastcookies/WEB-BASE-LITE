<script setup lang="ts">
const list = [
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
  },
];
const columns = [
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
</script>

<template>
  <a-table id="table" row-key="id" class="px-5"
    :columns="columns" :data-source="list"
    :pagination="{showSizeChanger: true}"
    :row-selection="{}"
  >
    <template #title>
      <div class="flex">
        <div>导出表格示例<span class="ml-10">注：左侧多选框，表格标题以及操作按钮，行内操作按钮，表格分页器不会被导出</span>
        </div>
        <BaseExport class="ml-a" export-name="导出表格" dom-id="table"></BaseExport>
      </div>
    </template>
    <template #bodyCell="{ column, index }">
      <template v-if="column.dataIndex === 'operation'">
        <a-button btn-in-table type="link">查看</a-button>
        <a-divider type="vertical" />
        <a-button btn-in-table type="link">编辑</a-button>
        <a-divider type="vertical" />
        <a-button btn-in-table danger type="link">删除</a-button>
      </template>
      <template v-else-if="column.dataIndex === 'index'">
        {{ index + 1 }}
      </template>
    </template>
  </a-table>
</template>
