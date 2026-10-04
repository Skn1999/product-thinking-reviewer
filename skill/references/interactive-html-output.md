# Interactive HTML Output Reference

## Purpose

This reference defines the HTML5 architecture, responsive design system, inline CSS, and vanilla JavaScript for generating the standalone interactive HTML decision report (`product-decision-review.html`).

The goal is to produce a self-contained, visually intuitive, and interactive artifact that product managers, designers, founders, and stakeholders can immediately open in any browser, explore interactively, share, and print to PDF without external dependencies.

---

## Key Design Principles & Layout Architecture

1. **Desktop Left-Right (2-Column) Layout**:
   - **Left Column (Verdict Sidebar, 380–400px wide, Sticky on Desktop)**:
     - Stage badge, Evidence Confidence badge, and Decision Risk badge.
     - High-visibility **Verdict Banner** (e.g. `VALIDATE FIRST`, `PROCEED`, `NARROW SCOPE`, `STAGE ROLLOUT`, `DEFER / STOP`).
     - Decision Question & Executive Summary.
     - Decision metadata list (Owner, Commitment, Target Audience, Reversibility).
     - **Critical Uncertainty Alert Card** anchored directly under the verdict for immediate visibility.
   - **Right Column (Analytical Body)**:
     - **Dedicated Reasoning Chain**: Always visible (NOT hidden behind tabs) with interconnected node cards and status badges (`Supported`, `Assumed`, `Unknown`, `Contradicted`).
     - **Recommended Next Action**: High-priority hero box with concrete action description, rationale, and change triggers.
     - **Deep-Dive Tabs**: Segmented tabs for *Evidence & Assumptions Matrix*, *Stage Deep-Dive* (e.g., Problem vs. Solution check or Solution Comparison table), and *Human Validation Gates* checklist.
2. **Mobile / Tablet Responsiveness**:
   - Automatically collapses to a clean single column under 980px with natural reading order.
3. **100% Self-Contained**:
   - Zero external CDN dependencies (no Google Fonts, Bootstrap, React, Tailwind CDN). Works completely offline and in secure air-gapped corporate environments.
4. **Interactive Features**:
   - Interactive evidence filtering (`All`, `Known`, `Believed`, `Assumed`, `Unknown`).
   - Interactive human validation checklist with dynamic progress bar and `localStorage` persistence.
   - Dark / Light mode toggle with system preference auto-detection.
   - 1-click "Copy Summary" to clipboard with toast feedback.
   - Clean `@media print` layout for PDF export.
5. **Machine-Readable Metadata**:
   - Embeds `<script type="application/json" id="pdr-data">` for CI/CD or automated tracking tools.

---

## Complete HTML Blueprint

When generating the interactive review, follow this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Decision Review: {{DECISION_TITLE}}</title>
  <style>
    :root {
      --bg: #0f172a;
      --bg-card: #1e293b;
      --bg-card-subtle: #182234;
      --border: #334155;
      --border-focus: #64748b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --primary: #3b82f6;
      --stage-problem: #38bdf8;
      --stage-problem-bg: rgba(56, 189, 248, 0.12);
      --stage-solution: #a855f7;
      --stage-solution-bg: rgba(168, 85, 247, 0.12);
      --stage-readiness: #f59e0b;
      --stage-readiness-bg: rgba(245, 158, 11, 0.12);
      --stage-rollout: #10b981;
      --stage-rollout-bg: rgba(16, 185, 129, 0.12);
      --status-proceed: #10b981;
      --status-validate: #f59e0b;
      --status-stop: #ef4444;
      --confidence-high: #10b981;
      --confidence-med: #f59e0b;
      --confidence-low: #ef4444;
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    [data-theme="light"] {
      --bg: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-subtle: #f1f5f9;
      --border: #e2e8f0;
      --border-focus: #cbd5e1;
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-dim: #94a3b8;
      --stage-problem-bg: rgba(56, 189, 248, 0.15);
      --stage-solution-bg: rgba(168, 85, 247, 0.15);
      --stage-readiness-bg: rgba(245, 158, 11, 0.15);
      --stage-rollout-bg: rgba(16, 185, 129, 0.15);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font);
      background-color: var(--bg);
      color: var(--text-main);
      line-height: 1.6;
      padding: 1.5rem 1rem 3rem 1rem;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .container { max-width: 1280px; margin: 0 auto; }

    /* Top Navigation / Toolbar */
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }

    .brand { display: flex; align-items: center; gap: 0.75rem; }
    .brand-icon {
      width: 32px; height: 32px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; color: white; font-size: 14px;
    }
    .brand-title { font-size: 0.95rem; font-weight: 600; }
    .brand-subtitle { font-size: 0.75rem; color: var(--text-muted); }
    .actions { display: flex; align-items: center; gap: 0.5rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.45rem 0.85rem; font-size: 0.82rem; font-weight: 500;
      border-radius: 6px; border: 1px solid var(--border);
      background: var(--bg-card); color: var(--text-main); cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn:hover { background: var(--bg-card-subtle); border-color: var(--border-focus); }

    /* ==========================================================
       2-COLUMN DESKTOP LAYOUT (Left Verdict, Right Analytical Body)
       ========================================================== */
    .main-layout {
      display: grid;
      grid-template-columns: 390px 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 980px) {
      .main-layout {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    /* LEFT COLUMN: Verdict Sidebar */
    .verdict-sidebar {
      position: sticky;
      top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .verdict-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.75rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.15);
    }
    .verdict-card::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, #38bdf8, #818cf8, #f59e0b);
    }

    .badge-row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
    .badge {
      display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.75rem;
      border-radius: 9999px; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
    }
    .badge-stage { background: var(--stage-problem-bg); color: var(--stage-problem); border: 1px solid var(--border); }

    .verdict-banner {
      background: rgba(245, 158, 11, 0.14);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .verdict-tag { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); }
    .verdict-status { font-size: 1.05rem; font-weight: 700; color: var(--status-validate); }

    .decision-title { font-size: 1.35rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.85rem; letter-spacing: -0.02em; }
    .decision-summary { font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.55; }

    .meta-list {
      display: flex; flex-direction: column; gap: 0.65rem; padding-top: 1rem; border-top: 1px solid var(--border);
    }
    .meta-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; }
    .meta-label { color: var(--text-dim); font-weight: 500; }
    .meta-val { font-weight: 600; color: var(--text-main); }

    /* Alert / Critical Uncertainty (Left Sidebar) */
    .alert-card {
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-left: 4px solid var(--status-validate);
      border-radius: 8px;
      padding: 1.2rem;
    }
    .alert-title { display: flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; font-weight: 700; color: var(--status-validate); text-transform: uppercase; margin-bottom: 0.35rem; }
    .alert-content { font-size: 0.88rem; color: var(--text-main); line-height: 1.5; }

    /* RIGHT COLUMN: Analytical Body */
    .content-column { display: flex; flex-direction: column; gap: 1.75rem; }

    .section-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
      padding: 1.75rem; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.1);
    }
    .section-title { font-size: 1.15rem; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 0.5rem; }
    .section-subtitle { font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem; margin-bottom: 1rem; }

    /* DEDICATED REASONING CHAIN FLOW */
    .chain-container { display: flex; flex-direction: column; gap: 0.65rem; margin-top: 0.5rem; }
    .chain-step {
      display: grid; grid-template-columns: 130px 1fr 140px; align-items: center; gap: 1rem;
      padding: 0.85rem 1.15rem; background: var(--bg-card-subtle); border: 1px solid var(--border); border-radius: 8px;
      transition: all 0.15s ease;
    }
    .chain-step:hover { border-color: var(--border-focus); transform: translateX(2px); }
    .step-role { font-size: 0.75rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; }
    .step-desc { font-size: 0.9rem; color: var(--text-main); font-weight: 500; }
    .step-status {
      font-size: 0.72rem; font-weight: 600; padding: 0.25rem 0.65rem; border-radius: 9999px; text-align: center; text-transform: uppercase;
    }
    .status-supported { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
    .status-unknown { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
    .status-assumed { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
    .status-goal { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }

    /* Action Hero */
    .action-hero {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.08));
      border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 10px; padding: 1.35rem 1.5rem; margin-bottom: 1.25rem;
    }
    .action-hero-label { font-size: 0.72rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; }
    .action-hero-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.45rem; color: var(--text-main); }
    .action-hero-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

    /* Tabs */
    .tab-nav { display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border); margin-bottom: 1.25rem; overflow-x: auto; }
    .tab-btn {
      padding: 0.55rem 0.95rem; background: none; border: none; color: var(--text-muted); font-size: 0.88rem;
      font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s ease; white-space: nowrap;
    }
    .tab-btn:hover { color: var(--text-main); }
    .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); font-weight: 600; }
    .tab-pane { display: none; }
    .tab-pane.active { display: block; animation: fadeIn 0.2s ease-in-out; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }

    /* Evidence Filters */
    .filter-bar { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
    .filter-pill {
      padding: 0.3rem 0.7rem; font-size: 0.75rem; font-weight: 500; border-radius: 9999px;
      border: 1px solid var(--border); background: var(--bg-card-subtle); color: var(--text-muted); cursor: pointer;
    }
    .filter-pill.active { background: var(--primary); color: white; border-color: var(--primary); }
    .evidence-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .evidence-item {
      padding: 0.9rem 1.15rem; background: var(--bg-card-subtle); border: 1px solid var(--border);
      border-radius: 8px; display: flex; flex-direction: column; gap: 0.35rem;
    }
    .evidence-top { display: flex; justify-content: space-between; align-items: center; }
    .evidence-type-tag { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; padding: 0.15rem 0.45rem; border-radius: 4px; }
    .tag-known { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .tag-believed { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .tag-assumed { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .tag-unknown { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }

    /* Checklist */
    .checklist { display: flex; flex-direction: column; gap: 0.65rem; }
    .check-item {
      display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.85rem 1rem;
      background: var(--bg-card-subtle); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;
    }
    .check-item input[type="checkbox"] { margin-top: 0.25rem; width: 17px; height: 17px; accent-color: var(--primary); }
    .check-label { flex: 1; }
    .check-role { font-weight: 600; font-size: 0.88rem; color: var(--text-main); }
    .check-desc { font-size: 0.8rem; color: var(--text-muted); }

    .progress-bar-container { margin-bottom: 1.25rem; }
    .progress-header { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.35rem; }
    .progress-track { height: 6px; background: var(--border); border-radius: 9999px; overflow: hidden; }
    .progress-fill { height: 100%; background: var(--primary); width: 0%; transition: width 0.3s ease; }

    /* Toast */
    .toast {
      position: fixed; bottom: 2rem; right: 2rem; background: #1e293b; color: #f8fafc;
      border: 1px solid #475569; padding: 0.75rem 1.25rem; border-radius: 8px; font-size: 0.85rem;
      opacity: 0; transform: translateY(10px); transition: all 0.2s ease; pointer-events: none; z-index: 100;
    }
    .toast.show { opacity: 1; transform: translateY(0); }

    /* Print Stylesheet */
    @media print {
      body { background: white !important; color: black !important; padding: 0; }
      .toolbar, .tab-nav, .filter-bar, .actions, .toast { display: none !important; }
      .main-layout { display: block !important; }
      .verdict-sidebar { position: static !important; margin-bottom: 2rem; }
      .tab-pane { display: block !important; margin-bottom: 1.5rem; }
      .verdict-card, .section-card, .alert-card, .action-hero { border: 1px solid #ccc !important; box-shadow: none !important; background: white !important; color: black !important; }
    }
  </style>
</head>
<body data-theme="dark">
  <div class="container">
    <header class="toolbar">
      <div class="brand">
        <div class="brand-icon">PTR</div>
        <div>
          <div class="brand-title">Product Decision Reviewer</div>
          <div class="brand-subtitle">Evidence-aware decision evaluation</div>
        </div>
      </div>
      <div class="actions">
        <button class="btn" onclick="copyExecutiveSummary()">Copy Summary</button>
        <button class="btn" onclick="window.print()">Print / PDF</button>
        <button class="btn" onclick="toggleTheme()"><span id="themeIcon">☀️</span></button>
      </div>
    </header>

    <!-- 2-COLUMN MAIN LAYOUT -->
    <main class="main-layout">

      <!-- LEFT COLUMN: Main Verdict Block & Critical Uncertainty -->
      <aside class="verdict-sidebar">
        <div class="verdict-card">
          <div class="badge-row">
            <span class="badge badge-stage">{{DECISION_STAGE_LABEL}}</span>
            <span class="badge" style="background: rgba(245, 158, 11, 0.12); color: var(--confidence-med);">Conf: {{CONFIDENCE_LEVEL}}</span>
            <span class="badge" style="background: rgba(239, 68, 68, 0.12); color: #ef4444;">Risk: {{DECISION_RISK}}</span>
          </div>

          <div class="verdict-banner">
            <span class="verdict-tag">Verdict</span>
            <span class="verdict-status">{{RECOMMENDATION_LABEL}}</span>
          </div>

          <h1 class="decision-title">{{DECISION_QUESTION}}</h1>
          <p class="decision-summary">{{DECISION_SUMMARY}}</p>

          <div class="meta-list">
            <div class="meta-item">
              <span class="meta-label">Decision Owner</span>
              <span class="meta-val">{{DECISION_OWNER}}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Proposed Commitment</span>
              <span class="meta-val">{{COMMITMENT}}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Target Audience</span>
              <span class="meta-val">{{TARGET_AUDIENCE}}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Reversibility</span>
              <span class="meta-val">{{REVERSIBILITY}}</span>
            </div>
          </div>
        </div>

        <div class="alert-card">
          <div class="alert-title">Critical Uncertainty</div>
          <div class="alert-content"><strong>{{CRITICAL_UNCERTAINTY_TITLE}}</strong>: {{CRITICAL_UNCERTAINTY_EXPLANATION}}</div>
        </div>
      </aside>

      <!-- RIGHT COLUMN: Dedicated Reasoning Chain & Analytical Deep-Dive -->
      <section class="content-column">
        
        <!-- 1. DEDICATED REASONING CHAIN (Prominent, Always Visible) -->
        <div class="section-card">
          <h2 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            Decision Reasoning Chain
          </h2>
          <p class="section-subtitle">Evaluating the 6-link logic chain from problem observation to long-term impact</p>

          <div class="chain-container">
            {{REASONING_CHAIN_NODES}}
          </div>
        </div>

        <!-- 2. RECOMMENDED NEXT ACTION & RATIONALE -->
        <div class="section-card">
          <div class="action-hero">
            <div class="action-hero-label">Recommended Next Action</div>
            <h3 class="action-hero-title">{{NEXT_ACTION_TITLE}}</h3>
            <p class="action-hero-desc">{{NEXT_ACTION_DESCRIPTION}}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem;">Recommendation Rationale</h4>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.55;">{{RATIONALE_SUMMARY}}</p>
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem;">What Could Change This Advice?</h4>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.55;">{{CHANGE_CONDITIONS}}</p>
            </div>
          </div>
        </div>

        <!-- 3. DEEP-DIVE TABS (Evidence Matrix, Stage Deep-Dive, Human Validation) -->
        <div class="section-card">
          <nav class="tab-nav">
            <button class="tab-btn active" onclick="switchTab(event, 'tab-evidence')">Evidence Map</button>
            <button class="tab-btn" onclick="switchTab(event, 'tab-deepdive')">Stage Deep-Dive</button>
            <button class="tab-btn" onclick="switchTab(event, 'tab-validation')">Human Validation</button>
          </nav>

          <!-- Tab: Evidence Matrix -->
          <div id="tab-evidence" class="tab-pane active">
            <div class="filter-bar">
              <button class="filter-pill active" onclick="filterEvidence('all')">All</button>
              <button class="filter-pill" onclick="filterEvidence('known')">Known</button>
              <button class="filter-pill" onclick="filterEvidence('believed')">Believed</button>
              <button class="filter-pill" onclick="filterEvidence('assumed')">Assumed</button>
              <button class="filter-pill" onclick="filterEvidence('unknown')">Unknown</button>
            </div>
            <div class="evidence-list" id="evidenceContainer">
              {{EVIDENCE_ITEMS}}
            </div>
          </div>

          <!-- Tab: Stage Deep-Dive -->
          <div id="tab-deepdive" class="tab-pane">
            {{STAGE_SPECIFIC_CONTENT}}
          </div>

          <!-- Tab: Human Validation -->
          <div id="tab-validation" class="tab-pane">
            <div class="progress-bar-container">
              <div class="progress-header">
                <span>Review Gates Progress</span>
                <span id="progressText">0 of {{TOTAL_GATES}} Completed</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" id="progressFill"></div>
              </div>
            </div>
            <div class="checklist">
              {{VALIDATION_CHECKLIST_ITEMS}}
            </div>
          </div>
        </div>

      </section>
    </main>
  </div>

  <div id="toast" class="toast">Executive summary copied to clipboard!</div>

  <script type="application/json" id="pdr-data">
  {{JSON_PAYLOAD}}
  </script>

  <script>
    function switchTab(evt, tabId) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      evt.currentTarget.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }

    function filterEvidence(category) {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      event.currentTarget.classList.add('active');
      const items = document.querySelectorAll('.evidence-item');
      items.forEach(item => {
        item.style.display = (category === 'all' || item.dataset.category === category) ? 'flex' : 'none';
      });
    }

    function updateProgress() {
      const total = document.querySelectorAll('.check-item input[type="checkbox"]').length;
      const checked = document.querySelectorAll('.check-item input[type="checkbox"]:checked').length;
      const pct = Math.round((checked / total) * 100);
      document.getElementById('progressFill').style.width = pct + '%';
      document.getElementById('progressText').textContent = `${checked} of ${total} Completed (${pct}%)`;
      const state = {};
      document.querySelectorAll('.check-item input[type="checkbox"]').forEach((cb, idx) => { state[idx] = cb.checked; });
      localStorage.setItem('pdr_validation_' + location.pathname, JSON.stringify(state));
    }

    window.addEventListener('DOMContentLoaded', () => {
      const saved = localStorage.getItem('pdr_validation_' + location.pathname);
      if (saved) {
        try {
          const state = JSON.parse(saved);
          document.querySelectorAll('.check-item input[type="checkbox"]').forEach((cb, idx) => {
            if (state[idx]) cb.checked = true;
          });
          updateProgress();
        } catch (e) {}
      }
    });

    function toggleTheme() {
      const body = document.body;
      const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      document.getElementById('themeIcon').textContent = next === 'dark' ? '☀️' : '🌙';
    }

    function copyExecutiveSummary() {
      const el = document.getElementById('pdr-data');
      if (el) {
        try {
          const data = JSON.parse(el.textContent);
          const text = `${data.decisionTitle || 'Decision Review'}\nStage: ${data.decisionStage}\nVerdict: ${data.recommendation}\nConfidence: ${data.confidence}\nCritical Uncertainty: ${data.criticalUncertainty}\nNext Action: ${data.nextAction}`;
          navigator.clipboard.writeText(text).then(() => showToast('Summary copied!'));
          return;
        } catch (e) {}
      }
      showToast('Copied!');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  </script>
</body>
</html>
```
