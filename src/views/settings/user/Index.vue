<script setup lang="ts">
import type { Key, Recordable } from '@/types';
import type { TablePaginationConfig } from 'ant-design-vue';
import type { UserRecord } from '@/api/admin/user/types';

/**
 * table 属性与方法
 */
const selectedRowKeys = ref<Key[]>([]);
const list = ref([] as UserRecord[]);
const loading = ref(false);

const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 20,
  showSizeChanger: true,
});

const handleTableChange = (p: TablePaginationConfig) => {
  pagination.value.current = p.current ?? 1;
  pagination.value.pageSize = p.pageSize ?? 20;
  fetch();
};

/**
 * 模态框
 */
const modalOpen = ref(false);
const modalType = ref(EditEnum.ADD);
const modalData = ref({} as UserRecord);

/**
 * 数据交互与处理方法
 */
const qForm = ref<Recordable<any>>({});
const fetch = async () => {
  loading.value = true;
  const res = await getUserList({ Search: qForm.value });
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

const handleEdit = (type: number, data?: UserRecord) => {
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
    const { Success } = await deleteUser(ids);
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
      :fields="userTableSearchFields"
      v-model:form="qForm"
      @query="onQuery"
    />
    <FixedTable class="h-[calc(100%-60px)]"
      id="user-table" row-key="Id" :loading="loading"
      :columns="userTableColumns" :data-source="list"
      :pagination="pagination"
      @change="handleTableChange"
      :row-selection="{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectionChange,
          columnWidth: 50
        }">
      <template #title>
        <div class="flex">
          <div>用户列表</div>
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
          <a-button ml-2>
            <BaseIcon icon="i-mdi-login" />
            导入
          </a-button>
          <BaseExport export-name="用户表" dom-id="user-table" />
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record as UserRecord)">编辑</a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确定删除？"
            @confirm="handleDelete(record.Id)"
          >
            <a-button btn-in-table danger type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </FixedTable>
    <UserModal
      v-model:open="modalOpen"
      :type="modalType"
      :id="modalData.Id"
      @submit="handleReload"
    ></UserModal>
  </div>
</template>
