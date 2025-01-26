<script setup lang="ts">
import type { Key, Recordable } from '@/types';
import type { RoleRecord } from '@/api/admin/role/types';
import type { ActionResponseRecord } from '@/api/admin/action/types';
import type { TreeNode } from '@/utils/tree';

/**
 * table 属性与方法
 */
const selectedRowKeys = ref<Key[]>([]);
const currentRole = ref<RoleRecord>();
const roleList = ref([] as RoleRecord[]);
const loading = ref(false);
const roleTableCols = roleTableColumns.filter(item => item.dataIndex !== 'operation');

/**
 * actionTree 属性与方法
 */
const checkedActions = ref<{
  checked: Key[];
  halfChecked: Key[];
}>({
  checked: [],
  halfChecked: [],
});
const submitLoading = ref(false);

/**
 * 数据交互与处理方法
 */
const qForm = ref<Recordable<any>>({});
const actionTreeData = ref<TreeNode<ActionResponseRecord>[]>();

const fetch = async () => {
  loading.value = true;
  const res = await getRoleList({ Search: qForm.value });
  if (res.Data) roleList.value = res.Data;
  const { Data } = await getActionTreeList({});
  if (Data) actionTreeData.value = createTree(Data);
  loading.value = false;
};

const onQuery = (form: Record<string, string>) => {
  qForm.value = form;
  fetch();
};

fetch();

const handleReload = async () => {
  selectedRowKeys.value = [];
  checkedActions.value = {
    checked: [],
    halfChecked: [],
  };
  await fetch();
};

watch(selectedRowKeys, (keys) => {
  if (keys.length) {
    currentRole.value = roleList.value.find(item => item.Id === keys[0]);
    checkedActions.value.checked = currentRole.value!.Actions as string[];
  }
});

const customRow = (record: RoleRecord) => {
  return {
    onClick: () => {
      selectedRowKeys.value = [record.Id!];
    },
  };
};

const onSelectionChange = (keys: Key[]) => {
  selectedRowKeys.value = keys;
};

const handleSubmit = async () => {
  submitLoading.value = true;
  try {
    const params = Object.assign(currentRole.value!, {
      Actions: checkedActions.value.checked as string[],
    });
    const { Success, Msg } = await saveRole(params);
    if (Success) {
      message.success('保存成功');
      await handleReload();
    } else {
      message.error({ content: '保存失败，' + Msg });
    }
  } catch (e) {
    message.error('保存失败');
  }
  submitLoading.value = false;
};

</script>

<template>
  <div class="w-full h-full p-3 flex gap-3">
    <div class="w-50% bg-ant.bg-container rounded-ant.br p-3">
      <QueryForm
        class="py-2"
        :item-in-line="2"
        :fields="roleTableSearchFields"
        v-model:form="qForm"
        @query="onQuery"
      />
      <div class="h-[calc(100%-60px)]">
        <a-table
          row-key="Id"
          :columns="roleTableCols" :data-source="roleList"
          :pagination="false"
          :row-selection="{
            type: 'radio',
            selectedRowKeys: selectedRowKeys,
            columnWidth: 50,
            onChange: onSelectionChange,
          }"
          :custom-row="customRow"
          :loading="loading"
        >
          <template #title>
            <div class="flex">
              <div>角色列表</div>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <div class="w-50% h-full bg-ant.bg-container rounded-ant.br p-3 flex flex-col">
      <template v-if="selectedRowKeys.length">
        <div class="w-full h-12 flex justify-end pb-4 sticky top-0">
          <a-button class="ml-2" type="primary" :loading="submitLoading" @click="handleSubmit">
            <BaseIcon icon="i-mdi-content-save" />
            保存
          </a-button>
        </div>
        <ActionTree
          searchable
          checkable
          default-expand-all
          :tree="actionTreeData"
          v-model:checked-keys="checkedActions"
        />
      </template>
      <template v-else>
        <a-empty class="mt-25%" :image="Empty.PRESENTED_IMAGE_SIMPLE">
          <template #description>
            请在左侧选择角色进行配置
          </template>
        </a-empty>
      </template>
    </div>
  </div>
</template>
