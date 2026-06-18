async function loadLogs() {
    const res = await fetch('/health-logs');
    const logs = await res.json();
    const tbody = document.getElementById('logTable');
    tbody.innerHTML = logs.map(log => `
        <tr>
            <td>${log.log_date}</td><td>${log.sleep_hours}</td>
            <td>${log.steps}</td><td>${log.mood_score}</td>
            <td><span class="badge ${log.risk_level === 'High' ? 'bg-danger' : log.risk_level === 'Low' ? 'bg-success' : 'bg-warning'}">${log.risk_level}</span></td>
        </tr>
    `).join('');
}

async function submitData() {
    const data = {
        log_date: document.getElementById('date').value,
        sleep_hours: document.getElementById('sleep').value,
        steps: document.getElementById('steps').value,
        mood_score: document.getElementById('mood').value
    };
    await fetch('/health-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    loadLogs(); // 刷新表格
}

loadLogs(); // 初次載入