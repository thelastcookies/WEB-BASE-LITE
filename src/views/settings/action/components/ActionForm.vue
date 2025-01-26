<script setup lang="ts">
import type { EditEnum as EditEnumType } from '@/constants/enums';
import type { Recordable } from '@/types';
import type { ActionResponseRecord } from '@/api/admin/action/types';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { TreeNode } from '@/utils/tree';

const props = withDefaults(defineProps<{
  tree?: TreeNode<ActionResponseRecord>[];
  value?: TreeNode<ActionResponseRecord>;
  type?: EditEnumType;
}>(), {
  type: EditEnum.VIEW,
});

const emit = defineEmits<{
  (e: 'ok'): void
}>();

const formRef = ref<HTMLFormElement>();
const loading = ref<boolean>(false);

const formData = ref<TreeNode<ActionResponseRecord>>();
const metas = ref<Recordable<string>[]>();

const fieldNames = { value: 'Id', label: 'Name', children: 'Children' };

watch(() => props.value, (val) => {
  if (val) {
    formData.value = cloneDeep(val);
    metas.value = [];
    if (val.Meta) {
      const meta = JSON.parse(val.Meta);
      let metaList: Recordable<string>[] = [];
      for (const [key, value] of Object.entries(meta)) {
        metaList.push({ key, value: value as string });
      }
      metas.value = metaList;
    }
  } else {
    formData.value = undefined;
  }
}, { immediate: true });

/**
 * 数据交互与处理方法
 */
const rules: Record<string, Rule[]> = {
  Name: [{ required: true, message: '名称不可为空' }],
  MenuId: [{ required: true, message: '编码不可为空' }],
  Type: [{ required: true, message: '类型不可为空' }],
};

const handleReset = () => {
  formData.value = cloneDeep(props.value);
};

const handlePermAdd = () => {
  if (!formData.value) return;
  if (formData.value.PermissionList?.length) {
    formData.value?.PermissionList?.push({
      Name: '',
      Value: '',
      Type: MenuTypeEnum.PERM,
    });
  } else {
    formData.value.PermissionList = [{
      Name: '',
      Value: '',
      Type: MenuTypeEnum.PERM,
    }];
  }
};

const handleMetaAdd = () => {
  if (!formData.value) return;
  if (metas.value?.length) {
    metas.value?.push({
      key: '',
      value: '',
    });
  } else {
    metas.value = [{
      key: '',
      value: '',
    }];
  }
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await formRef.value?.validate();
    const params = cloneDeep(formData.value);
    // 处理 meta
    if (metas.value?.length) {
      let metaConf: Recordable<string> = {};
      metas.value.forEach(meta => {
        metaConf[meta.key] = meta.value;
      });
      Object.assign(params, {
        Meta: JSON.stringify(metaConf),
      });
    }
    const { Success, Msg } = await saveAction(params);
    if (Success) {
      message.success('保存成功');
      emit('ok');
    } else {
      message.error({ content: '保存失败，' + Msg });
    }
  } catch (e) {
    if ((e as ValidateErrorEntity)?.errorFields) {
      message.error((e as ValidateErrorEntity)?.errorFields[0].errors[0]);
    } else {
      message.error('保存失败');
    }
  }
  loading.value = false;
};

const handleDelete = async () => {
  loading.value = true;
  try {
    const { Success } = await deleteAction([formData.value!.Id!]);
    if (Success) {
      message.success('删除成功');
      emit('ok');
    } else {
      message.error('删除失败');
    }
  } catch (e) {
    message.error('删除失败');
  }
  loading.value = false;
};

</script>

<template>
  <div class="w-full h-full px-3 overflow-y-auto">
    <template v-if="formData">
      <div v-if="type !== EditEnum.VIEW" class="w-full h-12 flex justify-end pb-4 bg-pixel-matrix sticky top-0">
        <a-popconfirm
          title="是否确定删除？"
          @confirm="handleDelete"
        >
          <a-button v-if="formData.Id" danger>
            <BaseIcon icon="i-mdi-trash-can-outline" />
            删除此菜单
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="是否重置当前变更？"
          @confirm="handleReset"
        >
          <a-button class="ml-auto">
            <BaseIcon icon="i-mdi-refresh" />
            重置
          </a-button>
        </a-popconfirm>
        <a-button class="ml-2" type="primary" :loading="loading" @click="handleSubmit">
          <BaseIcon icon="i-mdi-content-save" />
          保存
        </a-button>
      </div>
      <a-alert message="菜单配置的编辑，会在页面刷新后启用" type="info" show-icon closable />
      <a-form ref="formRef"
        :model="formData"
        :rules="rules"
        :disabled="type === EditEnum.VIEW || loading"
        :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row>
          <a-divider orientation="left">基本信息</a-divider>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="名称" name="Name">
              <a-input v-model:value="formData.Name" placeholder="请输入名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="编码" name="MenuId">
              <a-input v-model:value="formData.MenuId" placeholder="请输入编码" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型" name="Type">
              <a-select v-model:value="formData.Type" placeholder="请选择类型"
                :options="menuTypeOptions"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="父级" name="ParentId">
              <a-tree-select
                show-arrow
                allow-clear
                show-search
                tree-node-filter-prop="title"
                placeholder="请选择"
                :field-names="fieldNames"
                :tree-data="props.tree"
                v-model:value="formData.ParentId"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="路径配置" name="Url" tooltip="将与父级配置拼接组成地址栏#后显示的地址">
              <a-input v-model:value="formData.Url" placeholder="请输入路径" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图标配置" name="Icon">
              <a-input v-model:value="formData.Icon" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item
              label="是否启用" name="ShowInMenu"
              :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }"
            >
              <a-switch v-model:checked="formData.ShowInMenu"
                checked-children="是" un-checked-children="否"
              ></a-switch>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="公共资源" name="NeedAction"
              :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }"
              tooltip="勾选后该菜单无需分配权限即可访问"
            >
              <a-switch v-model:checked="formData.NeedAction"
                :checked-value="false" :un-checked-value="true"
                checked-children="是" un-checked-children="否"
              ></a-switch>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="排序" name="Sort">
              <a-input v-model:value="formData.Sort" placeholder="请输入排序" />
            </a-form-item>
          </a-col>
        </a-row>
        <template v-if="formData.Type === MenuTypeEnum.PAGE">
          <a-row>
            <a-col :span="12">
              <a-form-item label="组件配置" name="Resource" tooltip="页面组件在 src/views 目录下的路径">
                <a-input v-model:value="formData.Resource" placeholder="请输入组件路径" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="重定向" name="Redirect">
                <a-input v-model:value="formData.Redirect" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="是否固定" name="Affix" tooltip="勾选后该页面将被固定在 Tab 栏">
                <a-switch v-model:checked="formData.Affix"
                  checked-children="是" un-checked-children="否"
                ></a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="是否保活" name="KeepAlive" tooltip="勾选后当菜单切换时，该页面将被缓存">
                <a-switch v-model:checked="formData.KeepAlive"
                  checked-children="是" un-checked-children="否"
                ></a-switch>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <template v-else-if="formData.Type === MenuTypeEnum.LINK">
          <a-row>
            <a-col :span="12">
              <a-form-item label="外链链接" name="Resource">
                <a-input v-model:value="formData.Resource" placeholder="请输入链接地址" />
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <template v-else-if="formData.Type === MenuTypeEnum.IFRAME">
          <a-row>
            <a-col :span="12">
              <a-form-item label="IFrame 链接" name="Resource">
                <a-input v-model:value="formData.Resource" placeholder="请输入链接地址" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="是否保活" name="KeepAlive" tooltip="勾选后当菜单切换时，该页面将被缓存">
                <a-switch v-model:checked="formData.KeepAlive"
                  checked-children="是" un-checked-children="否"
                ></a-switch>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <a-row>
          <a-divider orientation="left">权限配置</a-divider>
        </a-row>
        <a-row>
          <a-alert
            class="w-full mb-4"
            message="权限配置值约定为「菜单编码:媒介:功能」的格式，例如：「menu:button:add」"
            type="info" show-icon closable
          />
        </a-row>
        <a-row>
          <InlineEditTable
            class="w-full"
            v-model:data-source="formData.PermissionList"
            :columns="permTableColumns"
            @add="handlePermAdd"
          ></InlineEditTable>
        </a-row>
        <a-row>
          <a-divider orientation="left">Meta 配置</a-divider>
        </a-row>
        <a-row>
          <InlineEditTable
            class="w-full"
            v-model:data-source="metas"
            :columns="metaTableColumns"
            @add="handleMetaAdd"
          ></InlineEditTable>
        </a-row>
      </a-form>
    </template>
    <a-empty v-else class="mt-25%" :image="Empty.PRESENTED_IMAGE_SIMPLE">
      <template #description>
        请在左侧选择菜单进行配置
      </template>
    </a-empty>
  </div>
</template>
