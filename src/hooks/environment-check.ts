/**
 * 浏览器版本号对齐至 2022.09
 */
export const useEnvironmentCheck = () => {
  const { userAgent } = useAppStore();
  const browser = userAgent.getBrowser();
  // 版本检查以及
  if (
    (browser.name === 'Chrome' && Number(browser.version?.split('.')[0]) < 105)
    || (browser.name === 'Microsoft Edge' && Number(browser.version?.split('.')[0]) < 105)
    || (browser.name === 'Safari' && Number(browser.version?.split('.')[0]) < 16)
  ) {
    notification.warning({
      message: '浏览器版本过低',
      description: `当前浏览器版本过低，可能会导致页面显示不正确或功能无法正常使用。
    为了获得最佳体验，请将浏览器升级到推荐版本以上。感谢您的理解与支持。`,
      duration: 10,
    });
  }

  // 增加针对 Safari 浏览器添加特殊样式的抓手
  if (browser.name === 'Safari') {
    document.body.classList.add('safari');
  }
};

