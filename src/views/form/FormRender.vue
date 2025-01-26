<script setup lang="ts">

</script>

<template>
  <!--  <a-form-->
  <!--    :class="['draw-area', viewType === 'desktop' ? 'as-desktop': 'as-mobile']"-->
  <!--    :labelCol="{style: {width: formConf.labelWidth + 'px'}}"-->
  <!--    :size="formConf.size"-->
  <!--    :layout="formConf.layout"-->
  <!--    :label-align="formConf.labelAlign"-->
  <!--  >-->
  <!--    <template v-for="(comp, i) in compList" :key="comp.key">-->
  <!--      <FormComponent-->
  <!--        :config="comp"-->
  <!--        :active="currentComp?.key === comp.key"-->
  <!--        :layout="formConf.layout"-->
  <!--        @click="handleSelect(comp)"-->
  <!--        @copy="handleCopy(i, comp)"-->
  <!--        @delete="handleDelete(comp.key!)"-->
  <!--      />-->
  <!--    </template>-->
  <!--  </a-form>-->
  <!--  <a-form-->
  <!--    :size="config.conf.size"-->
  <!--    :layout="config.conf.layout"-->
  <!--    :label-align="config.conf.labelAlign"-->
  <!--    class="w-form-render">-->
  <!--    <template v-for="(cp, i) in config.components" :key="cp.type + i">-->
  <!--      <a-form-item-->
  <!--        v-if="!cp.props.isContainer" :label="cp.name" :required="cp.props.required"-->
  <!--        :class="{'w-form-cp-nlb':cp.props.hideLabel}" :name="cp.key">-->
  <!--        <component-->
  <!--          :is="FormComponents[cp.type]"-->
  <!--          :mode="mode"-->
  <!--          :config="cp"-->
  <!--          v-model="_value[cp.key]"-->
  <!--        />-->
  <!--      </a-form-item>-->
  <!--      <component v-else :is="FormComponents[cp.type]" :mode="mode" v-model="_value" :config="cp" />-->
  <!--    </template>-->
  <!--  </a-form>-->
</template>

<style scoped lang="less">

</style>
