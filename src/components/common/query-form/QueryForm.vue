<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import type { QueryFormField } from '@/components/common/query-form/types';
import type { Recordable } from '@/types';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

// TODO 前端筛选

const form = defineModel<Recordable<any>>('form', {
  default: () => {
  },
});
const expand = defineModel<Boolean>('expand', { default: false });

const props = withDefaults(defineProps<{
  fields: QueryFormField[];
  rules?: Recordable<Rule[]>;
  itemInLine?: 2 | 3 | 4 | 6;
  allFields?: boolean;
}>(), {
  fields: () => [],
  itemInLine: 4,
  allFields: false,
});

const emit = defineEmits<{
  (e: 'query', value: Recordable<any>): void;
}>();

const slots = useSlots();
const slotsCount = Object.keys(slots).length;

const { deviceType } = useAppStore();

const ITEM_IN_LINE = deviceType === 'desktop' ? props.itemInLine : 1;
const SPAN = 24 / ITEM_IN_LINE;

const formRef = ref<FormInstance>();
const queryForm = ref<Record<string, any>>({});

watch(form, () => {
  queryForm.value = Object.assign({}, form.value);
}, { immediate: true, deep: true });

const onFinish = () => {
  try {
    const query: any = {};
    if (props.allFields) {
      props.fields.forEach((item) => {
        query[item.field] = queryForm.value[item.field] ? queryForm.value[item.field] :
          ['Input', 'Radio', 'DatePicker'].includes(item.component) ? '' :
            ['Select', 'TreeSelect', 'Checkbox', 'RangePicker'].includes(item.component) ? [] : undefined;
      });
    } else {
      for (const item in queryForm.value) {
        if (
          (typeof queryForm.value[item] === 'string' && queryForm.value[item]) ||
          (queryForm.value[item] instanceof Array && queryForm.value[item].length) ||
          (queryForm.value[item] instanceof Object && Object.keys(queryForm.value[item]).length)
        ) {
          query[item] = queryForm.value[item];
        }
      }
    }
    form.value = query;
    emit('query', query);
  } catch (e) {
    console.error(`QueryForm: 'onFinish'`, e);
  }
};

const onFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
  if (errorFields && errorFields.length > 0) {
    message.error(errorFields[0].errors[0]);
  }
};

const btnGroupOffset = computed(() => {
  const itemCount = props.fields.length + slotsCount;
  if (itemCount < ITEM_IN_LINE) {
    return (ITEM_IN_LINE - itemCount - 1) * SPAN;
  } else {
    return expand.value ? (ITEM_IN_LINE - itemCount % ITEM_IN_LINE - 1) * SPAN : 0;
  }
});

/**
 * TODO: 完善清空功能
 * 需要个字段逐一清空
 **/
const handleClear = () => {
  formRef.value!.resetFields();
  emit('query', {});
};

</script>

<template>
  <a-form
    ref="formRef"
    name="查询表单"
    class="w-full px-2 ant-advanced-search-form"
    :labelCol="{span: 6}"
    :wrapperCol="{span: 18}"
    :hideRequiredMark="true"
    :model="queryForm"
    :rules="rules"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-row>
      <template v-for="(item, idx) in fields" :key="idx">
        <a-col v-show="expand || idx === 0 || idx < (ITEM_IN_LINE - slotsCount - 1)" :span="item.colSpan || SPAN">
          <a-form-item
            :name="item.field"
            :label="item.label"
            :label-col="item.labelCol"
            :wrapper-col="item.wrapperCol"
            validateStatus="success"
            help=""
          >
            <template v-if="item.component === 'Input'">
              <a-input-search v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'Select'">
              <BaseSelect v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'TreeSelect'">
              <BaseTreeSelect v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'Radio'">
              <a-radio-group v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'Checkbox'">
              <BaseCheckbox v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'DatePicker'">
              <a-date-picker v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'RangePicker'">
              <a-range-picker v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
          </a-form-item>
        </a-col>
      </template>
      <a-col v-if="slotsCount" :span="SPAN">
        <slot name="default"></slot>
      </a-col>
      <a-col class="text-right mb-3" :span="SPAN" :offset="btnGroupOffset">
        <a-button type="primary" html-type="submit">
          <BaseIcon icon="i-mdi-magnify" />
          查询
        </a-button>
        <a-button class="ml-2" @click="handleClear">
          <BaseIcon icon="i-mdi-filter-remove-outline" />
          清空
        </a-button>
        <a-button v-if="(fields.length + slotsCount) >= ITEM_IN_LINE" type="link" @click="expand = !expand">
          <template v-if="expand">
            <BaseIcon icon="i-mdi-chevron-up" />
            收起
          </template>
          <template v-else>
            <BaseIcon icon="i-mdi-chevron-down"></BaseIcon>
            展开
          </template>
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<style scoped lang="less">
.ant-form-item {
  margin-bottom: 0.75rem;
}
</style>
