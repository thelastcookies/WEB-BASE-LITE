<script setup lang="ts">
import type { Key, Recordable } from '@/types';
import type { RoleRecord } from '@/api/admin/role/types';

/**
 * table 属性与方法
 */
const selectedRowKeys = ref<Key[]>([]);
const list = ref([] as RoleRecord[]);
const loading = ref(false);

/**
 * 模态框
 */
const modalOpen = ref(false);
const modalType = ref(EditEnum.ADD);
const modalData = ref({} as RoleRecord);

/**
 * 数据交互与处理方法
 */
const qForm = ref<Recordable<any>>({});
const fetch = async () => {
  loading.value = true;
  const res = await getRoleList({ Search: qForm.value });
  if (res.Data) list.value = res.Data;
  loading.value = false;
};

const onQuery = (form: Record<string, string>) => {
  qForm.value = form;
  fetch();
};

fetch();

const handleReload = async () => {
  await fetch();
};

const onSelectionChange = (keys: Key[]) => {
  selectedRowKeys.value = keys;
};

const handleEdit = (type: number, data?: RoleRecord) => {
  modalOpen.value = true;
  modalType.value = type;
  if (type === EditEnum.EDIT) {
    if (data) modalData.value = { ...data };
  } else if (type === EditEnum.ADD) {
    modalData.value = {};
  }
};

const handleDelete = async (id: string) => {
  await batchDelete([id]);
};

const handleBatchDelete = async () => {
  await batchDelete(selectedRowKeys.value as string[]);
};

const batchDelete = async (ids: string[]) => {
  if (!ids.length) {
    message.warn('请至少选择一条记录');
    return;
  }
  try {
    const { Success } = await deleteRole(ids);
    if (Success) {
      message.success('删除成功');
      await handleReload();
    } else {
      message.error('删除失败');
    }
  } catch (e) {
    message.error('删除失败');
  }
};
</script>

<template>
  <div class="w-full h-full p-3">
    <QueryForm
      class="py-2"
      :fields="roleTableSearchFields"
      v-model:form="qForm"
      @query="onQuery"
    />
    <div class="h-[calc(100%-60px)]">
      <a-table
        row-key="Id"
        :columns="roleTableColumns" :data-source="list"
        :row-selection="{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectionChange,
          columnWidth: 50
        }"
        :loading="loading"
      >
        <template #title>
          <div class="flex">
            <div>角色列表</div>
            <a-button ml-auto type="primary"
              @click="handleEdit(EditEnum.ADD)">
              <BaseIcon icon="i-mdi-plus" />
              新增
            </a-button>
            <a-popconfirm
              title="是否确认删除?"
              @confirm="handleBatchDelete"
            >
              <a-button ml-2 danger>
                <BaseIcon icon="i-mdi-trash-can-outline" />
                删除
              </a-button>
            </a-popconfirm>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record as RoleRecord)">编辑</a-button>
            <a-divider type="vertical" />
            <a-popconfirm
              title="是否确认删除?"
              @confirm="handleDelete(record.Id)"
            >
              <a-button btn-in-table danger type="link">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
    <RoleModal
      v-model:open="modalOpen"
      :type="modalType"
      :id="modalData.Id"
      @submit="handleReload"
    ></RoleModal>
  </div>
</template>
