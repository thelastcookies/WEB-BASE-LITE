<template>
  <a-layout w-full h-full>
    <RouterView v-slot="{ Component, route }">
      <Transition appear name="slide-fade" mode="out-in">
        <KeepAlive>
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </a-layout>
</template>
