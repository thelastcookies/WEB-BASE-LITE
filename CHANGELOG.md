# Changelog

## [0.24.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.23.0...v0.24.0) (2024-12-24)


### Features

* 为 QueryForm 增加基本的移动端适配 ([f443c77](https://github.com/thelastcookies/WEB-BASE/commit/f443c77c0dd99a2a1c00981274291478395cbd62))
* 修复 QRCodeScanner 组件的已知问题 ([96059b2](https://github.com/thelastcookies/WEB-BASE/commit/96059b25808d167fd268e444f8316474d91345ff))
* 完善 IFrame 组件的通信功能 ([67a8192](https://github.com/thelastcookies/WEB-BASE/commit/67a8192559e64cbb06731d943e52de4b84257abe))
* 完成登录表单的自动完成支持 ([350a11b](https://github.com/thelastcookies/WEB-BASE/commit/350a11bc20ae5be54299bd3a0f3ae28d27337158))
* 将组态模块迁移至新模板项目维护 ([b41806a](https://github.com/thelastcookies/WEB-BASE/commit/b41806a7dcb71a878cf7c6fd1017c7696434d0c0))
* 新增二维码扫描组件与示例 ([a55cc98](https://github.com/thelastcookies/WEB-BASE/commit/a55cc98833d747902c2fd6ac31e2cb65ca500376))
* 新增组态组件的 query 参数支持与页面内按钮跳转支持 ([a52ff9b](https://github.com/thelastcookies/WEB-BASE/commit/a52ff9b3d1fe7b97592de4915589ea568e702ed4))
* 新增菜单和 Banner 的配置隐藏功能 ([4190a01](https://github.com/thelastcookies/WEB-BASE/commit/4190a018b1e60da2cd596b760ec50ac748689a6a))
* 更新前端静态路由配置，重新整理各个设置页面 ([c16ade0](https://github.com/thelastcookies/WEB-BASE/commit/c16ade034fc769d5df68af997ddbd4368716ce3e))
* 登录表单移除记住密码选项，增加注册提示，增加表单的自动完成，修复样式问题 ([1e797a1](https://github.com/thelastcookies/WEB-BASE/commit/1e797a1ed5577f5dece8a07a182ef0e14451621c))


### Bug Fixes

* 修复 QueryFormSample 的已知问题 ([24a1985](https://github.com/thelastcookies/WEB-BASE/commit/24a1985513aa9b40738ba080ac17fab936b84af3))
* 修复导入的部分 CSS 变量缺少单位的问题 ([0bcf4d7](https://github.com/thelastcookies/WEB-BASE/commit/0bcf4d7e5156c3e6847d05a2ca8212e7ffa0af7e))
* 修复用户角色信息修改失败的问题 ([714717d](https://github.com/thelastcookies/WEB-BASE/commit/714717d12d07cdf1a488515abc535a70a184f747))
* 修复登录过期后登出的问题 ([d6cb477](https://github.com/thelastcookies/WEB-BASE/commit/d6cb4773f7d17bafb6eff7ed88bac020725d5c51))
* 修复菜单无法正常加载的问题 ([84556a3](https://github.com/thelastcookies/WEB-BASE/commit/84556a3d6a30cd92a1725f15959bc98aa98d1d17))


### Performance Improvements

* 优化动态主题功能 ([3824053](https://github.com/thelastcookies/WEB-BASE/commit/38240533249b05c71bcdeb902585377ee0acf8f0))
* 优化导出方法 ([37d2ade](https://github.com/thelastcookies/WEB-BASE/commit/37d2adeaedf5cd23b5cf861761727c5e4a89afef))

## [0.23.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.22.0...v0.23.0) (2024-11-21)


### Features

* 完善 CURD 示例页面 ([69263ef](https://github.com/thelastcookies/WEB-BASE/commit/69263ef4edba88c48482f8bc8412eec808a2ddd8))
* 完善用户、权限页面配置 ([668c084](https://github.com/thelastcookies/WEB-BASE/commit/668c084fac03cf9d6d0b86370ff9f6de3931139d))
* 完善表格导出功能 ([7bed984](https://github.com/thelastcookies/WEB-BASE/commit/7bed984f8c30cdcd31515198c010fb0eb6175292))
* 将 CURD、用户管理页面中表格改为 FixedTable ([8ffcdbe](https://github.com/thelastcookies/WEB-BASE/commit/8ffcdbe498fd8dd39a3acb7f41142fb185e07685))
* 新增 FixedTable，为 Antdv Table 的固定高度支持版本 ([672179a](https://github.com/thelastcookies/WEB-BASE/commit/672179a2b218504fb604c8594dc28c03f963a0ca))
* 新增 QueryForm Input 类型的搜索图标 ([820f9ad](https://github.com/thelastcookies/WEB-BASE/commit/820f9ada4fca085144f97970a17b23c986fedef1))
* 新增文件上传功能与示例 ([a4e50de](https://github.com/thelastcookies/WEB-BASE/commit/a4e50def1d7aad6d416917a7ff5c5ed74b343cd7))
* 新增表格导出功能 ([8acfb69](https://github.com/thelastcookies/WEB-BASE/commit/8acfb69e936c69df1acad3c76dc4c902aaaaafd9))
* 更新 CURD 示例页面，新增导出功能 ([fda167d](https://github.com/thelastcookies/WEB-BASE/commit/fda167d70944798a18ef7667cc3d0515a7c06113))
* 路由守卫功能迭代，完善 Axios 错误处理与 500 页面功能 ([5ccb472](https://github.com/thelastcookies/WEB-BASE/commit/5ccb4728ad19c06cb3cd2953f62c2ca47792e2ff))


### Bug Fixes

* 修改导出组件入参，修复入参没有正确被接收的问题 ([c5b6cf7](https://github.com/thelastcookies/WEB-BASE/commit/c5b6cf7edf93295a082e6d63eba2582f6780f876))
* 修改用户管理页面数据问题 ([7c3a63d](https://github.com/thelastcookies/WEB-BASE/commit/7c3a63d8ad8109728c377f413606b732a2733f94))

## [0.22.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.21.0...v0.22.0) (2024-11-13)


### Features

* 增加 PageHeader 的副标题支持 ([a7e9e5d](https://github.com/thelastcookies/WEB-BASE/commit/a7e9e5d364f6e75e767482422e1836d35d9eb961))
* 完善模板页面和模板弹窗的细节 ([1404c4d](https://github.com/thelastcookies/WEB-BASE/commit/1404c4dd730c616b777e5cd6b56bdc023ca58f55))
* 完成单表生成页面模板的基本样式布局 ([daca528](https://github.com/thelastcookies/WEB-BASE/commit/daca52892208fa2b73bcbfcc808d780f81d5710a))
* 完成组态图趋势弹窗功能 ([ff545e7](https://github.com/thelastcookies/WEB-BASE/commit/ff545e7b59ed8b2afd759123f44e9324d8ed1e73))
* 完成页面对 TreeNode 类的适配 ([8018a83](https://github.com/thelastcookies/WEB-BASE/commit/8018a8373a765ce2f8f1df6c7b051d60c2528a3c))
* 新增 IFrame.vue 接收 iframe 内消息传递的功能 ([48efc34](https://github.com/thelastcookies/WEB-BASE/commit/48efc34f86974016910ed6e8d08a2763d0b553a0))
* 新增编辑表单 ([3145341](https://github.com/thelastcookies/WEB-BASE/commit/314534168a436136b59cbb259b31bc5b697af7e0))
* 重构 TreeNode 类的声明和方法 ([1fee021](https://github.com/thelastcookies/WEB-BASE/commit/1fee0216f4e56bdfbfaf567607834f516d937045))


### Bug Fixes

* 修复修改密码弹窗关闭后无法再次打开的问题 ([bf8d7b3](https://github.com/thelastcookies/WEB-BASE/commit/bf8d7b3ca64e4275651925f5c2ad88d55a212fa6))
* 修复查询字段数与每行限制字段数相同时字段显示确实的问题 ([392e85e](https://github.com/thelastcookies/WEB-BASE/commit/392e85e1e2d439d85fff2e6ef4b17b6add41999a))
* 移除用户、角色页面表格点击选中功能 ([03891c0](https://github.com/thelastcookies/WEB-BASE/commit/03891c0d4642e96f4aabfec61bdb323ca65e300d))

## [0.21.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.20.0...v0.21.0) (2024-10-08)


### Features

* 历史接口数据处理方法扩展 ([1876df0](https://github.com/thelastcookies/WEB-BASE/commit/1876df0f124f60202a1ace96c081c43d05ecb944))
* 完成组态图历史播放进度条功能 ([e1f11c2](https://github.com/thelastcookies/WEB-BASE/commit/e1f11c24af3ea24e70be4bd3e4e0c1e09014d8b5))
* 扩展树实用工具功能 ([8200b9f](https://github.com/thelastcookies/WEB-BASE/commit/8200b9f8720dc1e987e14c9238babf1e68753102))
* 新增 ActionForm 组态配置 ([984497b](https://github.com/thelastcookies/WEB-BASE/commit/984497b7dc574ad0de9f30aa5d617e95f1da0517))
* 新增 Diagram 组件迁移，包含实时数据刷新和历史回放功能 ([e88b326](https://github.com/thelastcookies/WEB-BASE/commit/e88b3265ffd8099bcb095a3249fdff0e721bff33))
* 新增 Diagram.vue，完成组态图组件的初步功能迁移 ([a1ac403](https://github.com/thelastcookies/WEB-BASE/commit/a1ac4036805be3053b2dc1171b1a427c86655288))
* 新增 ECharts 组件 loading 功能，暂只支持深色模式 ([1aa4fd6](https://github.com/thelastcookies/WEB-BASE/commit/1aa4fd6bdecd3e8f5390b82b84e3b3c03785f65a))
* 新增 ht 扩展方法的迁移 ([17f6efe](https://github.com/thelastcookies/WEB-BASE/commit/17f6efe453ba022e5f40453d43fecc12fce0db74))
* 新增组态路由配置 ([80bc33d](https://github.com/thelastcookies/WEB-BASE/commit/80bc33d17bda6faf0c8c361c8dbe5c474298f0e2))


### Bug Fixes

* 修复 ECharts 组件的已知问题 ([18f9cab](https://github.com/thelastcookies/WEB-BASE/commit/18f9cab4f486f1fa9bdce1381be2766669d2a0b3))
* 修复树实用工具的已知问题 ([5669f3f](https://github.com/thelastcookies/WEB-BASE/commit/5669f3f1024a805c17cc6c6184e29cfa483c5bed))
* 完善 QueryForm 父级表单数据改变时的内部同步 ([b7c0b28](https://github.com/thelastcookies/WEB-BASE/commit/b7c0b28dd1620db7b7e99f9be26982ecf41f0455))
* 解决 UnoCSS 中 antdv 预设导入不正常的问题 ([3a865a5](https://github.com/thelastcookies/WEB-BASE/commit/3a865a55dbc0d2f9dd7c0f0688618d9cb00ab231))

## [0.20.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.19.0...v0.20.0) (2024-09-14)


### Features

* 完善菜单设置功能，初步完成权限到按钮功能 ([3b47ff9](https://github.com/thelastcookies/WEB-BASE/commit/3b47ff91ec45aad71636d7974545fd60a5cee511))
* 新增修改密码功能，重新格式化部分代码 ([49735b5](https://github.com/thelastcookies/WEB-BASE/commit/49735b5055f8cd11340706dbfa02fb5a10125c3a))
* 新增用户管理——用户状态的设置 ([76ad45d](https://github.com/thelastcookies/WEB-BASE/commit/76ad45d6c1681e867a0cb057cc759f8dfee40ee0))
* 新增菜单编辑加载动画 ([ef402d8](https://github.com/thelastcookies/WEB-BASE/commit/ef402d8eefc8ea9a39d3668f962b90c359af9f94))

## [0.19.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.18.0...v0.19.0) (2024-09-13)


### Features

* 使用 TreeNode 改造原 Action 相关内容 ([ccfc9f1](https://github.com/thelastcookies/WEB-BASE/commit/ccfc9f1bd1e6247a101a2c65ed6136469c52f236))
* 修改菜单解析和路由生成，适配新的菜单结构 ([adfaef2](https://github.com/thelastcookies/WEB-BASE/commit/adfaef261bb29d6576af882a8ac3510d156d9def))
* 在菜单管理中引入行内编辑表格 ([b846fb6](https://github.com/thelastcookies/WEB-BASE/commit/b846fb6eb19e6aef4aa45c88b7f50aa5038258a7))
* 完善菜单管理页面 ([a96b26a](https://github.com/thelastcookies/WEB-BASE/commit/a96b26a873b2ebe752027b5a7db5cd81694f95ec))
* 完善角色管理页面细节 ([6fd994c](https://github.com/thelastcookies/WEB-BASE/commit/6fd994ce2bf91460db93a1a1b6b0ca5ba377526d))
* 完成权限管理页面 ([b0247e5](https://github.com/thelastcookies/WEB-BASE/commit/b0247e5c16d4016308c5d4b3e17cd02be5438f9a))
* 完成用户编辑页面 ([8d99073](https://github.com/thelastcookies/WEB-BASE/commit/8d9907353f8348853f65c150ac5e50d6ca6959dc))
* 完成菜单管理页面的编辑保存功能 ([a67151f](https://github.com/thelastcookies/WEB-BASE/commit/a67151fce6f53531887acd38ae33be26e6c1df54))
* 完成菜单编辑页面 ([7a33e23](https://github.com/thelastcookies/WEB-BASE/commit/7a33e238332e2f7b2cc165f3d013f5772a93ba71))
* 完成角色编辑页面 ([c9ef9e8](https://github.com/thelastcookies/WEB-BASE/commit/c9ef9e87f7881b2bad8c86c74a645aae54d0f396))
* 新增 ActionForm 的 loading 状态 ([76e9d7c](https://github.com/thelastcookies/WEB-BASE/commit/76e9d7c4a7fb16ec81bd137195c12e2f9892f8e9))
* 新增 ActionTree 的 checkable 状态下节点选择完全受控功能与默认展开全部功能 ([94d940d](https://github.com/thelastcookies/WEB-BASE/commit/94d940df50c107007bbdd6fd8102df394a1acd77))
* 新增服务器/网络连接失败提示页面 ([a879eeb](https://github.com/thelastcookies/WEB-BASE/commit/a879eeb0cd3c27ce86ee1fd305e5d836f0fbaec2))
* 新增树实用工具的 treeToList 方法 ([c81d0fc](https://github.com/thelastcookies/WEB-BASE/commit/c81d0fc72d449e6d7cebf5586c0bc5e976c06fd4))
* 新增用户管理页面搜索功能 ([e99cb4d](https://github.com/thelastcookies/WEB-BASE/commit/e99cb4dc1b22c09bc6a8fe6d3890a180f07bf100))
* 新增行内编辑表格新增行自动设为编辑模式的功能 ([4eae687](https://github.com/thelastcookies/WEB-BASE/commit/4eae68765fcd317570de94edc3f0a14737d31327))
* 新增行内编辑表格组件和示例组件 ([057371d](https://github.com/thelastcookies/WEB-BASE/commit/057371d8a6de5ad2aec0d62d64f1a8a54b1ce94b))
* 新增角色管理页面搜索功能 ([2e053f2](https://github.com/thelastcookies/WEB-BASE/commit/2e053f28f291ebc1b65d1f91f845b0ee23ce21a9))
* 补充菜单编辑页面按钮图标 ([d08e99d](https://github.com/thelastcookies/WEB-BASE/commit/d08e99d5cc91558e5434148311b8d33dfc22fd53))


### Bug Fixes

* 修复用户、角色、菜单页面保存失败提示不正确的问题 ([d0736b2](https://github.com/thelastcookies/WEB-BASE/commit/d0736b21cf56d90da7689a5f0110afb8cff39152))
* 修复菜单选择切换时 meta 表格没有清空的问题 ([e455750](https://github.com/thelastcookies/WEB-BASE/commit/e455750523e0d22f6caf2619b396bf30f7ce98f6))
* 修复行内编辑表格首次新增时未进入编辑状态的问题 ([7c035f3](https://github.com/thelastcookies/WEB-BASE/commit/7c035f39cdbeaae89c552fb77b17d379e5169d2e))
* 修改 UnoCSS 预设，不再覆盖原生定义 ([8c2acc7](https://github.com/thelastcookies/WEB-BASE/commit/8c2acc7afc2e99add6206601a4306542d901d56b))

## [0.18.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.17.0...v0.18.0) (2024-08-26)


### Features

* 历史接口数据处理方法扩展 ([f9bad11](https://github.com/thelastcookies/WEB-BASE/commit/f9bad11941817f30f78dfe905aee7a43404ed59e))
* 完善 QueryForm 的表单验证功能，表单值不符合规则时弹出提示消息 ([a9e57ca](https://github.com/thelastcookies/WEB-BASE/commit/a9e57caa3510ff3a1c8e613d1462197a7dd61d4f))
* 扩展 BaseSelect 组件预设 ([2ca4deb](https://github.com/thelastcookies/WEB-BASE/commit/2ca4deb3375eae4add18a0c4762677592a176567))
* 新增 ApiSelect 和 ApiTreeSelect 组件，并同步补充示例 ([4cbb3c7](https://github.com/thelastcookies/WEB-BASE/commit/4cbb3c7fda4ef38d6a49b8705d5c74bbf4d63573))
* 新增 BaseTreeSelect 组件，新增 id，pId 格式树示例 ([010fbdd](https://github.com/thelastcookies/WEB-BASE/commit/010fbddb6619ec6b9f9cb7c9fa7d63a767207fbc))
* 新增 QueryForm 中 Checkbox 组件全选功能支持 ([0294bb8](https://github.com/thelastcookies/WEB-BASE/commit/0294bb8f3e21a8621439914914ba42bc8d4ed473))
* 新增 QueryForm 中下拉框组件全选功能支持 ([5b5efb6](https://github.com/thelastcookies/WEB-BASE/commit/5b5efb656d6040da32e5f5b71319deccbf0c65af))
* 新增 QueryForm 组件的插槽支持 ([c85d2a7](https://github.com/thelastcookies/WEB-BASE/commit/c85d2a78dfcd8b4d7b8a866f95631fd285efb700))


### Bug Fixes

* 新增 QueryForm onFinish 时的错误处理 ([72415a0](https://github.com/thelastcookies/WEB-BASE/commit/72415a06cc209da80f07769d2519a629cf9f8d42))

## [0.17.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.16.0...v0.17.0) (2024-08-20)


### Features

* 使用 PageHeader 组件来代替 Breadcrumb 组件 ([c0c6183](https://github.com/thelastcookies/WEB-BASE/commit/c0c6183418466abfc25a27b1e3c699a306761bf7))
* 增加 PageHeader 组件的动态标题和返回按钮支持 ([1669029](https://github.com/thelastcookies/WEB-BASE/commit/1669029f1b58925e7b0c6076a713a0c1c8cfd51a))
* 完善 ECharts 组件的 resize 功能 ([57b9c4a](https://github.com/thelastcookies/WEB-BASE/commit/57b9c4a2f3c57a22e206d198d463bec689bcce97))
* 完善 QueryForm 组件 ([d3e313f](https://github.com/thelastcookies/WEB-BASE/commit/d3e313f61cb659c044cb568778080d1e3d9e3880))
* 完善 QueryForm 组件的初始化注入 ([a482ce7](https://github.com/thelastcookies/WEB-BASE/commit/a482ce76adc4bb54363101fba1e6bd6db557d1a8))
* 扩充 Action 的 meta 字段支持 ([8dda5c0](https://github.com/thelastcookies/WEB-BASE/commit/8dda5c090290deb4bb8834683a94e6d16cef3fa7))
* 扩展 ECharts 组件初始化参数，修复主题切换时图表主题没有正确切换的问题 ([5731935](https://github.com/thelastcookies/WEB-BASE/commit/573193525eed959fdc4897a58893f1c4312bb4e8))


### Bug Fixes

* 修复 ECharts 组件 option 设置的问题 ([a8e66eb](https://github.com/thelastcookies/WEB-BASE/commit/a8e66eb2fa891ad464057cf085c1c306c4e1c14f))
* 完善 QueryForm 的时间选择示例 ([03d01d0](https://github.com/thelastcookies/WEB-BASE/commit/03d01d0ac76fbe1d2971063158cdc8ace9b1680b))
* 将 dayjs 的本地化迁移到 useTheme 中，以修复时间类时间本地化不正确的问题 ([ec0648a](https://github.com/thelastcookies/WEB-BASE/commit/ec0648a2eb794dd1636bad7f6fb6f0375f8d855f))
* 补充 Theme 变化发布方法的销毁，防止内存泄漏 ([1fede5b](https://github.com/thelastcookies/WEB-BASE/commit/1fede5b65d1391e398bf0733092cc45915ee65de))

## [0.16.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.15.0...v0.16.0) (2024-08-16)


### Features

* 完善禁用登录功能 ([a5e145a](https://github.com/thelastcookies/WEB-BASE/commit/a5e145ab2cae7219f3722d29f17c735a8c86925a))
* 新增路由对于地址栏 url 的响应，无论是否启用登录皆有效 ([7060eeb](https://github.com/thelastcookies/WEB-BASE/commit/7060eebbbee3a0e115abbccf0b1a38f48353384e))

## [0.15.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.14.0...v0.15.0) (2024-08-15)


### Features

* 完善 ECharts 组件，支持深色模式 ([ba117dd](https://github.com/thelastcookies/WEB-BASE/commit/ba117dd57c4794cc54a0f00a8098afd9182952ce))
* 完成实时、历史数据接口的迁移，历史数据请求以及数据处理方法的封装 ([f82989e](https://github.com/thelastcookies/WEB-BASE/commit/f82989ec57193d6039af0a9532085094921f6b87))
* 对 dayjs 进行封装和扩展 ([d8ea77d](https://github.com/thelastcookies/WEB-BASE/commit/d8ea77d284db0fa265596af147ebe3cb64401f9d))
* 新增 DesignToken 的导入，将 App.vue 中的环境监测和主题应用抽离到 hooks 中 ([bfcfe0e](https://github.com/thelastcookies/WEB-BASE/commit/bfcfe0e7b534e1e268e91769ee8baaf0def016ab))
* 新增 ECharts 组件 ([a6ebe18](https://github.com/thelastcookies/WEB-BASE/commit/a6ebe18624e549dce4e1c09ed31df2d8a6007014))
* 新增定时刷新 hook ([05ace01](https://github.com/thelastcookies/WEB-BASE/commit/05ace01bfe56d1d78284c11e61eab72975cae94d))


### Bug Fixes

* 将表单编辑器的未完成部分注释 ([22dc963](https://github.com/thelastcookies/WEB-BASE/commit/22dc9634a3f811b0cb86ae024095c1d42377214b))
* 注释无用代码保证构建成功 ([34eddc9](https://github.com/thelastcookies/WEB-BASE/commit/34eddc96034101ed85a98c021e079435ee20f83b))
* 调整部分代码以通过 tsc ([ad9fa76](https://github.com/thelastcookies/WEB-BASE/commit/ad9fa764844c092474c821c7e4ab6c47452d1d4e))

## [0.14.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.13.0...v0.14.0) (2024-08-13)


### Features

* 增加用户、菜单、权限等页面的静态路由配置 ([6b828de](https://github.com/thelastcookies/WEB-BASE/commit/6b828dea0d7110ba823bb71d1a55fed26df322f6))
* 完善 ActionTree, SlidePicker 组件的 sample ([49370fe](https://github.com/thelastcookies/WEB-BASE/commit/49370fe501daebe869c1b3eb8befb8eeeccfecd7))
* 完善 TreeNode 类的功能 ([5db994d](https://github.com/thelastcookies/WEB-BASE/commit/5db994d0d94d059971edca7eb41263faec4efe16))
* 完成 Action 相关接口迁移 ([51bf5a6](https://github.com/thelastcookies/WEB-BASE/commit/51bf5a6284fd813800a64bd7d875865af332c5a1))
* 完成 Home 相关接口迁移 ([e7440d5](https://github.com/thelastcookies/WEB-BASE/commit/e7440d5f653859317d9a220fd6c5ade202b74dbc))
* 完成 Role 相关接口迁移 ([b88a708](https://github.com/thelastcookies/WEB-BASE/commit/b88a7080b8c0b0e8caf89aaf116cedbca8cf47f1))
* 完成 User 相关接口迁移 ([66bdccb](https://github.com/thelastcookies/WEB-BASE/commit/66bdccbd1c302a2c0d816f3ea2e02acf31a43447))
* 完成用户管理页面的基本功能 ([f9dab6c](https://github.com/thelastcookies/WEB-BASE/commit/f9dab6c7a59f500467707c54cce3573370bad13e))
* 完成菜单树组件的封装 ([f9375e0](https://github.com/thelastcookies/WEB-BASE/commit/f9375e00973dc4d68e5cfc40fdf86e48d19658fe))
* 将菜单树组件进行了完善与拆分，分别为树组件与树下拉选择组件 ([c1e7326](https://github.com/thelastcookies/WEB-BASE/commit/c1e7326bf3e17fa14b6bb446f34f34be1196084a))
* 新增 BaseQueryForm 封装组件 ([4fc0a0c](https://github.com/thelastcookies/WEB-BASE/commit/4fc0a0c3b87ffa5359e46c01c686e56a0ff31ada))
* 新增 menuStore 用于作为全局的菜单状态存储 ([1fbef5b](https://github.com/thelastcookies/WEB-BASE/commit/1fbef5b509255720b598c4748345fc7d881f2271))
* 新增用户，角色，权限的接口以及类型声明 ([c27982c](https://github.com/thelastcookies/WEB-BASE/commit/c27982cf011f14dce2e449124a8172154c18875d))
* 角色管理页面基本功能 ([75803cc](https://github.com/thelastcookies/WEB-BASE/commit/75803cc8845b64268eb3154f78c8f6f6a7f15c1b))
* 调整全局的枚举声明 ([71f49b6](https://github.com/thelastcookies/WEB-BASE/commit/71f49b6dd61a1b6d95c1a9b0577885f862313ffe))

## [0.13.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.12.0...v0.13.0) (2024-07-20)


### Features

* 增加 antd 的颜色预设到 UnoCSS ([09f7c6d](https://github.com/thelastcookies/WEB-BASE/commit/09f7c6df090a875165ab0e490637f90826acf5af))
* 新增全局的设备类型状态存储，优化 Header 和 UserAvatar 的移动端适配方式 ([a7c9dbb](https://github.com/thelastcookies/WEB-BASE/commit/a7c9dbba8af11a42106a4ae35549a15478467b6c))
* 新增外链的占位页面，同时更新路由组织和跳转方法 ([7cd5b06](https://github.com/thelastcookies/WEB-BASE/commit/7cd5b063b7ea04d2e3b70d2f74930a3896852c30))
* 新增浏览器环境检测功能 ([35f67a7](https://github.com/thelastcookies/WEB-BASE/commit/35f67a7317495e1c0747dca62a2240728a191898))
* 新增移动端适配的底部菜单栏 ([fe47f95](https://github.com/thelastcookies/WEB-BASE/commit/fe47f9579d3c008bf6ee94dd2ba78f35112aa762))
* 新增菜单的 icon 配置 ([0bdb1b0](https://github.com/thelastcookies/WEB-BASE/commit/0bdb1b0a32995eaef7c00f99a2b684bae88b0ce9))


### Bug Fixes

* 修复环境变量配置问题 ([c8a51f7](https://github.com/thelastcookies/WEB-BASE/commit/c8a51f7a6896f67472abee9152527ac7fa034a4a))
* 修复环境变量配置问题补充提交 ([0ee6fde](https://github.com/thelastcookies/WEB-BASE/commit/0ee6fde907941726a8acb4dc421fd16ac0daaea1))
* 修复顶层页面过渡动画失效的问题 ([d76abd5](https://github.com/thelastcookies/WEB-BASE/commit/d76abd53146aa71eb97d86220d9ee5e7f1250ed5))
* 增加外链页面没有正常跳转的提示 ([5fb8b38](https://github.com/thelastcookies/WEB-BASE/commit/5fb8b389b036586f3b752cbcbfaa97c7375bfb16))

## [0.12.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.11.0...v0.12.0) (2024-07-17)


### Features

* 完善 Layout，Header 组件的移动端适配 ([58a2188](https://github.com/thelastcookies/WEB-BASE/commit/58a21887566eafedf693d87cdd512b79ceab76fd))
* 完善登录页的移动端适配 ([3567f23](https://github.com/thelastcookies/WEB-BASE/commit/3567f23a73d3ec7044fdaa0f9bbcb5652e9975b2))
* 新增禁用路由守卫的功能 ([d9ae733](https://github.com/thelastcookies/WEB-BASE/commit/d9ae733ffb5a77840df487a4fd14470ecb17fda8))


### Bug Fixes

* 修复一个可能导致时间选择器所选值非法的问题 ([ac6176a](https://github.com/thelastcookies/WEB-BASE/commit/ac6176ab4d5f0ca57d2c005fdfce7777e158e149))

## [0.11.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.10.0...v0.11.0) (2024-07-15)


### Features

* 新增页面切换 transition 效果 ([d7e1595](https://github.com/thelastcookies/WEB-BASE/commit/d7e15958c1b4050a7b662537dda68619b97d1644))


### Bug Fixes

* 解决 Windows 系统下项目路径解析错误的问题 ([42c068a](https://github.com/thelastcookies/WEB-BASE/commit/42c068ad59780cad4bb0c5b78ed7b410ae53a544))

## [0.10.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.9.0...v0.10.0) (2024-07-06)


### Features

* 新增表单设计器功能模块 ([a9ee194](https://github.com/thelastcookies/WEB-BASE/commit/a9ee194cc666d6106099b1a44b9a98cbea6929bf))


### Bug Fixes

* 修复一个可能导致登录时 disable 状态异常的问题 ([b33a85b](https://github.com/thelastcookies/WEB-BASE/commit/b33a85b849048d6290d8ea4d268c7d11e2c5afb8))
* 修改 BaseIcon size 配置项 ([b4e45c8](https://github.com/thelastcookies/WEB-BASE/commit/b4e45c81c49b9e0c3fba9a045b739d5114b2a9c4))

## [0.9.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.8.0...v0.9.0) (2024-06-30)


### Features

* 增加 SlidePicker 组件与组件 Sample ([c3c4c43](https://github.com/thelastcookies/WEB-BASE/commit/c3c4c43540d5d60029fa968b66683c05b250c570))
* 增加 SlidePicker 组件自定义颜色支持 ([ea83b6f](https://github.com/thelastcookies/WEB-BASE/commit/ea83b6f3b8871054bdab08387c8d07285096c8fb))
* 增加特殊页面 Sample.vue ([a9119df](https://github.com/thelastcookies/WEB-BASE/commit/a9119df90d8721d869715ad5f1187d1f59fb37ad))
* 重新设计路由组织形式，增加对 iframe 页面嵌入的支持，增加静态路由示例 ([4e32809](https://github.com/thelastcookies/WEB-BASE/commit/4e328097621b8618e8f7e0d9e0226158f7a0cf60))


### Bug Fixes

* 修改 App.vue 中包裹路由的 div 设置 ([33bd9e5](https://github.com/thelastcookies/WEB-BASE/commit/33bd9e531607e510bea69e81cd364471885d5589))
* 特殊状态下 SlidePicker 编辑状态无法退出的问题消缺。 ([6c7c60b](https://github.com/thelastcookies/WEB-BASE/commit/6c7c60b0cd6ce68950ffab1302b74e656ce318e2))

## [0.8.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.7.0...v0.8.0) (2024-05-05)


### Features

* 为类型为菜单的页面配置 redirect，指向第一个配置了 path 的直系子孙 ([e12df0c](https://github.com/thelastcookies/WEB-BASE/commit/e12df0c43747087e9e0a9266337263013b2ec47f))
* 使用 data-fns 作为时间处理工具 ([089cf56](https://github.com/thelastcookies/WEB-BASE/commit/089cf561bed577a69acce4f89bef5c594a6d659f))
* 增加表格中按钮样式 preset ([6ec643a](https://github.com/thelastcookies/WEB-BASE/commit/6ec643ad35645c9587067653fe4614bbad7731fc))
* 增加随路由自动展开当前活跃菜单的功能 ([658239f](https://github.com/thelastcookies/WEB-BASE/commit/658239f06c33151acfd53b9b9d0216eeb77a002b))
* 定义 routeTo 方法参数的联合类型 ([a99d758](https://github.com/thelastcookies/WEB-BASE/commit/a99d758d293246ff547183af3fc9f3afde535eed))
* 对 ActionItem 接口类型进行拆分细化 ([3b51146](https://github.com/thelastcookies/WEB-BASE/commit/3b5114640191297ab500d1e4f78981b52237137e))
* 将导航方法 "routeTo" Promise 化，并增加导航到菜单时的处理方法 ([f54e7b9](https://github.com/thelastcookies/WEB-BASE/commit/f54e7b990989054ffef29f14fe25f7b723545cdf))
* 弃用平铺路由，使用层级路由来更好地发挥 Vue Router 的能力 ([82f1af3](https://github.com/thelastcookies/WEB-BASE/commit/82f1af37484eb6d173c1fb53cbfda8788dfb8a16))


### Bug Fixes

* 优化了侧边栏菜单的生成方法，修复可能的类型错误问题 ([9e5faa8](https://github.com/thelastcookies/WEB-BASE/commit/9e5faa8ca66e31a098e6cbd914d3fde3550ef459))
* 修复一个可能导致注销后重新登录时菜单加载失败的问题 ([40f705b](https://github.com/thelastcookies/WEB-BASE/commit/40f705b1b5d35495419b073628ac3ed6317a9152))
* 修改控制台错误提示输出 ([fdae4d2](https://github.com/thelastcookies/WEB-BASE/commit/fdae4d232759537ab7a8007751595340a1b464b0))
* 去除多余的样式 ([16a1a80](https://github.com/thelastcookies/WEB-BASE/commit/16a1a80818221038b43ddee0702dff99ccdd304c))
* 解决 token 失效时引起导航问题 ([60eda90](https://github.com/thelastcookies/WEB-BASE/commit/60eda900222d8c966b92e7e6b573eb52d03a030c))
* 设置中文环境 ([92f93e1](https://github.com/thelastcookies/WEB-BASE/commit/92f93e1b469ab0f07a82d13e4e2d792112d34965))

## [0.7.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.6.0...v0.7.0) (2024-04-04)


### Features

* 对影响整体布局紧凑度的内外边距值进行 CSS 变量提取，并增加 UnoCSS 支持 ([8e1aad7](https://github.com/thelastcookies/WEB-BASE/commit/8e1aad7b766856d7953bc0b6bbe8e501b699df8d))


### Bug Fixes

* 修复 AppStore 中没有正确验证配置文件与没有 resolve 的问题 ([82b0523](https://github.com/thelastcookies/WEB-BASE/commit/82b0523e0af35a13f690f98a8b0150a65677952b))
* 修复 UserStore 没有正确地抛出异常导致 Token 过期后系统加载异常的问题 ([e9db47d](https://github.com/thelastcookies/WEB-BASE/commit/e9db47d33e3d88e652e692e62e903f8c2377d477))
* 修复登录表单有默认值时 label 状态异常的问题，增加账户 input 的自动聚焦 ([05f2ea8](https://github.com/thelastcookies/WEB-BASE/commit/05f2ea856cc16d90a521883ac31fa4d67c64d739))
* 修复系统根节点的颜色错误问题，调整 rem 基值 ([e1be34f](https://github.com/thelastcookies/WEB-BASE/commit/e1be34f0a7a003fde24533f6d05b8768b847fece))
* 补充路由守卫中遗漏的错误处理 ([4d0d5ef](https://github.com/thelastcookies/WEB-BASE/commit/4d0d5ef1de114bb2ab8fb59dcb4581366a3ea3ca))

## [0.6.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.5.0...v0.6.0) (2024-03-31)


### Features

* 使用订阅路由变化的方式更新菜单和面包屑 ([409d742](https://github.com/thelastcookies/WEB-BASE/commit/409d74277fcc6df9a6b0c626c411e04ea78ffe7c))
* 增加路由组件传参支持 ([ad00a52](https://github.com/thelastcookies/WEB-BASE/commit/ad00a52308c0d1d40c5484fb8b6d427ce8e2b45c))
* 完善菜单功能，增加对隐藏菜单的支持 ([7294190](https://github.com/thelastcookies/WEB-BASE/commit/729419049343aff7f4c2f0486e6f0b94d5188182))
* 新增 UnoCSS 主题，导入 Antdv CSS 变量 ([7b1d11b](https://github.com/thelastcookies/WEB-BASE/commit/7b1d11bc4e839bfd33d7596c098bb35bccd42517))


### Bug Fixes

* 使用 UnoCSS 'vue-scoped' mode，解决 UnoCSS 样式优先级低的问题 ([57af199](https://github.com/thelastcookies/WEB-BASE/commit/57af19907016bbb0e8334ee8b8fde972cfd5cde5))
* 修复 ActionStore 方法在初始化前被调用的问题 ([a042989](https://github.com/thelastcookies/WEB-BASE/commit/a042989d3fef64e062c37060da5e79bd2625e504))
* 修复 UserAvatar.vue 文字颜色错误的问题 ([58ef791](https://github.com/thelastcookies/WEB-BASE/commit/58ef791211e2212f87475c8c8cb50da1124979d9))
* 删除 Layout.vue 中的多余内容 ([8cceb1d](https://github.com/thelastcookies/WEB-BASE/commit/8cceb1d2273549ca60fdbf896db3fbabd8a8def5))
* 增加 guard.ts 的错误提示 ([cc9cc5c](https://github.com/thelastcookies/WEB-BASE/commit/cc9cc5c362ee456fdbc0c8e227791f42d1945d93))
* 增加面包屑组件数据校验，修复死循环问题 ([98ba5f4](https://github.com/thelastcookies/WEB-BASE/commit/98ba5f46213718f8c51ac3d44a82b29e8a527d61))
* 新增路由配置缺陷时的提示 ([a5076c7](https://github.com/thelastcookies/WEB-BASE/commit/a5076c73839b25c9d9fb3216f71a627658cc8a31))

## [0.5.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.4.0...v0.5.0) (2024-03-28)


### Features

* 增加登录表单提交后禁用功能 ([34e398d](https://github.com/thelastcookies/WEB-BASE/commit/34e398d4f9384a70fb3c15080d77f2160d07a200))


### Bug Fixes

* 修复 404 页面无法正常展示的问题 ([cceddb1](https://github.com/thelastcookies/WEB-BASE/commit/cceddb10c791e6ac07d3cf629d42cb2ea825db5b))
* 修改 tsconfig.json 配置 ([cbe50ec](https://github.com/thelastcookies/WEB-BASE/commit/cbe50ecea0a3ee6755cb55629ed6b66f08d9839f))
* 添加路由匹配失败时的回退模式 ([b36f10a](https://github.com/thelastcookies/WEB-BASE/commit/b36f10a2e9b10385e12a886d49d076a2d5a72e82))

## [0.4.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.3.0...v0.4.0) (2024-03-26)


### Features

* 新增 Loading 组件 ([0233340](https://github.com/thelastcookies/WEB-BASE/commit/023334042fe7d99b8aa4b8b7d44bba95ffddc27e))
* 新增用户头像组件 ([e645239](https://github.com/thelastcookies/WEB-BASE/commit/e645239142572bf9220fea5c4bceda7b720253a8))
* 新增登录后系统总入口 ([f1275d1](https://github.com/thelastcookies/WEB-BASE/commit/f1275d1c3b4e071327307232b00fb11873de775a))
* 新增边栏菜单组件 ([5c300e4](https://github.com/thelastcookies/WEB-BASE/commit/5c300e4eb925414670b187cabe1481035ad09b13))
* 新增面包屑组件 ([58c6f7b](https://github.com/thelastcookies/WEB-BASE/commit/58c6f7bdc8f42a11ff144e911effffbf8e15c8bf))
* 新增页眉组件 ([6472120](https://github.com/thelastcookies/WEB-BASE/commit/647212016a8c175c9ec1c94622a05e412abb235a))


### Bug Fixes

* 修改 Less 变量为 CSS 变量 ([737cd1a](https://github.com/thelastcookies/WEB-BASE/commit/737cd1abf97634fdbf1db40dbe2853897821a034))
* 删除已不需要的内容 ([66cc8a9](https://github.com/thelastcookies/WEB-BASE/commit/66cc8a973a0a6071b1025dce50b127a288cbfaf3))
* 补充 Layout.vue 的路由配置 ([f2335ea](https://github.com/thelastcookies/WEB-BASE/commit/f2335ea787e710173ee0ca582283f3435ef4b03f))
* 调整页眉，面包屑，头像组件的位置 ([7bf345b](https://github.com/thelastcookies/WEB-BASE/commit/7bf345beb9bbc99a8031ecf52bfc2db589a7651f))

## [0.3.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.2.0...v0.3.0) (2024-03-25)


### Features

* 新增 BaseIcon.vue 特性 ([ee5a30b](https://github.com/thelastcookies/WEB-BASE/commit/ee5a30bfe5259e59d77f77de006b08226a1cc311))
* 新增 Login.vue，作为系统登录页 ([bc15af3](https://github.com/thelastcookies/WEB-BASE/commit/bc15af333a6e90042ed93676c25805128094edec))
* 新增 LoginForm.vue 组件 ([d9b050b](https://github.com/thelastcookies/WEB-BASE/commit/d9b050b74092d8b72f64513f2f009408f27020b8))


### Bug Fixes

* 修复 App 组件内缺少 RouterView 的问题 ([77bee7c](https://github.com/thelastcookies/WEB-BASE/commit/77bee7c0636a3c7875ea1870845ecd68c22a4eb5))
* 修改 env 环境变量的存储路径使 index.html title 正常显示 ([16cf686](https://github.com/thelastcookies/WEB-BASE/commit/16cf686843f06cd697de2ae6325a8398ed688ccb))

## [0.2.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.1.0...v0.2.0) (2024-03-25)


### Features

* 在应用级别引入深浅色 antdv 主题 与 CSS 变量，实现主题切换功能 ([5395fbc](https://github.com/thelastcookies/WEB-BASE/commit/5395fbcc2107327aa820eedd47f1f0549dde0b85))
* 根据 Antdv 新增深色、浅色模式的 CSS 变量 ([981f3a4](https://github.com/thelastcookies/WEB-BASE/commit/981f3a45b571f8532f2d43c126001a779e4a6535))

## [0.1.0](https://github.com/thelastcookies/WEB-BASE/compare/v0.0.0...v0.1.0) (2024-03-25)


### Features

* 按照不同的请求方法对 axios 实例进行再封装 ([ce4c970](https://github.com/thelastcookies/WEB-BASE/commit/ce4c97023241a5b3185bf63bb496ddb9057624ad))
* 新增 Action 状态管理 ([791c161](https://github.com/thelastcookies/WEB-BASE/commit/791c161561d2385403e3e5ca1063949218895b94))
* 新增 App 应用状态管理 ([c54a26c](https://github.com/thelastcookies/WEB-BASE/commit/c54a26cdfc7a51a6a99540d801881882eb2c5456))
* 新增 axios 功能扩展，包括请求、响应的处理；导出 axios 实例 ([03ef1f7](https://github.com/thelastcookies/WEB-BASE/commit/03ef1f7aa578d8d0a2923ba35f822999c5333e6e))
* 新增 BaseIcon.vue 组件 ([835c23b](https://github.com/thelastcookies/WEB-BASE/commit/835c23b3599f0fad48cc7e25154ecc3dc8450616))
* 新增 token 状态管理 ([1bdbccf](https://github.com/thelastcookies/WEB-BASE/commit/1bdbccf5982088c451045bbbbfbc1e22711da10c))
* 新增 UnoCSS 配置，并注入 Vite Plugins ([d4ec60e](https://github.com/thelastcookies/WEB-BASE/commit/d4ec60e6726eacc8776d43024a5eab90d0b13f20))
* 新增基本的用户、角色、菜单、权限接口 ([d02a2c1](https://github.com/thelastcookies/WEB-BASE/commit/d02a2c148c40ce5245b9901c5346b2f8943a2182))
* 新增用户信息状态管理 ([178d494](https://github.com/thelastcookies/WEB-BASE/commit/178d4941351fb593030c710b3a15d3f5e4184303))
* 新增路由动态生成功能 ([f08cebf](https://github.com/thelastcookies/WEB-BASE/commit/f08cebf9abb4e1c9a62d3de76545b106fb0e9044))
* 新增路由守卫 ([b1390f4](https://github.com/thelastcookies/WEB-BASE/commit/b1390f4b665ec4b6edb1d4e9db8427cd6365c277))
* 新增静态路由配置文件 ([a252a90](https://github.com/thelastcookies/WEB-BASE/commit/a252a90e54f2ada72f8811688a149d5c1947c3bf))
* 新增页面组件的 Glob 导入功能 ([28b2437](https://github.com/thelastcookies/WEB-BASE/commit/28b2437bf482e26236e45f3dbae15c85ee6b770f))

## 0.0.0 (2024-03-25)


### Continuous Integration

* 集成 GitHub Actions，Husky，Commitlint ([d76a779](https://github.com/thelastcookies/WEB-BASE/commit/d76a779e4c8cddb4d5ea84cc142599f249bf0e12))
