# 智慧健康日誌與風險評估系統 (Health Risk Assessment System)

本系統為期末專案開發之個人健康自我管理工具。透過收集使用者的睡眠時數、步數與心情分數，運用**決策樹 (Decision Tree)** 演算法進行多層次邏輯判斷，即時評估並記錄使用者的健康風險等級。

---

## 🏗️ 系統架構與資料流向

本系統採用前後端分離架構，確保資料處理的邏輯性與維護性。

### 技術棧
* **Frontend**: HTML5, Bootstrap, JavaScript (Fetch API)
* **Backend**: Node.js, Express.js
* **Database**: SQLite3
* **Deployment**: Render (Cloud Platform)

### 資料流向 (Data Flow)
1. **Input**: 使用者透過前端介面輸入健康數據。
2. **Request**: 前端以 `POST /health-logs` 發送 JSON 數據至後端。
3. **Logic**: 後端執行 `calculateRisk()` 進行多層分支判斷。
4. **Storage**: 數據連同判定結果 (`risk_level`) 寫入 SQLite3 資料庫。
5. **Update**: 前端自動取得最新數據並透過顏色徽章渲染列表。

![系統架構圖](https://via.placeholder.com/800x300.png?text=Frontend+->+API+->+Node.js+Decision+Tree+->+SQLite3)

---

## 🧠 決策樹邏輯 (Decision Tree Logic)
系統核心演算法實現了多層次的決策分支，而非單一條件判斷：

* **Layer 1**: 判斷 `sleep_hours`。
* **Layer 2**: 依據睡眠結果，進一步對 `steps` 或 `mood_score` 進行細部判定。
* **Output**: 風險分級系統：
    * `High` (紅): 高風險，需改善生活作息。
    * `Medium` (黃): 注意，建議調整睡眠與活動量。
    * `Low` (綠): 狀態良好。

---

## 📊 專案亮點
* **自動化資料植入**: 系統啟動時自動檢查資料庫狀態，並透過 `seed.sql` 確保決策樹測試案例完整。
* **直觀化呈現**: 歷史紀錄以表格呈現，並透過 Bootstrap Badge 顏色即時標示風險等級。
* **CI/CD 部署**: 透過 GitHub 與 Render 實現雲端持續部署。

---

## 🛠️ 開發除錯紀錄 (AI Collaboration)
本專案在開發過程中，針對雲端環境部署進行了多次關鍵除錯，確保系統在 Linux 環境下穩定運行：
1. **解決 `sqlite3` 跨平台編譯問題**: 鎖定 `sqlite3@5.1.7` 版本以避開 v6 版的編譯限制。
2. **環境部署優化**: 透過「Clear build cache」清除舊有殘留依賴，解決 `MODULE_NOT_FOUND` 錯誤。
3. **AI 協作流程**: 本專案使用 AI 作為協作開發夥伴，詳實紀錄了從需求分析、決策樹演算法設計到雲端部屬的除錯對話歷史。

[[查看完整 AI 開發與除錯紀錄連結](https://gemini.google.com/share/7abb71f3bd2e)] 

---

### 🌐 專案連結
* [Live Demo URL](https://health-risk-system1-2.onrender.com/)
* [GitHub Repository](https://github.com/hsyinug/health-risk-system1)
