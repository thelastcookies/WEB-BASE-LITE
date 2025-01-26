<script setup lang="ts">
import type { ActionResponseRecord } from '@/api/admin/action/types';
import type { TreeNode } from '@/utils/tree';

const loading = ref(false);

const currentId = ref<string[]>([]);
const currentActionList = ref<TreeNode<ActionResponseRecord>[]>();

const formType = ref(EditEnum.EDIT);

const actionTreeData = ref<TreeNode<ActionResponseRecord>[]>();
const fetch = async () => {
  loading.value = true;
  const { Data } = await getMenuTreeList({});
  if (Data) actionTreeData.value = createTree(Data);
  loading.value = false;
};

fetch();

const action = computed(() => {
  if (currentActionList.value) {
    formType.value = EditEnum.EDIT;
    return currentActionList.value[0];
  }
});

const handleMenuAdd = () => {
  formType.value = EditEnum.ADD;
  currentActionList.value = createTree([{
    Type: MenuTypeEnum.MENU,
    ShowInMenu: true,
  }]);
};

const handleReload = async () => {
  currentId.value = [];
  currentActionList.value = [];
  await fetch();
};

</script>

<template>
  <div class="w-full h-full p-3 flex gap-3">
    <div class="w-30% h-full bg-ant.bg-container rounded-ant.br p-3">
      <a-spin :spinning="loading">
        <ActionTree
          searchable
          :type="EditEnum.EDIT"
          :tree="actionTreeData"
          v-model:selected-keys="currentId"
          v-model:value="currentActionList"
          @add="handleMenuAdd"
        />
      </a-spin>
    </div>
    <div class="w-70% h-full bg-ant.bg-container rounded-ant.br py-3">
      <ActionForm
        :type="formType"
        :tree="actionTreeData"
        :value="action"
        @ok="handleReload"
      />
    </div>
  </div>
</template>
