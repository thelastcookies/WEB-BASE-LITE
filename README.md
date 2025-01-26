# WEB-BASE

一个使用 Vue3+s 技术栈的 Web 浏览器端模板项目。

## 编写目的

详细地阐述一个标准化的 Vue3+s 工程项目的构建流程。

## 关键字

- Vue3，TypeScript，Vite；
- Less，UnoCSS；
- Ant Design Vue；
- unplugin-auto-import，unplugin-vue-components；
- Node，pnpm；
- GitHub，GitHub Actions，GitHub Workflows，Release Please；
- Conventional Commit，Husky，Commitlint；
- macOS，类 Unix，WebStorm；

## 项目目录及说明

```
|-- .env                    # 环境变量
|-- |-- types
|-- |-- |-- env.d.ts        # 环境变量类型声明
|-- |-- .env                # 项目环境变量
|-- |-- .env.development    # 开发环境变量
|-- |-- .env.production     # 发布环境变量
|-- .github                 # GitHub 配置
|-- |-- workflows           # GitHub Workflows 配置
|-- |-- |-- release-please.yml # release-please 配置文件
|-- .husky                  # Git hooks 脚本
|-- |-- commit-msg
|-- |-- pre-commit
|-- plugins                 # 插件（各分目录下 index.ts 为各插件的配置入口）
|-- |-- auto-imports        # unplugin-auto-import
|-- |-- unocss              # UnoCSS
|-- |-- |-- antd-uno-theme.json # Antdv 的 CSS 变量参考
|-- |-- |-- index.ts
|-- |-- |-- uno.config.ts   # UnoCSS 配置
|-- |-- vue-components      # unplugin-vue-components
|-- |-- index.ts            # Vite 插件配置入口
|-- public                  # 公共静态资源
|-- |-- logo.svg            # 项目系统 logo
|-- src                     # 源代码
|-- |-- api                 # 接口
|-- |-- |-- index.ts        # 接口基本配置（同级目录下为各个功能模块的接口以及类型声明文件）
|-- |-- assets              # 项目静态资源
|-- |-- |-- font            # 字体资源
|-- |-- |-- images          # 图片资源
|-- |-- |-- theme           # 样式资源（侧重在变量与深色模式）
|-- |-- |-- index.less      # 项目系统样式文件
|-- |-- components          # 组件级别的 Vue 组件
|-- |-- |-- base            # 基本组件
|-- |-- |-- common          # 公共组件
|-- |-- enums               # 枚举类型
|-- |-- |-- http.ts         # http 请求相关的枚举类型
|-- |-- |-- index.ts        # 公共枚举类型
|-- |-- |-- naming-style.ts # 命名风格的枚举类型
|-- |-- hooks               # 组合式函数
|-- |-- |-- axios-extends   # axios 的封装，配置拦截器和错误处理
|-- |-- |-- request.ts      # 按照 request methods 对 axios-extends 的封装
|-- |-- router              # 路由管理（Vue Router）
|-- |-- |-- generate.ts     # 生成路由
|-- |-- |-- guard.ts        # 路由守卫
|-- |-- |-- index.ts        # 创建路由实例
|-- |-- |-- listener.ts     # 路由状态监听
|-- |-- |-- modules.ts      # 连接路由配置与页面组件
|-- |-- |-- navigate.ts     # 路由导航
|-- |-- stores              # 状态管理（Pinia）
|-- |-- |-- action          # Action 状态
|-- |-- |-- app.ts          # 项目系统状态
|-- |-- |-- token.ts        # Token 状态
|-- |-- |-- user.ts         # 用户信息状态
|-- |-- types               # 全局的类型声明
|-- |-- |-- constants       # 常量类型
|-- |-- |-- symbol          # Symbol
|-- |-- |-- action          # Action 类型
|-- |-- |-- index.d.ts      # 公共类型声明
|-- |-- utils               # 工具
|-- |-- views               # 页面
|-- |-- |-- common          # 公共页面
|-- |-- |-- exceptions      # 异常页面
|-- |-- |-- layouts         # 布局页面
|-- |-- App.vue             # 项目根组件
|-- |-- main.ts             # 项目入口 TypeScript 脚本，用于创建 Vue 实例，配置全局设置并挂载根组件。
|-- |-- style.css           # 项目根 CSS 文件
|-- |-- vite-env.d.ts       # Vite 类型声明文件，用于定义全局的类型和变量。
|-- .commitlintrc.json      # Commitlint 配置文件
|-- .gitignore              # Git 忽略文件
|-- CHANGELOG.md            # 项目变更日志
|-- index.html              # 项目入口 HTML 文件
|-- LICENSE
|-- package.json            # 项目元信息和依赖项配置文件
|-- README.md               # 项目说明文档
|-- tsconfig.json           # TypeScript 配置文件
|-- tsconfig.node.json      # 针对 Node 环境的 TypeScript 配置文件
|-- vite.config.ts          # Vite 配置文件
```

## 构建步骤

### GitHub 新建仓库

在 GitHub 中新建空仓库，可参考 GitHub
Docs：[Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
。可按照默认选项直接创建。

建立空仓库后，参考 `Quick setup` 中提供的 HTTPS/SSH URL 地址，将项目拉取到 IDE 中。

### IDE 初始化

在 WebStorm 菜单 `File > New > Project from Version Control` 中将上一步中的 URL 地址填入，进行 Clone。

### Vue 项目初始化

在 Terminal 中使用项目模板在当前目录下初始化 Vue 项目。

```shell
pnpm create vite . --template vue-ts
```

> Tips:
>
> 如果在创建项目文件时出现下述提示：
>
> ```shell
> Current directory is not empty. Please choose how to proceed:
> ❯   Remove existing files and continue
> Cancel operation
> Ignore files and continue
> ```
>  选择 `Ignore files and continue` 即可，因为当前目录下存在 `.git` 文件夹和 `.idea` 文件夹，当前提示目录下并不为空，所以忽略并继续执行即可。

### 配置 GitHub Workflows

#### 生成 Personal Access Token (PAT)

进入 GitHub 个人账户的 [Settings](https://github.com/settings/profile)
页面，点击 `Developer Settings > Personal access tokens > Fine-grained tokens` 进入菜单。

点击 `Generate New Token` 按钮进入 `PAT` 的创建页面。

填写表单的 `Token name`，`Expiration` 字段后，在 `Repository access` 单元下选择 `All repositories`
或 `Only select repositories（需指定特定的仓库）`。

在 `Permissions` 单元下展开 `Repository permissions` 下拉列表，将 `Actions`、`Contents`、`Pull requests` 与 `Workflows`
设置为 `Access：Read and Write`。

如果进行了正确配置，则在 `Overview` 单元下会有类似 `5 permissions for all of your repositories`
字样，展开可看到 `Actions`、`Contents`、`Pull requests` 与 `Workflows` 的 `Access: Read and write` 配置。

配置确认无误后，点击 `Generate token` 按钮，并将生成的 Token 妥善保存。

其他配置内容详见 GitHub
Docs：[Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)。

> Tips：
>
> 要确保将 Token 妥善保存，页面关闭后该 Token 的值将不可见。
>
> 如果 Token 丢失，可以进入 Token 详情页点击 `Regenerate token` 按钮重新生成，当前页面同样可以更改其他的配置项。
>
> 本文档中的生成的 Fine-grained tokens 方法在 2024.03.25 时为 Beta 版本，不排除后续菜单内容、配置方法等会发生变更，以官方文档为准。

#### 配置 Actions Secrets

进入 GitHub 该项目的主页下，点击 `Settings > Secrets and variables > Actions` 进入菜单。

在 `Repository secrets` 单元下点击 `New repository secret` 按钮。

在页面中完成表单，`Name` 可自定名称，`Secret` 需要将上一步中生成的 PAT 填入，点击 `Add secret` 按钮。

其他配置内容详见 GitHub
Docs：[Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)。

### 配置 Release Please

在项目根目录下新建 `.github/workflows/release-please.yml`
文件，配置内容参考 [release-please.yml](.github/workflows/release-please.yml)。

在 `token` 字段中需要配置上一步 `Actions secrets` 的 `Name` 字段。

### 配置 Commitlint

安装并配置 Commitlint。

```shell
pnpm add -D @commitlint/{cli,config-conventional}

echo -n '{"extends": ["@commitlint/config-conventional"], "rules": {"type-enum": [2, "always", ["init", "feat", "fix", "build", "chore", "ci", "docs", "style", "refactor", "perf", "test", "revert"]]}}
' > .commitlintrc.json
```

### 配置 Husky

安装并初始化 husky，为 commit-msg 钩子增加提交信息规范校验。

```shell
pnpm add -D husky

npx husky init

echo "npx --no -- commitlint --edit \"\$1\"" > .husky/commit-msg

echo -n "" > .husky/pre-commit
```

### 配置 IDE Plugins

选择 `Plugins` 菜单进入 `Marketplace` 标签页，查找 `Conventional Commit` 插件并安装。

### 新建 CHANGELOG 文件

```shell
touch CHANGELOG.md
```

### 提交，推送与测试

至此，Vue 工程与 GitHub Actions 已配置完成，可以将目前的工程文件进行提交和推送，并测试 GitHub Actions 是否正常工作。

进行初次提交的 `Commit Message` 编写时，最佳实践是添加一个 `Release-As: 0.0.0` 的脚注，约定初始版本号。

```text
init: 工程初始化

Release-As: 0.0.0
```

**进行 `git push` 时一定要注意，提交到远程仓库的分支应与 [release-please.yml](.github/workflows/release-please.yml)
中的 `branches` 配置项一致。在本项目中为 main 分支上，即 `origin/main`**。

完成推送后，进入 GitHub 该项目的主页下，点击 `Actions` 进入 `Workflows` 的状态查询页面。

如果配置正确，在 `Workflows > release-please` 下可以看到成功运行的 `init` 工作流。

并且，在项目主页下点击进入 `Pull requests` 后会看到由 `Actions` 生成的类似 `chore(main): release 0.0.0`
的 `pull request`。

可以根据实际需求选择 `Merge`，`Rebase`，`Squash` 三种方式来创建 `release`。

完成后可以在项目主页下通过查看 `Tags`、`Releases`、`Commits` 等方法来确认提交和发布。

### Troubleshoot

#### 1. 完成配置并提交后，`GitHub Actions` 菜单下无内容

排查 `.github/workflows/release-please.yml` 是否正确配置并提交、推送。

#### 2. `Actions` 执行失败并提示 `Input required and not supplied: token`

排查 `secrets.AUTO_RELEASE_TOKEN` 是否与 GitHub
该项目下的 `Settings > Secrets and variables > Actions > Repository secrets` 对应。

#### 3. `Actions` 执行失败并提示 `Bad credentials`

排查 `PAT` 的正确性以及有效性。

## 增删改查页面生成和使用说明

### 生成

### 项目中目录

### 规范和约定

## To Be continued
