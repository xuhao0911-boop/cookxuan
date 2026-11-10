# CookXuan

打开冰箱，就有一餐。

手机应用（PWA），支持 iPhone、Android 添加到桌面，独立窗口打开。

## 安装

打开发布后的 CookXuan 链接。

- iPhone：Safari → 分享 → 添加到主屏幕。
- Android：Chrome → 菜单 → 安装应用 / 添加到主屏幕。

桌面上会出现 CookXuan 图标。首次打开后，应用与完整文字菜谱可离线使用；浏览过的菜品图片会缓存。

## 内容

- 373 道 HowToCook 原方，10 个分类，完整保留食材、用量、步骤与原文。
- 5 道 CookXuan 精选，支持人数换算与新手图解。
- 347 张原图，另有写实菜品与过程图。
- 食材匹配、搜索、收藏、采购、做菜计时与完成记录。

菜谱快照：`308cc8b7dab1da84b20e7fafdf836a715437f582`。

内容来自 [Anduin2017 / HowToCook](https://github.com/Anduin2017/HowToCook)，原项目使用 Unlicense，见 HOWTOCOOK-LICENSE.txt。导入清单见 IMPORT-MANIFEST.json，逐篇校验结果见 CATALOG-VALIDATION.json。仓库中的示例模板未作为菜谱导入。一个原仓库外部图片链接已失效，正文完整保留。

## 本地使用

直接打开 `dist/index.html`。运行本地服务：`npm start`，浏览器访问 `http://127.0.0.1:4183`。应用运行无需安装依赖。

重新导入菜谱需要 Node.js、Git、Sharp：先 `npm install`，再给 `scripts/import-howtocook.mjs` 传入 HowToCook 检出目录；`scripts/download-photos.mjs` 下载原图，再运行导入脚本生成离线库。

`dist/` 是完整可部署应用；`scripts/` 是数据与图片处理脚本。手机安装功能通过 HTTPS 发布地址使用。
