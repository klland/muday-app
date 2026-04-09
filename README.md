# Muday App 一沐日飲料點餐系統

LINE LIFF 飲料點餐 Web App，整合 Firebase Realtime Database，支援多群組隔離、熱量計算與咖啡因追蹤。

## 功能

- **LINE 整合** — 透過 LIFF 取得使用者身分，直接在 LINE 內開啟使用
- **多群組隔離** — URL 參數 `?group=xxx` 切換不同群組的點餐紀錄
- **完整菜單** — 涵蓋木的各系列飲品，含甜度、冰量選項
- **熱量計算** — 依官方數據計算每杯熱量（精確至 10 大卡）
- **咖啡因標示** — 無/微量/中/高 四級標示
- **Firebase 即時同步** — 多人同時點餐即時更新
- **每日記錄** — 記錄每天的點餐與熱量總計

## 技術

- LINE LIFF SDK
- Firebase Realtime Database
- 原生 HTML / CSS / JavaScript（無框架）
- GitHub Pages 部署

## 使用方式

直接透過 LINE LIFF URL 開啟，或在瀏覽器加上 `?group=<群組名稱>` 參數使用。

## 部署

推送至 `master` branch 後自動透過 GitHub Pages 發布。
