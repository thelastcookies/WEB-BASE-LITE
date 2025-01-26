<script setup lang="ts">

import type { MenuProps } from 'ant-design-vue';

// 选择器列
const selectionColumnClassList = [
  '.ant-table-selection-col',
  '.ant-table-selection-column',
];
// 操作列
const operationColumnClassList = [
  'colgroup col:last-child',
  'tr th:last-child',
  'tr td:last-child',
];


const props = withDefaults(defineProps<{
  domId: string;
  exportName?: string;
  excludeOperation?: boolean;
}>(), {
  domId: 'table',
  exportName: '导出',
  excludeOperation: true,
});

const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
  let dom = document.getElementById(props.domId)!;
  const wrapper = dom.closest('.ant-table-wrapper')!;
  const copy = wrapper.cloneNode(true) as HTMLTableElement;
  let removeClassList = [...selectionColumnClassList];
  if (props.excludeOperation) {
    removeClassList = [...removeClassList, ...operationColumnClassList];
  }
  // 移除不进行导出的列
  const col = copy.querySelectorAll(removeClassList.join(','));
  for (let i = 0, len = col.length; i < len; i++) {
    col[i].remove();
  }
  if (key === 'Excel') {
    exportTableAsXlsx(copy, props.exportName);
  } else if (key === 'Word') {
    exportTableAsDocx(copy, props.exportName);
  } else if (key === 'PDF') {
    copy.style.position = 'fixed';
    copy.style.width = '100%';
    copy.style.maxWidth = '1500px';
    const app = document.getElementById('app')!;
    app.appendChild(copy);
    await exportTableAsPdf(copy, props.exportName);
    app.removeChild(copy);
  }
};
</script>

<template>
  <a-dropdown trigger="click">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="Excel">
          <BaseIcon icon="i-mdi-file-excel-box-outline" />
          导出为 Excel
        </a-menu-item>
        <a-menu-item key="Word">
          <BaseIcon icon="i-mdi-file-word-box-outline" />
          导出为 Word
        </a-menu-item>
        <a-menu-item key="PDF">
          <BaseIcon icon="i-mdi-file-pdf-box-outline" />
          导出为 PDF
        </a-menu-item>
      </a-menu>
    </template>
    <a-button ml-2 pr-2>
      <BaseIcon icon="i-mdi-export" />
      导出
      <BaseIcon icon="i-mdi-chevron-down" />
    </a-button>
    <div id="copy-container">
      fsdafasd
    </div>
  </a-dropdown>
</template>
