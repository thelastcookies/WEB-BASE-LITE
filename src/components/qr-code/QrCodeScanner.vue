<script setup lang="ts">
import jsQR, { type QRCode } from 'jsqr';

const active = defineModel<boolean>('active');

const props = withDefaults(defineProps<{
  // 初始化后立刻开始扫描
  scanOnInit?: boolean;
}>(), {
  scanOnInit: true,
});

const emit = defineEmits<{
  (e: 'scanned', content: string): void;
}>();

const streamMode = ref<'video' | 'canvas'>('video');

const scanner = ref<HTMLDivElement>();
const video = ref<HTMLVideoElement>();
const videoWidth = ref(0);
const videoHeight = ref(0);

const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();

const parity = ref(0);

const indicator = ref<HTMLDivElement>();
const scanning = ref(true);

const previousCodeData = ref<string>('');

// 初始化
const init = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    message.error('环境检测失败，需要安全的连接环境');
    return;
  }
  const width = scanner.value?.clientWidth as number;
  const height = scanner.value?.clientHeight as number;
  videoWidth.value = width;
  videoHeight.value = height;
  ctx.value = canvas.value!.getContext('2d', { willReadFrequently: true })!;
  canvas.value!.width = width;
  canvas.value!.height = height;
  if (props.scanOnInit) {
    active.value = true;
  }
};

// 初始化视频流
const initVideoStream = () => {
  if (!scanning.value) scanning.value = true;
  navigator.mediaDevices
  .getUserMedia({ video: { facingMode: { exact: 'environment' } } })
  // .getUserMedia({ video: true })
  .then((stream: MediaStream) => {
    try {
      video.value!.srcObject = stream;
      playVideo();
    } catch (e) {
      throw new Error('failed to create video stream');
    }
  }).catch((error) => {
    let msg: string;
    switch (error.name) {
      case 'NotAllowedError':
        msg = 'camera permission denied';
        break;
      case 'NotFoundError':
        msg = 'there is no connected camera';
        break;
      case 'NotSupportedError':
        msg = 'it seems like this page is served in non-secure context';
        break;
      case 'NotReadableError':
        msg = 'couldn\'t access your camera';
        break;
      case 'OverconstrainedError':
        msg = 'constraints don\'t match any installed camera';
        break;
      default:
        msg = 'UNKNOWN ERROR: ' + error.message;
    }
    console.error(`QrScanner: Camera access failed because '${msg}'.`);
    message.error('摄像头调用失败，请检查设备状态与权限设置');
  });
};
// 销毁视频流
const disposeVideoStream = () => {
  if (video.value && video.value.srcObject)
    (video.value.srcObject as MediaStream).getTracks().forEach(t => t.stop());
};
// 播放视频
const playVideo = () => {
  video.value!.play().then(() => requestAnimationFrame(scan));
};
// 暂停视频
const pauseVideo = () => {
  video.value!.pause();
};

// 动画的重绘回调，在每帧中尝试识别二维码
const scan = () => {
  if (video.value! && video.value!.readyState === video.value!.HAVE_ENOUGH_DATA) {
    ctx.value!.drawImage(video.value!, 0, 0, videoWidth.value, videoHeight.value);
    const imageData = ctx.value!.getImageData(0, 0, videoWidth.value, videoHeight.value);
    try {
      const qrCode = jsQR(imageData.data, videoWidth.value, videoHeight.value);
      if (qrCode) {
        const { data, location } = qrCode;
        if (previousCodeData.value !== data && !data) {
          previousCodeData.value = data;
        } else {
          parity.value += 1;
        }
        // 校验防抖
        if (parity.value > 3) {
          handleScanned(data, location);
          previousCodeData.value = '';
          parity.value = 0;
          return;
        }
      }
    } catch (e) {
      console.error(`QrScanner: Failed to parse this QR code. ${e}`);
      message.error('二维码解析失败');
    }
  }
  requestAnimationFrame(scan);
};

// 二维码解析处理
const handleScanned = (code: string, location: QRCode['location']) => {
  pauseVideo();
  indicator.value!.style.top = (
    location.topLeftCorner.y
    + location.topRightCorner.y
    + location.bottomLeftCorner.y
    + location.bottomRightCorner.y
  ) / 4 - 16 + 'px';
  indicator.value!.style.left = (
    location.topLeftCorner.x
    + location.topRightCorner.x
    + location.bottomLeftCorner.x
    + location.bottomRightCorner.x
  ) / 4 - 16 + 'px';
  scanning.value = false;
  emit('scanned', code);
};

watch(active, (val) => {
  if (val) {
    initVideoStream();
  } else {
    disposeVideoStream();
  }
});

tryOnMounted(() => {
  init();
});
tryOnUnmounted(() => {
  disposeVideoStream();
});

const goForward = () => {
  router.go(-1);
};

</script>

<template>
  <div class="scanner w-full h-full relative" ref="scanner">
    <a-button class="absolute top-4 left-4 px-2" @click="goForward">
      <BaseIcon icon='i-mdi-arrow-left'></BaseIcon>
    </a-button>
    <div class="w-55 h-55 absolute top-[calc(50%-10rem)] left-[calc(50%-6.875rem)]">
      <div v-if="scanning" class="line w-50 h-0.5 mx-2.5 absolute"></div>
      <span class="square top left"></span>
      <span class="square top right"></span>
      <span class="square bottom right"></span>
      <span class="square bottom left"></span>
      <div class="w-full text-center op-80 absolute bottom--8">将二维码放入框内，即可自动扫描</div>
    </div>
    <video
      v-show="streamMode === 'video'"
      class="object-cover"
      ref="video"
      :width="videoWidth"
      :height="videoHeight"
      playsinline
    ></video>
    <canvas v-show="streamMode === 'canvas'"
      ref="canvas"
      :width="videoWidth"
      :height="videoHeight"
    />
    <div v-show="!scanning" ref="indicator" class="w-8 h-8 absolute rounded-4 bg-ant.primary b-2 b-solid b-white"
    ></div>
  </div>
</template>


<style scoped lang="less">
@keyframes scan-ani {
  0% {
    top: 20px
  }
  100% {
    top: 200px
  }
}

.line {
  background: linear-gradient(to right, transparent, var(--colorPrimary), transparent);
  animation: scan-ani 1.75s infinite linear;
  animation-fill-mode: both;
}

.square {
  height: 20px;
  width: 20px;
  position: absolute;
  border: 0 solid var(--colorPrimary);

  &.top {
    top: 0;
    border-top-width: 2px;
  }

  &.left {
    left: 0;
    border-left-width: 2px;
  }

  &.bottom {
    bottom: 0;
    border-bottom-width: 2px;
  }

  &.right {
    right: 0;
    border-right-width: 2px;
  }
}
</style>

