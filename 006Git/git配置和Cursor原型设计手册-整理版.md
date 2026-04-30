# Git 配置和 Cursor 原型设计手册

## 1. 文档说明

这份文档根据原始 Word 文档整理而来，原文件路径：

`/Users/zzy/Downloads/git 配置和 cursor 原型设计手册.docx`

内容主要包含两部分：

- Git 安装、配置、拉取项目、分支与远程仓库配置
- Cursor 中用于前端原型设计和 skills 的使用方式

---

## 2. 前置准备

### 2.1 注册 GitLab

- 先注册 GitLab 账号
- 让涛哥把你加入前端项目
- 使用企业邮箱注册

地址：

- [https://git.lizihang.com/](https://git.lizihang.com/)

---

## 3. Git 安装

### 3.1 Windows

1. 打开官网：
   [https://git-scm.com/](https://git-scm.com/)
2. 下载 Windows 版本
3. 一路点击 `Next` 安装，默认即可

### 3.2 Mac

#### 方式 1：推荐

打开终端输入：

```bash
git --version
```

如果系统未安装 Git，通常会自动提示安装。

#### 方式 2：手动安装

```bash
brew install git
```

前提是已经安装 `Homebrew`。

### 3.3 安装成功验证

```bash
git --version
```

看到版本号说明安装成功。

---

## 4. 首次基础配置

这一步通常只需要配置一次。

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

示例：

```bash
git config --global user.email "shenzhuoying@lizihang.com"
git config --global user.name "shenzhuoying"
```

---

## 5. 配置 SSH

建议优先使用 SSH 方式连接 GitLab。

### 5.1 生成 SSH Key

```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

### 5.2 复制公钥

```bash
cat ~/.ssh/id_ed25519.pub
```

### 5.3 添加到 GitLab

路径：

- `Settings`
- `SSH Keys`
- `Add`

### 5.4 测试 SSH 是否生效

```bash
ssh -T git@git.lizihang.com
```

看到 welcome 之类的成功提示，说明配置完成。

---

## 6. 第一次拉取项目

在命令行中切换到你希望放项目的位置。

注意：

- Windows 不建议放在系统默认的杂乱目录中
- 建议先规划好专门的项目目录

常用切换命令：

```bash
cd ..
```

表示返回上一级目录。

```bash
cd AAA
```

表示进入 `AAA` 文件夹。

### 6.1 克隆项目

```bash
git clone git@git.lizihang.com:landz-web/landz-power.git
cd landz-power
```

---

## 7. 配置多个远程仓库

这一部分主要是为了兼顾：

- 原项目仓库拉取代码
- 产品部共享仓库推送 `.cursor` 相关内容

### 7.1 查看当前远程仓库

```bash
git remote -v
```

可能看到类似结果：

```text
origin  https://old.git.com/xxx.git (fetch)
origin  https://old.git.com/xxx.git (push)
```

### 7.2 在 `.cursor` 目录下新增一个远程

进入项目根目录下的 `.cursor` 文件夹：

```bash
cd ./.cursor
```

新增远程仓库：

```bash
git remote add new-origin git@git.lizihang.com:landz-group-pd/landz-power.git
```

说明：

- `.cursor` 目录单独维护
- `.cursor` 的仓库地址改为产品部共享仓库
- 之后需要进入 `.cursor` 目录单独执行更新和推送

### 7.3 验证远程配置

#### 项目根目录中

运行：

```bash
git remote -v
```

可以看到：

```text
origin  https://old.git.com/... (fetch)
origin  https://old.git.com/... (push)
```

#### 项目根目录的 `.cursor` 中

运行：

```bash
git remote -v
```

可以看到：

```text
new-origin  https://git.lizihang.com/... (fetch)
new-origin  https://git.lizihang.com/... (push)
```

### 7.4 让 `origin` 只负责拉取

```bash
git remote set-url --push origin no_push
```

这样配置后：

- `git pull` 仍然可以使用 `origin`
- `git push origin` 会失败
- 这样可以避免误推送到原仓库

### 7.5 推送到新仓库

在 `.cursor` 目录中执行：

```bash
git push new-origin master
```

如果当前分支不是 `master`，就把 `master` 换成对应分支名。

### 7.6 设置默认 push 远程

在 `.cursor` 目录中执行：

```bash
git push -u new-origin master
```

之后就可以直接执行：

```bash
git push
```

默认就会推送到 `new-origin`。

---

## 8. Cursor 中 Git 的使用

### 8.1 安装 Git 插件

原文提到需要在 Cursor 中安装 Git 插件，然后打开刚刚下载的项目。

### 8.2 拉取代码

- 先打开项目
- 在 Cursor 中定位到对应项目目录

### 8.3 创建分支

原文中给出了在 Cursor 中进行分支创建和切换的流程，核心仍然是 Git 命令本身。

---

## 9. 前端项目运行方式

### 9.1 第一次运行

在 Cursor 终端中执行：

```bash
npm install
```

用于安装项目依赖。

### 9.2 启动本地服务

```bash
npm run dev
```

以后每次开机后，如果要再次运行本地项目，也需要重新执行这个命令。

### 9.3 终端位置说明

原文说明：

- 命令行需要在 Cursor 内置终端里执行
- 如果终端没有显示，可以点击右上角对应按钮打开终端面板

---

## 10. 基于 skills 画原型和生成 PRD

### 10.1 首次初始化 skills

```bash
npm install --save-dev @landz/cursor-skills-product
npx product-skills init
```

### 10.2 后续更新 skills

```bash
npx product-skills@latest sync
```

拉取成功后，可以在项目中看到对应的 skills 文件。

原文说明其中有专门用于生成产品原型的 skills。

### 10.3 在 Cursor 对话中使用

原文给出的触发原则：

1. 对话内容里要包含“画原型”或“做原型”这类关键词，便于命中 skills
2. 要明确指定路径
3. 要明确说明需求内容

也就是说，触发这类 skill 时，提示词最好包含：

- 目标：画原型 / 做原型
- 路径：文件要生成到哪里
- 需求：你想要的页面或功能是什么

---

## 11. 更新和发布 skills

### 11.1 skills 的维护方式

原文说明：

- skills 单独在一个分支中维护更新
- 不和做原型的业务分支混在一起
- 后续想修改 skill 内容，也要在 skills 专用分支中完成

### 11.2 修改完成后的发布

发布命令：

```bash
./scripts/sync-skills-to-npm-product.sh && cd cursor-skills-product && npm version patch && npm publish --access=public
```

### 11.3 其他人如何更新

#### 首次使用

```bash
npm install --save-dev @landz/cursor-skills-product
npx product-skills init
```

#### 后续更新

```bash
npx product-skills@latest sync
```

### 11.4 发布后注意事项

发布完成以后，记得提交代码。  
后续产品部基于自己创建的 skills 分支持续维护。

---

## 12. 切换远程分支

### 12.1 先在 GitLab 找到目标分支

步骤：

1. 打开 [https://git.lizihang.com/](https://git.lizihang.com/)
2. 找到 `landz-power` 项目
3. 在仓库的分支列表中找到你的目标分支
4. 复制分支名

### 12.2 在 Cursor 终端里拉取并切换分支

```bash
git switch -c "分支名" --track "new-origin/分支名"
```

原文示例：

```bash
git switch -c "语音录入一期-2026-04-29" --track "origin/master"
```

这里示例本身有点不一致：

- 前面的说明是跟踪 `new-origin/分支名`
- 示例里却写成了 `origin/master`

实际使用时，应根据你的真实远程和真实分支填写。

---

## 13. Git 常用命令行

```bash
# 看状态
git status

# 看当前分支
git branch --show-current

# 拉最新代码
git fetch
git pull

# 新建并切分支
git switch -c 新分支名

# 切到已有分支
git switch 分支名

# 切回上一个分支
git switch -

# 拉远程新分支到本地
git fetch origin
git switch -c 本地分支名 --track origin/远程分支名

# 暂存改动
git stash push -m "说明"

# 恢复改动
git stash pop

# 提交代码
git add .
git commit -m "修改说明"

# 第一次推送新分支
git push -u origin 分支名

# 后续推送
git push
```

---

## 14. 问题清单

### 14.1 原生界面暂时不能通过 Cursor 更改

例如：

- 拨打电话之类的原生能力

这类内容仍然需要通过设计软件处理，而不是完全依赖 Cursor。

### 14.2 拉取项目后页面无数据

原始文档最后提到了这个问题，但没有继续补完整解决方案。  
后续建议单独补一份排查清单，例如：

- 是否执行过 `npm install`
- 是否成功执行 `npm run dev`
- 接口地址是否正确
- 本地环境变量是否完整
- 是否需要登录态或后端联调环境

---

## 15. 建议拆分

这份原始文档实际混合了两类内容，后续建议拆成两篇：

1. `Git 配置与分支操作手册`
2. `Cursor 原型设计与 skills 使用手册`

这样后面维护会更清晰，也更方便团队成员按需查阅。

