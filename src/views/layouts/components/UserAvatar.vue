<script setup lang="ts">
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';

withDefaults(defineProps<{
  size: number
}>(), {
  size: 14,
});

const userStore = useUserStore();
const realName = computed(() => userStore.userInfo ? userStore.userInfo.RealName : '');
const appStore = useAppStore();
const { deviceType } = useAppStore();

const pwdModalOpen = ref(false);

const handleSignOut = () => {
  const hide = message.loading('注销中，请稍候', 0);
  appStore.signOut().finally(() => {
    hide();
    message.success('注销成功', 3);
  });
};

async function handleClick({ key }: MenuInfo) {
  if (key === 'logout') {
    handleSignOut();
  } else if (key === 'pwd') {
    pwdModalOpen.value = true;
  }
}

const handleReLogin = () => {
  useTimeoutFn(() => {
    handleSignOut();
  }, 1000);
};

</script>

<template>
  <a-dropdown>
    <div class="cursor-pointer h-full flex-s px-4 lt-sm:px-0">
      <a-avatar :size="size" mr-8px lt-sm:m-0 bg-ant.bg-container>
        <template #icon>
          <BaseIcon icon="i-mdi-account" text-14px c-ant.text></BaseIcon>
        </template>
      </a-avatar>
      <span v-if="deviceType === 'desktop'" class="c-ant.white text">{{ realName }}</span>
    </div>
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="pwd">
          <template #icon>
            <BaseIcon icon="i-mdi-lock-outline"></BaseIcon>
          </template>
          修改密码
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          <template #icon>
            <BaseIcon icon="i-mdi-logout"></BaseIcon>
          </template>
          注销
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <change-pwd-modal
    v-model:open="pwdModalOpen"
    @ok="handleReLogin"
  ></change-pwd-modal>
</template>
