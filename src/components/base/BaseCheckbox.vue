<script setup lang="ts">
import type { CheckboxChangeEvent, CheckboxOptionType, CheckboxValueType } from 'ant-design-vue/es/checkbox/interface';

const value = defineModel<CheckboxValueType[]>('value');

const attrs = useAttrs();
const _options = ref<CheckboxOptionType[]>();

_options.value = attrs.options as CheckboxOptionType[];

// 全选 Checkbox 状态
const checkAll = ref(false);
const isIndeterminate = ref(false);

// 切换全选切换状态
const handleCheckAllChange = (e: CheckboxChangeEvent) => {
  value.value = e.target.checked && _options.value ? _options.value.map(item => item.value) : undefined;
  isIndeterminate.value = false;
};
// 选中项发生改变时，计算全选以及半选状态
const handleCheckedChange = (value: CheckboxValueType[] | undefined, option: CheckboxOptionType[]) => {
  if (attrs.selectAllEnable && option && option.length) {
    const checkedCount = value ? value.length : 0;
    checkAll.value = checkedCount === option.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < option.length;
  }
};

watchEffect(() => {
  handleCheckedChange(value.value, _options.value!);
});

</script>

<template>
  <div class="flex gap-col-2">
    <a-form-item-rest v-if="attrs.selectAllEnable">
      <a-checkbox v-model:checked="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange">全选
      </a-checkbox>
    </a-form-item-rest>
    <a-checkbox-group v-bind="$attrs" v-model:value="value" />
  </div>
</template>
