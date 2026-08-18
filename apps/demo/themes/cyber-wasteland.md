---
name: Cyber Wasteland
description: 霓虹賽博廢墟風格 — 黑色終端機畫布、電藍與洋紅訊號、工業框線、故障切片與可讀的技術敘事。
---

# Cyber Wasteland

一座在文明崩解後仍持續供電的技能基地。畫面像深夜監控站與故障終端機的交界：黑色是環境，電藍是主要訊號，洋紅只用於偏移與警示，所有資訊都以可讀性為第一優先。

## Palette

| 角色 | 值 | 使用方式 |
| --- | --- | --- |
| bg | `#070A0F` | 深黑藍畫布 |
| text | `#D7EEF2` | 主要文字與標題 |
| accent | `#00E5FF` | 主要訊號、連線、焦點 |
| magenta | `#FF2D8D` | 故障偏移、次要訊號 |
| toxic | `#B7FF00` | 成功狀態、存活指示 |
| amber | `#FFB000` | 警告、危險區域 |
| danger | `#FF4D6D` | 失效、噪音、阻斷 |
| panel | `#111923` | 終端機與模組面板 |
| panelHi | `#172632` | 主要面板的高亮區 |
| line | `rgba(128, 220, 238, 0.22)` | 工業框線與分隔線 |
| muted | `#72818D` | 次要文字、頁碼、標籤 |

## Typography

- Display font: `"Chakra Petch", "Noto Sans TC", sans-serif` — weight 600–700，用於標題、數字與狀態詞。
- Body font: `"Noto Sans TC", system-ui, sans-serif` — weight 400–500，用於繁體中文敘事。
- Mono font: `"IBM Plex Mono", ui-monospace, Menlo, monospace` — 用於命令、檔案路徑、狀態碼與頁面編號。
- Google Fonts import: `https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;700&display=swap`
- Hero title: 154 px, line-height 0.94, letter-spacing -0.04em。
- Section heading: 76–92 px, line-height 1.02, letter-spacing -0.025em。
- Body: 28–34 px, line-height 1.45。
- Mono label: 16–20 px, letter-spacing 0.12em, uppercase。

## Layout

- 舞台固定為 1920×1080，內容邊界為左右 120–140 px、上下 96–112 px。
- 封面採左右不對稱構圖：左側是主訊息，右側是仍在運轉的終端機或訊號塔。
- 內頁使用單一工業網格；面板以 1 px 框線、4 px 微圓角與內嵌高光呈現，不使用柔和卡片陰影。
- 每頁保留頂部系統列與底部頁碼，讓 deck 像一份可追蹤的監控紀錄。
- 內容密度可高，但單一頁面只承載一個主要命題；長段落拆成終端機行、狀態標籤或模組卡。

## Fixed components

- `SignalHeader`: 左側顯示 `NEO SKILLS / FIELD MANUAL`，右側顯示連線狀態與章節編號。
- `PageFooter`: 使用等寬字體顯示來源路徑、`current / total` 頁碼與細線訊號條。
- `HazardTag`: 低高度的框線標籤，搭配一顆電藍、酸性綠或警示橘狀態燈。
- `TerminalWindow`: 深色面板、檔案標題列、狀態燈與等寬文字；用於指令、流程與驗證結果。
- `ModuleCard`: 具有編號、狀態與短敘事的模組節點；用電藍框線標示主節點，用洋紅做小幅故障偏移。
- `ScanlineField`: 全頁低透明度掃描線、微型網格與偏心光暈，只作為氛圍，不放在文字對比最強的位置。

## Motion

- 進場使用 `translateY` 或 `translateX` 16–24 px 的短距離位移，搭配 650–900 ms 的平滑減速。
- 掃描線以低對比度緩慢移動；狀態燈以 2.4–3.2 秒週期脈衝。
- 故障效果只在標題副本、分隔線或裝飾訊號上使用，不讓正文持續抖動。
- 頁面切換採淡入、水平訊號偏移與輕微模糊解除；不使用快速閃爍或連續色彩爆閃。
- 在 `prefers-reduced-motion: reduce` 下停用循環動畫，只保留靜態框線與內容。

## Voice

- 語氣冷靜、精確、像一份災後操作手冊。
- 標題使用短句與命令式動詞，例如「只在需要時載入」、「能被安裝，也能被驗證」。
- 不使用無關的科幻裝飾詞；每個故障符號都要對應一個資訊層級或狀態。
- 內容可以有末日隱喻，但技術名稱、檔案名稱、命令與數據必須保持原樣。

## Avoid

- 不使用紫色漸層、玻璃擬態、柔軟白色卡片或一般 SaaS 儀表板模板。
- 不讓掃描線、光暈或故障效果降低繁體中文字的對比度。
- 不把所有技能名稱塞進單一清單；使用模組群組與清楚的層級。
