export const useAppStore = defineStore('app', () => {
  const windowInnerWidth = ref(0);
  const windowInnerHeight = ref(0);

  return {
    windowInnerWidth,
    windowInnerHeight,
  };
});
