# jinghegirl-HTML-ARG

《你以為是你找到的》— 純靜態網頁 ARG,一部關於「不要和網路上認識的陌生人出門」的互動解謎作品。

## 開發狀態

目前已完成:序章 + 第一章(修圖相簿)。其餘章節陸續施工中。

## 線上測試

推送到本分支或 `main` 後,GitHub Actions 會自動部署到 GitHub Pages。
**第一次啟用**需要 repo 管理員手動做一次:Settings → Pages → Source 選擇 **GitHub Actions**。之後每次 push 都會自動重新部署,不需要再手動操作。

部署完成後網址通常是:

```
https://<github-user>.github.io/jinghegirl-HTML-ARG/
```

## 本機開發

純靜態網站,任何簡單的 HTTP server 都能跑,例如:

```
python3 -m http.server 8000
```

再開 `http://localhost:8000/` 即可。**不要用 `file://` 直接開檔案**——`fetch()` 與部分 API 在 `file://` 下無法運作。

## 測試用跳關頁

`/debug/index.html` 不會出現在任何站內連結中,需手動輸入網址。可一鍵標記章節完成、清空進度,方便測試。

## 目錄結構

```
/assets/css/   共用樣式(base、widgets)+ 各站點視覺主題(site-*.css)
/assets/js/    共用邏輯:state.js(localStorage)、notebook.js(筆記本)、hint.js(提示系統)、ambient.js(恐怖層)
/xunren/       協尋站(序章入口、更正表單、進度公告)
/social/       社群平台頁面
/editor/       修圖 App 編輯紀錄(第一章)
/resources/    求助資訊(虛構聲明 + 110/113/iWIN)
/debug/        測試用跳關頁
```

## 內容警語

本作含失蹤、跟蹤等令人不適之情節,為虛構創作,建議 15 歲以上遊玩。詳見 `/resources/help.html`。
