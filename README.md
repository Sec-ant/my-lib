# TypeScript Library Template

一个现代化的 TypeScript 库开发模板，支持双模式构建（Library + Dev App）。

## 特性

- **双构建模式**：
  - `src/lib` - 库代码（构建为 npm 包）
  - `src/app` - 开发验证应用（React + Vite）

- **开发工具链**：
  - TypeScript 5.x
  - Vite (开发和构建)
  - Biome (Linting + Formatting)
  - Vitest (测试)
  - Tailwind CSS (样式)
  - React 19

- **Git 工作流**：
  - Simple Git Hooks
  - Lint Staged
  - Commitlint (Conventional Commits)
  - Changesets (版本管理)

- **CI/CD**：
  - GitHub Actions 自动化测试
  - NPM 自动发布（OIDC 可信发布）
  - Deno Deploy 应用部署

- **依赖管理**：
  - Renovate 自动依赖更新

## 快速开始

### 1. 使用模板创建新项目

```bash
cd ~/personal
cp -r typescript-lib-template my-new-project
cd my-new-project
rm -rf .git  # 如果需要的话
```

### 2. 初始化项目

```bash
# 更新 package.json 中的项目信息
# - name
# - description
# - repository
# - author
# 等等...

# 安装依赖
pnpm install

# 初始化 git hooks
pnpm update-hooks
```

### 3. 开发

```bash
# 启动开发服务器（运行 src/app）
pnpm dev

# 运行测试
pnpm test

# 构建库
pnpm build

# 构建应用
pnpm build:app
```

## 项目结构

```
.
├── src/
│   ├── app/          # 开发验证应用
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── lib/          # 库源代码
│       ├── index.ts
│       └── utils.ts
├── tests/            # 测试文件
├── public/           # 静态资源
├── .vscode/          # VSCode 配置
├── biome.json        # Biome 配置
├── tsconfig.*.json   # TypeScript 配置
├── vite.config.*.ts  # Vite 配置
└── package.json
```

## 脚本说明

| 命令              | 说明                   |
| ----------------- | ---------------------- |
| `pnpm dev`        | 启动开发服务器         |
| `pnpm build`      | 构建库（输出到 dist/） |
| `pnpm build:app`  | 构建应用               |
| `pnpm test`       | 运行测试               |
| `pnpm test:run`   | 运行测试（CI 模式）    |
| `pnpm lint`       | 运行 Linter            |
| `pnpm format`     | 格式化代码             |
| `pnpm check`      | 检查并修复代码         |
| `pnpm type-check` | 类型检查               |

## 配置说明

### Biome

代码质量和格式化配置在 `biome.json`：

- 启用 Linting 和 Formatting
- 支持 Tailwind CSS 类排序
- 自动组织 imports

### TypeScript

- `tsconfig.json` - 项目引用配置
- `tsconfig.lib.json` - 库代码配置
- `tsconfig.app.json` - 应用代码配置

### Vite

- `vite.config.lib.ts` - 库构建配置
- `vite.config.app.ts` - 应用开发配置

## 自定义

### 添加依赖

```bash
# 运行时依赖
pnpm add <package>

# 开发依赖
pnpm add -D <package>
```

### 修改库入口

编辑 `vite.config.lib.ts`：

```typescript
lib: {
  entry: {
    index: "src/lib/index.ts",
    // 添加更多入口
    utils: "src/lib/utils.ts",
  },
}
```

### 更新 Git Hooks

编辑 `.simple-git-hooks.json`，然后运行：

```bash
pnpm update-hooks
```

## 发布

使用 changesets 管理版本：

```bash
# 添加 changeset
pnpm changeset

# 版本提升
pnpm changeset version

# 发布
pnpm publish
```

## CI/CD 配置

模板包含完整的 GitHub Actions 工作流，位于 `.github/workflows/`。

### 工作流说明

#### 1. `test.yml` - 测试

在 Pull Request 时触发，运行类型检查、Lint 和测试。

#### 2. `release.yml` - 发布到 NPM

在推送到 `main` 分支时触发，自动发布到 NPM。

**配置步骤：**

1. **在 NPM 网站启用 OIDC 集成：**
   - 访问 [npmjs.com](https://www.npmjs.com/) 并登录
   - 进入你的包页面（如果包不存在需要先手动发布一次）
   - 点击 **Settings** → **Automation**
   - 启用 **Automation tokens** 和 **OIDC tokens**
   - 或者创建一个新的 Classic Token（用于首次发布）

2. **在 GitHub 添加 Secrets：**
   - 进入仓库 **Settings** → **Secrets and variables** → **Actions**
   - 添加以下 Secrets：
     - `NPM_TOKEN` - NPM 访问令牌（用于首次手动发布，后续可用 OIDC）

3. **配置 OIDC（可选，推荐）：**
   - 在 NPM 包设置中添加 **Trusted Publishers**：
     - Publisher: `GitHub Actions`
     - Repository: `your-username/your-repo`
     - Workflow: `release.yml`

#### 3. `deploy-app.yml` - 部署到 Deno

在推送到 `main` 分支或 Pull Request 时触发，自动部署应用到 Deno Deploy。

**配置步骤：**

1. **创建 Deno Deploy 项目：**
   - 访问 [dash.deno.com](https://dash.deno.com/) 并登录
   - 点击 **New Project**
   - 输入项目名称（例如 `my-lib-app`）
   - 记录项目 ID

2. **在 GitHub 添加 Variables：**
   - 进入仓库 **Settings** → **Secrets and variables** → **Actions** → **Variables**
   - 添加以下 Variable：
     - `DENO_DEPLOY_PROJECT` - Deno Deploy 项目名称

3. **配置 Deno Deploy OIDC：**
   - 在 Deno Deploy 项目设置中，点击 **Git** → **GitHub Actions**
   - 按照指引完成 OIDC 集成
   - 或者手动添加 GitHub OIDC 提供者

### GitHub Secrets 和 Variables 清单

#### Secrets（机密）

| 名称        | 用途         | 必需           |
| ----------- | ------------ | -------------- |
| `NPM_TOKEN` | NPM 发布令牌 | 是（首次发布） |

#### Variables（变量）

| 名称                  | 用途                 | 必需               |
| --------------------- | -------------------- | ------------------ |
| `DENO_DEPLOY_PROJECT` | Deno Deploy 项目名称 | 是（如需部署 App） |

### Renovate 配置

模板已包含 `renovate.json` 配置文件，自动管理依赖更新。

**配置步骤：**

1. **安装 Renovate App：**
   - 访问 [github.com/apps/renovate](https://github.com/apps/renovate)
   - 点击 **Install**
   - 选择你的仓库（或整个组织）
   - 完成授权

2. **Renovate 配置说明：**

配置文件 `renovate.json`：

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "timezone": "Asia/Shanghai",
  "schedule": ["before 9am on monday"],
  "extends": [
    "config:best-practices",
    "helpers:pinGitHubActionDigestsToSemver",
    "customManagers:biomeVersions",
    ":preserveSemverRanges"
  ],
  "lockFileMaintenance": {
    "enabled": false
  }
}
```

**配置选项说明：**

- `timezone`: 设置时区为 Asia/Shanghai，确保更新时间符合本地时间
- `schedule`: 每周一上午 9 点前检查更新，避免频繁打扰
- `extends`: 继承预设配置
  - `config:best-practices`: Renovate 最佳实践配置
  - `helpers:pinGitHubActionDigestsToSemver`: 固定 GitHub Actions 到具体的 commit hash
  - `customManagers:biomeVersions`: 管理 Biome 版本
  - `:preserveSemverRanges`: 保留 package.json 中的 semver 范围（如 `^1.0.0`）
- `lockFileMaintenance`: 禁用 lock file 维护（避免频繁更新 pnpm-lock.yaml）

3. **自定义配置（可选）：**

如果需要修改更新策略，可以编辑 `renovate.json`：

```json
{
  // 更频繁的更新
  "schedule": ["before 9am every weekday"],

  // 分组更新，减少 PR 数量
  "packageRules": [
    {
      "groupName": "devDependencies",
      "matchDepTypes": ["devDependencies"],
      "schedule": ["before 9am on monday"]
    },
    {
      "groupName": "react-ecosystem",
      "matchPackageNames": [
        "react",
        "react-dom",
        "@types/react",
        "@types/react-dom"
      ]
    }
  ],

  // 自动合并 minor 和 patch 更新
  "automerge": true,
  "automergeType": "pr",
  "automergeStrategy": "squash"
}
```

4. **查看更新：**

安装 Renovate 后，它会自动：

- 扫描 `package.json` 中的依赖
- 创建 "Configure Renovate" 的初始 PR
- 合并初始 PR 后，开始创建依赖更新 PR

可以在 [developer.mend.io](https://developer.mend.io/) 查看详细的更新日志和配置。

### Changesets 配置

首次使用前需要初始化 changesets：

```bash
# 初始化 changesets 配置
pnpm changeset init

# 添加第一个 changeset
pnpm changeset
```

添加 `.changeset/config.json` 配置：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

## License

MIT
