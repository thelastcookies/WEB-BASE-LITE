/**
 * 数据的定时刷新方法，会在mounted之后先执行一次
 * @param handler 需要定时刷新的方法
 * @param interval 定时，默认为30秒
 */
export const useTimedRefresh = (
  handler: Function,
  interval: number = 30000,
) => {
  let timer = -1;
  const clearTimer = () => {
    if (timer) clearInterval(timer);
  };
  const resetTimedRefresh = () => {
    clearTimer();
    handler();
    timer = setInterval(handler, interval);
  };
  tryOnMounted(() => {
    handler();
    timer = setInterval(handler, interval);
  });

  tryOnUnmounted(() => clearTimer());

  return { resetTimedRefresh };
};
