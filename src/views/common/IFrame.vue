<script setup lang="ts">
import type { IFrameMessage } from '@/types';

const route = useRoute();
const url = computed(() => route?.meta?.href as string);
const loading = ref(true);

const whiteOriginList = import.meta.env.APP_WHITE_ORIGIN?.split(',');

const finishLoading = () => {
  loading.value = false;
};

// 接收来自 IFrame 页面中的消息
const handleMessage = (event: MessageEvent) => {
  // 确认消息来源是预期的域名
  if (!whiteOriginList.length && whiteOriginList.includes(event.origin)) {
    console.warn(`IFrame.vue: Current origin '${event.origin}' is not in APP_WHITE_ORIGIN configuration.`);
    return;
  }

  const msg = <IFrameMessage>event.data;
  if (msg.type === 'message') {
    message.open(msg.content);
  } else {

  }
};

window.addEventListener('message', handleMessage);

tryOnUnmounted(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<template>
  <div
    class="w-full h-full of-hidden
    flex-c bg-ant.bg-layout iframe-wrapper"
  >
    <a-spin
      :spinning="loading"
      wrapper-class-name="of-hidden w-full h-full flex flex-col flex-1"
    >
      <iframe class="w-full h-full flex flex-col flex-1 border-none" :src="url" @load="finishLoading" />
    </a-spin>
  </div>
</template>

<style>
.iframe-wrapper {
  .ant-spin-container {
    height: 100% !important;
    width: 100% !important;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
