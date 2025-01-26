<script setup lang="ts">
import type { EditEnum as EditEnumType } from '@/constants/enums';
import type { Key } from '@/types';
import type { DataNode, EventDataNode } from 'ant-design-vue/es/vc-tree/interface';
import type { ActionResponseRecord } from '@/api/admin/action/types';
import type { TreeNode } from '@/utils/tree';

const value = defineModel<TreeNode<ActionResponseRecord>[]>('value', { default: () => [] });
const selectedKeys = defineModel<Key[]>('selectedKeys', { default: () => [] });
const checkedKeys = defineModel<{
  checked: Key[];
  halfChecked: Key[];
}>('checkedKeys', {
  default: () => {
    return {
      checked: [],
      halfChecked: [],
    };
  },
});

const props = withDefaults(defineProps<{
  tree?: TreeNode<ActionResponseRecord>[];
  type?: EditEnumType;
  searchable?: boolean;
  checkable?: boolean;
  defaultExpandAll?: boolean;
}>(), {
  tree: () => [],
  type: EditEnum.VIEW,
  searchable: false,
  checkable: false,
  defaultExpandAll: false,
});

const emit = defineEmits<{
  (e: 'add'): void;
}>();

const handleAdd = () => {
  emit('add');
};

const fieldNames = { key: 'Id', title: 'Name', children: 'Children' };
const expandedKeys = ref<(Key)[]>([]);
const autoExpandParent = ref<boolean>(true);

/**
 * 处理节点被选中
 */
watchEffect(() => {
  if (!props.tree.length) return;
  if (props.defaultExpandAll) {
    const list = treeToList(props.tree);
    expandedKeys.value = list.map(it => it.getId()!);
  }
  if (props.checkable) {
    value.value = checkedKeys.value.checked?.map(key => {
      return findTreeNodeById(props.tree, key)!;
    });
  } else {
    value.value = selectedKeys.value.map(key => {
      return findTreeNodeById(props.tree, key)!;
    });
  }
});

/**
 * 处理搜索
 */
const searchValue = ref<string>('');
watch(searchValue, value => {
  const nodes = findTreeNodesByLabel(props.tree, value);
  expandedKeys.value = nodes.map(node => node.getId()) as Key[];
  autoExpandParent.value = true;
});

const onExpand = (keys: Key[]) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

const filterTreeNode = (node: EventDataNode) => {
  return searchValue.value ? node.Name.indexOf(searchValue.value) > -1 : false;
};

</script>

<template>
  <div class="h-full flex items-start flex-col">
    <div v-if="type !== EditEnum.VIEW" class="mb-4">
      <a-button ml-auto type="primary"
        @click="handleAdd()">
        <BaseIcon icon="i-mdi-plus" />
        新增菜单
      </a-button>
    </div>
    <template v-if="searchable">
      <a-input-search v-model:value="searchValue" placeholder="搜索" />
      <a-divider my-4 />
    </template>
    <a-tree
      class="w-full flex-1 overflow-y-auto"
      v-model:selected-keys="selectedKeys"
      v-model:checked-keys="checkedKeys"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="tree as unknown as DataNode[]"
      :field-names="fieldNames"
      :checkable="checkable"
      :checkStrictly="checkable"
      :filter-tree-node="filterTreeNode"
      @expand="onExpand"
      block-node
    >
      <template #title="{ Name }">
        <span class="flex pl-1 tree-node-title">
          <span v-if="Name && searchValue && Name.indexOf(searchValue) > -1">
            {{ Name.substring(0, Name.indexOf(searchValue)) }}
            <span class="c-ant.error">{{ searchValue }}</span>
            {{ Name.substring(Name.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ Name }}</span>
        </span>
      </template>
    </a-tree>
  </div>
</template>
