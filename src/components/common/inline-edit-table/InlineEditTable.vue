<script setup lang="ts">
import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';

const dataSource = defineModel<any[]>('dataSource', {
  default: () => [],
});

withDefaults(defineProps<{
  columns: TableEditableColumnProps[],
}>(), {
  columns: () => [],
});

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'update:dataSource'): void;
}>();

const editableData: Record<string, any> = reactive({});

const handleAdd = () => {
  const oldLen = dataSource.value.length ?? 0;
  emit('add');
  nextTick(() => {
    const newLen = dataSource.value.length;
    if (newLen === oldLen + 1) handleEdit(dataSource.value.length - 1);
  });
};
const handleEdit = (idx: number) => {
  editableData[idx] = cloneDeep(dataSource.value[idx]);
};
const handleSave = (idx: number) => {
  Object.assign(dataSource.value[idx], editableData[idx]);
  delete editableData[idx];
};
const handleCancel = (idx: number) => {
  delete editableData[idx];
};
const handleDelete = (idx: number) => {
  delete editableData[idx];
  dataSource.value.splice(idx, 1);
};
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false">
    <template #headerCell="{title, column}">
      <template v-if="column.dataIndex === 'operation'">
        <div class="flex justify-evenly">
          <span>{{ title }}</span>
          <a-button type="primary" size="small"
                    @click="handleAdd">新增
          </a-button>
        </div>
      </template>
    </template>
    <template #bodyCell="{ column, text, index }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <div v-if="editableData[index]" class="flex justify-evenly">
            <a-button type="link" size="small" @click="handleSave(index)">保存</a-button>
            <a-popconfirm title="是否取消当前变更？" @confirm="handleCancel(index)">
              <a-button type="link" size="small">取消</a-button>
            </a-popconfirm>
          </div>
          <div v-else class="flex justify-evenly">
            <a-button type="link" size="small" @click="handleEdit(index)">编辑</a-button>
            <a-popconfirm title="是否确定删除？" @confirm="handleDelete(index)">
              <a-button type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
          </div>
        </div>
      </template>
      <template v-else-if="(column as TableEditableColumnProps).editable">
        <div>
          <a-input
            v-if="editableData[index]"
            v-model:value="editableData[index][column.dataIndex as string]"
            class="ml--2"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
    </template>
  </a-table>
</template>
