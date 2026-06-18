import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier, export_text

# 1. 自動生成 90 筆高品質模擬數據
np.random.seed(42)
data = []
for i in range(90):
    if i < 30: # High Risk
        sleep, steps, mood = np.random.uniform(3, 5.5), np.random.randint(1000, 3500), np.random.randint(1, 4)
        risk = 'High'
    elif i < 60: # Medium Risk
        sleep, steps, mood = np.random.uniform(5.5, 7), np.random.randint(3500, 6000), np.random.randint(4, 7)
        risk = 'Medium'
    else: # Low Risk
        sleep, steps, mood = np.random.uniform(7, 10), np.random.randint(6000, 10000), np.random.randint(7, 11)
        risk = 'Low'
    data.append([sleep, steps, mood, risk])

df = pd.DataFrame(data, columns=['sleep_hours', 'steps', 'mood_score', 'risk_level'])

# 2. 決策樹分析
X = df[['sleep_hours', 'steps', 'mood_score']]
y = df['risk_level']
clf = DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf.fit(X, y)

# 3. 輸出報告內容
print("--- 決策樹模型生成的規則 ---")
print(export_text(clf, feature_names=['sleep_hours', 'steps', 'mood_score']))
print("\n--- 特徵重要性 (資訊增益貢獻) ---")
for f, i in zip(X.columns, clf.feature_importances_):
    print(f"{f}: {i:.4f}")