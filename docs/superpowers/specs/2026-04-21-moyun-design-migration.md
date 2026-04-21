# 墨韻設計移植 — 設計規格

**日期：** 2026-04-21  
**目標：** 將 claude.ai 設計好的墨韻茶冊風格完整移植進現有點餐系統

---

## 變更範圍

### 1. style.css — 完整替換
- 現有：橘色系、圓角 14px、box-shadow、sans-serif
- 目標：墨黑茶冊風、Noto Serif TC + Cormorant Garamond、1px 細線、無陰影、無漸層

### 2. index.html — 結構同步

| 位置 | 現在 | 目標 |
|------|------|------|
| Header 按鈕 | SVG icon-btn × 3 | 方形中文字按鈕「史」「眾」「篩（篮）」|
| Logo 副標 | logo-sub（LINE 名） | 保留，加 `TEA MENU · NO. 04` 副標列 |
| Category nav | 純中文標籤 | 中文 + 英文副標雙層 |
| 成功 Modal | 🎉 emoji icon | 朱印樣式（CSS 已定義） |
| 歷史/團購標題 | 📋👥 emoji | 純中文「歷史訂單」「今日團購」 |
| 底部 Sticky 列 | 無 | 「篩 N杯・合計 NT$XXX → 結帳」固定列 |
| 複製 Modal textarea | border-radius: 8px | 0 radius, var(--rule) border |

### 3. app.js — 邏輯調整

| 函式 | 變更 |
|------|------|
| `createDrinkCard` | 加 `M·NN` 編號（series 序號 + item 序號）、手繪杯 SVG、移除 emoji |
| `buildMenu` | 移除 `emoji_cat`、category-title 加 item count |
| `renderCart` | 移除 `item.emoji`，改用飲品名方塊 |
| `renderGroupOrders` | 移除 `item.emoji` |
| 成功 Modal items | 移除 `item.emoji` |
| 底部 sticky 列 | 新增 `updateStickyBar()` 隨 cart 狀態更新 |

### 4. 杯子插圖
每張飲料卡片用 SVG 手繪風杯子，依 theme 色填色：
- green: `#8a9a6a`、pink: `#b87060`、brown: `#8a5a38`
- gold: `#b08438`、blue: `#4a7080`、teal: `#4a7060`

---

## 不動的部分
- Firebase 設定、LIFF 邏輯
- MENU 資料結構（僅移除 UI 使用的 emoji 欄位顯示）
- 所有互動邏輯（modal open/close、加入購物車、送出等）
