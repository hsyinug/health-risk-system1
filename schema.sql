CREATE TABLE health_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    log_date DATE NOT NULL,
    sleep_hours REAL NOT NULL,
    steps INTEGER NOT NULL,
    mood_score INTEGER NOT NULL,
    risk_level TEXT
);