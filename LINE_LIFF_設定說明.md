# 沐日飲料 × LINE 點餐設定說明

## 整體流程

```
LINE Bot/群組  →  使用者點選選單  →  開啟 LIFF 網頁  →  點餐完成  →  自動傳送訂單到 LINE 對話
```

---

## Step 1：部署網頁（取得公開 HTTPS 網址）

LIFF 必須使用 **HTTPS** 網址，本地端 file:// 無法使用。

**免費部署選項：**

| 服務 | 說明 |
|------|------|
| [GitHub Pages](https://pages.github.com/) | 免費、穩定，適合長期使用 |
| [Netlify](https://netlify.com/) | 拖放資料夾即可部署 |
| [Vercel](https://vercel.com/) | 免費、快速 |

**快速測試（本機）：**
```bash
# 安裝 ngrok 後執行（需先 cd 到 muday-app 資料夾）
npx serve . -p 3000
# 另開終端
ngrok http 3000
```

---

## Step 2：在 LINE Developers 建立 LIFF

1. 前往 https://developers.line.biz/
2. 登入 → 建立 Provider（若無）
3. 建立新 Channel → 選 **LINE Login**
4. 進入 Channel → 點選 **LIFF** 分頁 → **Add**
5. 填寫：
   - LIFF app name：`沐日飲料點餐`
   - Size：**Full**（全螢幕）
   - Endpoint URL：貼上 Step 1 取得的 HTTPS 網址
   - Scope：勾選 `profile`、`chat_message.write`
   - Bot link feature：**On (Aggressive)** 若有 Bot
6. 儲存後取得 **LIFF ID**（格式：`1234567890-AbCdEfGh`）

---

## Step 3：填入 LIFF ID

開啟 `app.js`，將第 5 行改為您的 LIFF ID：

```javascript
// 改這一行
const LIFF_ID = '1234567890-AbCdEfGh';
```

---

## Step 4：設定 LINE Bot 選單（選用）

若您有 LINE Official Account / Bot，可在選單設定：
- 動作類型：**LIFF**
- LIFF URL：`https://liff.line.me/你的LIFF_ID`

使用者點選選單 → 自動開啟點餐頁面。

---

## 使用流程（顧客端）

1. 在 LINE 對話中點選「立即點餐」
2. 網頁自動讀取 LINE 帳號（顯示名稱）
3. 瀏覽菜單 → 選擇飲品 → 客製化 → 加入購物車
4. 確認訂單 → **送出訂單**
5. 系統自動將訂單明細傳送到 LINE 對話
6. 店家即可看到訂單訊息

---

## 訂單格式範例

```
☀️ 沐日飲料 訂單
訂單編號：MD854321
訂購人：王小明
─────────────
🥛 烏龍綠鮮奶茶 × 1  $80
   正常甜 · 少冰
🌿 油切蕎麥茶 × 2  $80
   無糖 · 去冰(小碎冰) · 加料：招牌粉粿
─────────────
合計：$160
```

---

## 注意事項

- `chat_message.write` 權限只在 **LIFF 瀏覽器內** 才能傳送訊息
- 一般瀏覽器開啟時仍可正常點餐，但無法自動傳送 LINE 訊息
- 集點資料儲存在裝置本地（localStorage），換裝置會重置
