<script setup lang="ts">
import type { ComponentConfig, ComponentConfigProps } from '@/views/form/types';

withDefaults(defineProps<{
  active: boolean;
  layout: string;
  config: ComponentConfig<ComponentConfigProps>;
}>(), {
  active: false,
  layout: 'horizontal',
  config: () => {
    return {
      name: '单行输入框',
      type: 'TextInput',
      props: { ...componentCommonPropsDefault },
    };
  },
});

const emit = defineEmits<{
  (e: 'select'): void;
  (e: 'copy'): void;
  (e: 'delete'): void;
}>();

</script>

<template>
  <a-form-item
    :class="[{'active': active}, `${layout}`]"
    :label="config.name"
    :required="config.props.required"
    @click="emit('select')"
  >
    <component
      :is="FormComponents[config.type]"
      v-bind="config.props"
    />
    <div :class="['component-tools', 'vertical-tools']" v-if="active && config.props && config.mode === 'edit'">
      <a-tooltip>
        <template #title>复制</template>
        <div class="icon" @click.stop="emit('copy')">
          <BaseIcon icon="i-mdi-content-copy" />
        </div>
      </a-tooltip>
      <a-tooltip>
        <template #title>删除</template>
        <div class="icon" @click.stop="emit('delete')">
          <BaseIcon icon="i-mdi-trash-can-outline" />
        </div>
      </a-tooltip>
    </div>
  </a-form-item>
</template>

<style scoped lang="less">
.ant-form-item {
  margin-bottom: 0;
  border: 1px dashed transparent;
  border-radius: var(--borderRadiusLG);
  transition: border-color var(--motionDurationMid);

  &:hover {
    border: 1px dashed var(--colorPrimaryBorderHover);
  }

  :deep(.ant-form-item-label) {
    cursor: grab;

    label {
      cursor: grab;
    }
  }

  .component-tools {
    position: absolute;
    display: flex;

    .icon {
      padding: 0 0.25rem;
      cursor: pointer;
      color: #FFF;
      background: var(--colorPrimaryText);

      &:first-child {
        border-radius: 0 0 0 var(--borderRadiusLG);
      }

      &:last-child {
        border-radius: 0 var(--borderRadiusLG) 0 0;
      }

      &:hover {
        background: var(--colorPrimaryHover);
      }
    }
  }
}

.ant-form-item.active {
  border: 1px dashed var(--colorPrimaryBorder);
}

.ant-form-item.horizontal {
  padding: var(--sizeSM);

  .component-tools {
    top: -13px;
    right: -13px;
  }
}

.ant-form-item.vertical {
  padding: var(--sizeXXS);

  .component-tools {
    top: -35px;
    right: -5px;
  }
}

</style>
