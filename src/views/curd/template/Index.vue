<script setup lang="ts">
import EditModal from '@/views/curd/template/components/EditModal.vue';
import { mockData, queryFields, tableColumns } from '@/views/curd/template/index.ts';
import type { TablePaginationConfig } from 'ant-design-vue';
import type { Key, Recordable } from '@/types';
import type QueryForm from '@/components/common/query-form/QueryForm.vue';
import type { TemplateMockRecord } from '@/views/curd/template/types';
import type { EditEnum as EditEnumType } from '@/constants/enums';

/**
 * 查询栏
 */
const queryFormRef = ref<InstanceType<typeof QueryForm> | null>(null);
const qForm = ref<Recordable<any>>({});
const qFormExpand = ref(false);

const handleQuery = async () => {
  pagination.value.current = 1;
  await fetch();
};

onMounted(() => {
  handleQuery();
});

/**
 * table 属性与方法
 */
const list = ref<TemplateMockRecord[]>([]);
const loading = ref(false);

const selectedRowKeys = ref<Key[]>([]);
const onSelectionChange = (keys: Key[]) => {
  selectedRowKeys.value = keys;
};

const fetch = async () => {
  loading.value = true;
  const Data = mockData;
  if (Data) {
    list.value = Data?.data!;
    pagination.value.total = Data?.total!;
  }
  loading.value = false;
};

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
const modalOpen = ref<boolean>(false);
const modalType = ref<EditEnumType>(EditEnum.VIEW);
const modalData = ref<TemplateMockRecord>({});

const handleEdit = (type: EditEnumType, data?: TemplateMockRecord) => {
  modalOpen.value = true;
  modalType.value = type;
  if (type === EditEnum.EDIT || type === EditEnum.VIEW) {
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
      await fetch();
    } else {
      message.error('删除失败');
    }
  } catch (e) {
    message.error('删除失败');
  }
};
</script>

<template>
  <div class="w-full h-full p-3 overflow-y-auto">
    <QueryForm class="py-2"
      ref="queryFormRef" :fields="queryFields"
      v-model:form="qForm"
      v-model:expand="qFormExpand"
      @query="handleQuery"
      :itemInLine="4"></QueryForm>
    <FixedTable class="h-[calc(100%-60px)]"
      id="table" row-key="id" :loading="loading"
      :columns="tableColumns" :data-source="list"
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
          <div>列表CURD</div>
          <a-button ml-auto type="primary"
            @click="handleEdit(EditEnum.ADD)">
            <BaseIcon icon="i-mdi-plus" />
            新增
          </a-button>
          <a-popconfirm
            title="是否确认删除?"
            @confirm="handleBatchDelete">
            <a-button ml-2 danger>
              <BaseIcon icon="i-mdi-trash-can-outline" />
              删除
            </a-button>
          </a-popconfirm>
          <BaseExport export-name="列表CURD" dom-id="table"></BaseExport>
        </div>
      </template>
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button btn-in-table type="link" @click="handleEdit(EditEnum.VIEW, record)">查看</a-button>
          <a-divider type="vertical" />
          <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确定删除？"
            @confirm="handleDelete(record.id)">
            <a-button btn-in-table danger type="link">删除</a-button>
          </a-popconfirm>
        </template>
        <template v-else-if="column.dataIndex === 'index'">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </template>
      </template>
    </FixedTable>
    <EditModal
      v-model:open="modalOpen"
      :type="modalType"
      :data="modalData"
      @submit="fetch"
    ></EditModal>
  </div>
</template>

<style scoped lang="less">

</style>
