## 智慧健康日誌與風險評估系統  



本系統為個人健康數據管理工具，透過記錄睡眠、步數與心情，利用**決策樹邏輯**進行風險分類，並具備即時資料互動與視覺化顯示功能。

---

### 系統架構流向

本系統採前後端分離架構，確保數據處理與呈現的獨立性：

```text
[前端 UI] --> (POST /health-logs) --> [Node.js 後端]
                                            |
                                   (執行決策樹判斷風險)
                                            |
[資料庫] <--- (儲存資料) <--- [SQLite3] <--- (寫入)
    |
(GET /health-logs)
    |
[前端渲染表格與狀態徽章]
```
### 系統架構圖

![系統架構圖](https://raw.githubusercontent.com/hsyinug/health-risk-system1/refs/heads/main/architecture.jpg)

---

### 技術棧
* **Frontend**: HTML5, Bootstrap, JavaScript (Fetch API)
* **Backend**: Node.js, Express.js
* **Database**: SQLite3
* **Deployment**: Render (Cloud Platform)

### 資料流向 
1. **Input**: 使用者透過前端介面輸入健康數據。
2. **Request**: 前端以 `POST /health-logs` 發送 JSON 數據至後端。
3. **Logic**: 後端執行 `calculateRisk()` 進行多層分支判斷。
4. **Storage**: 數據連同判定結果 (`risk_level`) 寫入 SQLite3 資料庫。
5. **Update**: 前端自動取得最新數據並透過顏色徽章渲染列表。

---

### 決策樹邏輯
系統核心演算法實現了多層次的決策分支，而非單一條件判斷：

* **Layer 1**: 判斷 `sleep_hours`。
* **Layer 2**: 依據睡眠結果，進一步對 `steps` 或 `mood_score` 進行細部判定。
* **Output**: 風險分級系統：
    * `High` (紅): 高風險，需改善生活作息。
    * `Medium` (黃): 注意，建議調整睡眠與活動量。
    * `Low` (綠): 狀態良好。

---

### 專案亮點
* **自動化資料植入**: 系統啟動時自動檢查資料庫狀態，並透過 `seed.sql` 確保決策樹測試案例完整。
* **直觀化呈現**: 歷史紀錄以表格呈現，並透過 Bootstrap Badge 顏色即時標示風險等級。
* **CI/CD 部署**: 透過 GitHub 與 Render 實現雲端持續部署。

---

### 開發除錯紀錄
本專案在開發過程中，針對雲端環境部署進行了多次關鍵除錯，確保系統在 Linux 環境下穩定運行：
1. **解決 `sqlite3` 跨平台編譯問題**: 鎖定 `sqlite3@5.1.7` 版本以避開 v6 版的編譯限制。
2. **環境部署優化**: 透過「Clear build cache」清除舊有殘留依賴，解決 `MODULE_NOT_FOUND` 錯誤。
3. **AI 協作流程**: 本專案使用 AI 作為協作開發夥伴，詳實紀錄了從需求分析、決策樹演算法設計到雲端部屬的除錯對話歷史。

[[Gemini1](https://gemini.google.com/share/7abb71f3bd2e)] 

[[Gemini2](https://gemini.google.com/share/bac0b17c1e3f)] 

[[ChatGPT](https://chatgpt.com/share/6a339c6d-2ac4-83ee-9415-ea5637bccea5)] 

---

### 專案連結
* [Live Demo URL](https://health-risk-system1-2.onrender.com/)
* [GitHub Repository](https://github.com/hsyinug/health-risk-system1)
