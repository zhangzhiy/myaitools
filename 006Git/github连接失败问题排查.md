# Git Pull 连接问题排障总结（macOS）

## 现象

- 在 `~/myproject/myaitools/myaitools` 执行 `git pull` 报错：
  - `Failed to connect to github.com port 443`
  - 后续配置代理后报错：`Failed to connect to 127.0.0.1 port 7890`

## 排查过程

1. 确认是否在 Git 仓库目录：
   - `git rev-parse --is-inside-work-tree`
   - 输出 `true`，说明目录正确。
2. 确认基础网络连通性：
   - `curl -I https://github.com`
   - 失败，说明不是 Git 命令本身问题，而是到 GitHub 的网络链路问题。
3. 查看系统代理配置：
   - `scutil --proxy`
   - 显示系统代理为 `127.0.0.1:7897`（HTTP/HTTPS/SOCKS）。
4. 检查 Git 代理配置并尝试手动设置：
   - 配置为 `127.0.0.1:7890` 后，`git pull` 仍失败。
5. 验证本地代理端口可用性：
   - `lsof -nP -iTCP:7890 -sTCP:LISTEN` 无输出
   - `curl -I -x http://127.0.0.1:7890 https://github.com` 失败
   - 结论：`7890` 无本地服务监听，导致 Git 无法通过该端口代理访问外网。

## 根因

- Git 代理指向了未监听端口（`127.0.0.1:7890`）。
- 本机代理工具的实际可用端口与 Git 配置不一致（或代理程序未运行）。

## 解决方案

- 将 Git 代理改为本机实际可用端口（例如系统显示的 `7897`），或先启动代理工具后再设置端口。
- 推荐检查顺序：
  1. `lsof -nP -iTCP:<端口> -sTCP:LISTEN`
  2. `curl -I -x http://127.0.0.1:<端口> https://github.com`
  3. `git config --global http.proxy  http://127.0.0.1:<端口>`
  4. `git config --global https.proxy http://127.0.0.1:<端口>`
  5. `git pull`

## 常用命令清单

```bash
# 查看 Git 代理
git config --global --get http.proxy
git config --global --get https.proxy

# 设置 Git 代理
git config --global http.proxy  http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897

# 取消 Git 代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 查看系统代理（macOS）
scutil --proxy

# 检查端口监听
lsof -nP -iTCP:7897 -sTCP:LISTEN

# 测试代理可用性
curl -I -x http://127.0.0.1:7897 https://github.com
```

## 备注

- Zero Omega 主要作用于浏览器流量；终端/Git 是否走代理，取决于本机代理程序是否在对应端口监听。
- 只要本地代理端口可用且 Git 指向正确端口，`git pull` 就能恢复。
