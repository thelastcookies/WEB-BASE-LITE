<script setup lang="ts">
const scannerActive = ref(false);

const codeScanned = (content: string) => {
  message.info(`扫码解析成功: ${content}`);
  setTimeout(() => {
    scannerActive.value = true;
  }, 3500);
};
</script>

<template>
  <div class="w-400px h-850px">
    <QrCodeScanner
      v-model:active="scannerActive"
      @scanned="codeScanned"
    />
  </div>
</template>
