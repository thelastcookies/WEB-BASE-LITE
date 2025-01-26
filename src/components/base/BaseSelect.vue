<script setup lang="tsx">
import type { DefaultOptionType, LabeledValue, SelectValue } from 'ant-design-vue/es/select';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';

type RawValue = string | number;

const value = defineModel<SelectValue>('value');
const _options = ref<DefaultOptionType[]>();

const attrs = useAttrs();

const getOptions = async () => {
  if (attrs.getOptions instanceof Function) {
    _options.value = await attrs.getOptions();
  } else if (attrs.options instanceof Array) {
    _options.value = attrs.options;
  } else {
    console.warn(`BaseSelect: Either 'options' or 'getOptions' should not be empty.`);
  }
};
getOptions();

// 全选 Checkbox 状态
const checkAll = ref(false);
const isIndeterminate = ref(false);

// 切换全选切换状态
const handleCheckAllChange = (e: CheckboxChangeEvent) => {
  value.value = e.target.checked && _options.value ? _options.value.map(item => (item.value as RawValue)) : undefined;
  isIndeterminate.value = false;
};
// 选中项发生改变时，计算全选以及半选状态
const handleCheckedChange = (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => {
  if (attrs.selectAllEnable && attrs.mode === 'multiple' && option && option.length) {
    const checkedCount = value ? (value as (RawValue | LabeledValue)[]).length : 0;
    checkAll.value = checkedCount === option.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < option.length;
  }
};

watchEffect(() => {
  handleCheckedChange(value.value, _options.value!);
});

// 渲染下拉列表
const VNodes = defineComponent({
  props: {
    vNodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vNodes;
  },
});

</script>

<template>
  <a-select
    show-arrow
    allow-clear
    show-search
    option-filter-prop="label"
    placeholder="请选择"
    :max-tag-count="3"
    v-bind="$attrs"
    v-model:value="value"
    :options="_options"
    @change="handleCheckedChange"
  >
    <template #dropdownRender="{ menuNode }">
      <template v-if="attrs.selectAllEnable && attrs.mode === 'multiple'">
        <a-checkbox class="px-2 py-1"
                    v-model:checked="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange">全选
        </a-checkbox>
        <a-divider class="my-1" />
      </template>
      <v-nodes :vNodes="menuNode" />
    </template>
  </a-select>
</template>
