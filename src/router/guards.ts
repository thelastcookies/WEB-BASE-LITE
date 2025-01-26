const samplePath = '/sample';
const accessWhileList = ['/error', '/401', '/403', '/404', '/500'];

router.beforeEach(async (to) => {
  setRouteEmitter(to);
  // 获取 token 进行校验
  if (to.path === samplePath && import.meta.env.DEV) {
    // Sample 页面特殊处理
    return;
  } else if (accessWhileList.includes(to.path)) {
    // 如果目标路径在白名单内，则不干涉
    return;
  } else if (to.query.redirect) {
    // 如果有重定向页面
    return ({
      path: decodeURIComponent(to.query.redirect as string),
      replace: true,
    });
  } else {
    return;
  }
});

// router.afterEach((to) => {
//     useMetaTitle(to)
//     useLoadingCheck()
//     useScrollToTop()
// })
