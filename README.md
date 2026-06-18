## 智慧健康日誌與風險評估系統

本專案為期末實踐挑戰任務，開發一套個人健康自我管理系統。透過記錄睡眠時數、步數與心情，利用 **決策樹 (Decision Tree)** 演算法進行多層次邏輯判斷，即時評估健康風險等級。

---

### 🚀 系統架構與資料流向

本系統採用前後端分離架構，實現完整的資料 CRUD 流程。

**技術棧：**
* **前端**：HTML5 / Bootstrap / JavaScript
* **後端**：Node.js / Express.js
* **資料庫**：SQLite3
* **部署**：Render 雲端平台

**資料流向 (Data Flow)：**
1. **Frontend**：使用者於表單輸入健康數據。
2. **API**：前端發送 `POST /health-logs` 請求。
3. **Backend**：執行 `calculateRisk()` 決策樹邏輯進行判定。
4. **Database**：資料與風險等級寫入 `health_logs` 表格。
5. **Update**：前端收到回傳後，自動刷新歷史紀錄列表。

---

### 🧠 決策樹模型邏輯
系統遵循「多層分支」設計，而非單一條件規則：
1. **第一層**：判斷 `sleep_hours`。
2. **第二層**：依據睡眠結果，進一步對 `steps` 或 `mood_score` 進行判定。
3. **輸出**：歸類為 `High` (紅)、`Medium` (黃)、`Low` (綠) 三種風險等級。

---

### 🌐 專案連結
* [Live Demo URL](https://health-risk-system1-2.onrender.com/)
* [GitHub Repository](https://github.com/hsyinug/health-risk-system1)
