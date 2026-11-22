# tests/qa — 獨立答案正確性審計（QA）

這批腳本用於獨立審計 `content/types-*.js` 的生成器答案是否正確，**只讀內容檔，不修改任何生成器**。
審計報告見 [`docs/QA-GENERATORS.md`](../../docs/QA-GENERATORS.md)。

## 快速使用

**預設**讀 `tests/qa/snapshot/`（第一次稽核的修正前基準）。**跟進稽核**請先設定 `QA_LIVE=1`（Windows PowerShell：`$env:QA_LIVE='1'`），便會改讀工作區最新的 `content/types-*.js`。

```bash
# 0) 選擇資料來源：不設 QA_LIVE 時讀 snapshot/（舊基準）；設 QA_LIVE=1 讀最新 content/
#    Windows PowerShell：$env:QA_LIVE='1'

# 1) 建立／更新基準快照（把 econ-boot、econ-core、types-*、stage-* 複製到 snapshot/）
#    本次審計的基準快照已提交在 tests/qa/snapshot/（修正前）與 tests/qa/snapshot-followup/（修正後），一般不需要重建。

# 2) 跑 49 個題型的獨立重算（輸出 tests/qa/_results-*.json）
node tests/qa/chk-micro.js
node tests/qa/chk-micro2.js
node tests/qa/chk-welfare.js
node tests/qa/chk-macro.js
node tests/qa/chk-intl.js
node tests/qa/chk-applied.js

# 3) 邊界／顯示問題掃描
node tests/qa/edge.js        # 長小數、選項精度、重複選項
node tests/qa/freq.js        # 浮點亂碼出現頻率
node tests/qa/examples.js    # 報告引用的重現樣本
node tests/qa/summary.js     # 逐題型狀態摘要
node tests/qa/followup.js    # P0/P1 修正點逐項驗證（25 項定點回歸 + 語法/單位/CJK 掃描）
node tests/qa/followup-verify.js   # 產出跟進稽核證據（給報告引用）
```

## 檔案

| 檔案 | 用途 |
|---|---|
| `harness.js` | 用 Node `vm` 載入內容（預設 `snapshot/`；`QA_LIVE=1` 時讀 `content/`）；提供 `pairs(type)`（題型 → 技能 × 難度）、`generate`、`typeMap` |
| `runner.js` | 抽樣與比對框架；通用檢查（長小數、缺答案、答案不在選項、中英數字） |
| `chk-*.js` | 六個內容檔對應的獨立重算（49 個題型全覆蓋） |
| `edge.js` / `freq.js` / `lint.js` / `choices.js` | 顯示、頻率、文字、負數選項掃描 |
| `followup.js` / `followup-verify.js` | 修正後跟進稽核（浮點亂碼、單位換算、分類文字、英文文法／CJK、25 項定點回歸） |
| `modes.js` / `scan.js` / `show.js` / `dumpp.js` / `dump.js` / `inspect-long.js` | 人工檢視用樣本輸出 |
| `_results-*.json` / `_summary.json` | 最近一次審計結果（可作為回歸基準；另有 `_baseline-*.json` 為修正前結果） |
| `snapshot/` | 第一次稽核基準（修正前）：`econ-boot.js`、`econ-core.js`、`content/types-*.js`、`content/stage-*.js` |
| `snapshot-followup/` | 跟進稽核基準（修正後） |

## 說明

- 審計以「題型」為單位：**明確指定** `Core.generateProblem(skill, { type, difficultyStep, seed })`，不依賴 `typeIndex`。
- 每個（技能, 難度）組合抽 30 題；對 level 1 分支在 app 內不可達的 5 個應用題型，另以 `EconData.types[t](rng, { level: 1 })` 直接補測。
- `chk-*.js` 的 expected 值全部由 `p.math` 的原始參數獨立重算（解方程、逐級計稅、算面積等），不是複製生成器算式。
