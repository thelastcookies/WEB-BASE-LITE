<script setup lang="ts">
// import FormComponentMixin from "../FormComponentMixin.ts";
// import {computed, ref} from "vue";
// import WOrgPicker from "../../../common/WOrgPicker.vue";
// import WOrgTags from "../../../common/WOrgTags.vue";
//
// const props = defineProps({
//   ...FormComponentMixin.props
// })
// const emit = defineEmits([...FormComponentMixin.emits])
// const _value = computed(FormComponentMixin.computed._value(props, emit))
// const orgPicker = ref()
//
// function selectOk(users){
//   _value.value = users
//   orgPicker.value.close()
// }


// props: {
//     required: false,
//         multiple: false,
// },
</script>

<template>
  <div style="display: flex; align-items: center">
    <!--    <el-button icon="plus" @click="orgPicker.open()" round></el-button>-->
    <!--    <w-org-tags inline v-model="_value" v-if="(_value || []).length > 0"/>-->
    <!--    <el-text class="w-placeholder">{{config.props.placeholder}}</el-text>-->
    <!--    <w-org-picker :multiple="config.props.multiple" ref="orgPicker" type="dept" :selected="_value" @ok="selectOk"/>-->
  </div>
</template>

<style scoped lang="less">
//.w-placeholder {
//  margin-left: 10px;
//  color: var(--el-text-color-placeholder);
//}
</style>
