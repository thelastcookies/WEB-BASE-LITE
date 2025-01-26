<script setup lang="ts">
const appTitle = import.meta.env.APP_TITLE;
</script>

<template>
  <div class="login-container w-full h-full image-bg-cover flex-c">
    <div class="w-75% h-82% border-rd-8 flex bg-ant.bg-container
                lt-sm:w-full lt-sm:h-full lt-sm:border-rd-0">
      <div class="h-full w-530px lt-sm:w-full p8">
        <header class="flex-s">
          <BaseIcon icon="/logo.svg" type="logo" size="2"></BaseIcon>
          <div class="text-6 font-600 ml lh-9">{{ appTitle }}</div>
        </header>
        <main class="h-[calc(100%-2rem)] flex-s">
          <LoginForm></LoginForm>
        </main>
      </div>
      <div class="lt-sm:hidden h-full w-[calc(100%-530px)] p3">
        <div class="form-deco h-full w-full image-bg-cover border-rd-8"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  background-image: url("~/login/login-bg.jpg");

  .form-deco {
    background-image: url("~/login/login-form-bg.jpg");
  }
}
</style>
