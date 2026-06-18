const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db = require("./db"); // 確保你有正確匯出 db 物件

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // 讓前端檔案可直接運作

// 決策樹邏輯：多層判斷，符合題目多層分支的要求
function calculateRisk(sleep, steps, mood) {
    if (sleep < 5.5) {
        return steps < 3500 ? "High" : "Medium";
    } else if (sleep < 7) {
        return "Medium";
    } else {
        return mood > 6 ? "Low" : "Medium";
    }
}

// 初始化資料庫並自動載入測試資料
db.serialize(() => {
    // 建立資料表
    db.run(`CREATE TABLE IF NOT EXISTS health_logs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        log_date DATE NOT NULL,
        sleep_hours REAL NOT NULL,
        steps INTEGER NOT NULL,
        mood_score INTEGER NOT NULL,
        risk_level TEXT
    )`);

    // 若資料庫為空，自動載入 seed.sql
    db.get("SELECT count(*) as count FROM health_logs", (err, row) => {
        if (row && row.count === 0) {
            const seedSql = fs.readFileSync('./seed.sql', 'utf8');
            db.exec(seedSql, (err) => {
                if (err) console.error("Seed failed", err);
                else console.log("Seed data loaded successfully!");
            });
        }
    });
});

// 新增健康日誌 (POST)
app.post("/health-logs", (req, res) => {
    const { log_date, sleep_hours, steps, mood_score } = req.body;
    const risk = calculateRisk(parseFloat(sleep_hours), parseInt(steps), parseInt(mood_score));
    
    const sql = `INSERT INTO health_logs (log_date, sleep_hours, steps, mood_score, risk_level) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [log_date, sleep_hours, steps, mood_score, risk], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "success", risk: risk });
    });
});

// 取得所有紀錄 (GET)
app.get("/health-logs", (req, res) => {
    db.all("SELECT * FROM health_logs ORDER BY log_date DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});