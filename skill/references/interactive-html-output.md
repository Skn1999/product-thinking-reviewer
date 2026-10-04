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
     - **Dedicated Reasoning Chain Inspector**: Permanently visible at the top of the right column (never hidden in tabs). Includes an interactive 6-node pipeline track, vulnerability filter, deep-dive inspector drawer, and a "What If?" cascade stress-test simulator.
     - **Recommended Next Action**: High-priority hero box with concrete action description, rationale, and change triggers.
     - **Deep-Dive Tabs**: Segmented tabs for *Evidence & Assumptions Matrix*, *Stage Deep-Dive* (e.g., Problem vs. Solution check or Solution Comparison table), and *Human Validation Gates* checklist.
2. **Interactive Reasoning Chain Inspector (Selected Pattern)**:
   - **Pipeline Track**: 6 interconnected nodes (`Problem → Root Cause → Intervention → Behaviour → Outcome → Impact`) with status pills (`Supported`, `Unknown`, `Assumed`, `Goal`).
   - **Triage Filter Toolbar**: `All Links` vs `Highlight Breaks` chip filters. Clicking `Highlight Breaks` dims verified steps and shines a spotlight on unverified gaps.
   - **Inspector Drawer**: Clicking any node opens a synchronized drawer directly underneath showing:
     - *Stated Claim*
     - *Supporting Evidence & Source*
     - *Inferential Leap / Risk Gap*
     - *Recommended Verification Action*
   - **Downstream Cascade Stress-Tester**: Clicking `⚡ Stress-Test: What If This Breaks?` simulates the failure of that link, triggers a warning cascade through downstream nodes (turning them red/pulsing), and displays a cascade impact alert explaining the domino effect of the assumption failure.
3. **100% Self-Contained & Offline-Ready**:
   - Zero external CDN dependencies (no Google Fonts, Bootstrap, React, Tailwind CDN). Works completely offline and in secure air-gapped corporate environments.
4. **Interactive Evidence & Validation Controls**:
   - Filterable evidence matrix (`All`, `Known`, `Believed`, `Assumed`, `Unknown`).
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

    .container { max-width: 1320px; margin: 0 auto; }

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

    /* 2-COLUMN DESKTOP LAYOUT */
    .main-layout {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 1040px) {
      .main-layout { grid-template-columns: 1fr; gap: 1.5rem; }
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

    .badge-row { display: flex; flex-wrap: gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
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

    /* CHAIN INSPECTOR STYLES */
    .chain-toolbar {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;
      margin-bottom: 1.25rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--border);
    }
    .chain-toggles { display: flex; gap: 0.4rem; }
    .toggle-chip {
      padding: 0.35rem 0.75rem; font-size: 0.75rem; font-weight: 600; border-radius: 6px;
      border: 1px solid var(--border); background: var(--bg-card-subtle); color: var(--text-muted); cursor: pointer;
      transition: all 0.15s ease;
    }
    .toggle-chip.active { background: var(--primary); color: white; border-color: var(--primary); }

    .pipeline-track {
      display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; position: relative; margin-bottom: 1.25rem;
    }
    @media (max-width: 900px) { .pipeline-track { grid-template-columns: 1fr; } }

    .pipeline-node {
      background: var(--bg-card-subtle); border: 1px solid var(--border); border-radius: 8px;
      padding: 0.85rem 0.75rem; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex; flex-direction: column; gap: 0.4rem; position: relative; user-select: none;
    }
    .pipeline-node:hover { border-color: var(--border-focus); transform: translateY(-2px); }
    .pipeline-node.selected {
      border-color: var(--primary); background: rgba(59, 130, 246, 0.08); box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    }
    .pipeline-node.selected::after {
      content: ""; position: absolute; bottom: -9px; left: 50%; transform: translateX(-50%);
      border-width: 8px 8px 0; border-style: solid; border-color: var(--primary) transparent transparent;
      display: block; width: 0;
    }
    @media (max-width: 900px) { .pipeline-node.selected::after { display: none; } }

    .pipeline-node.dimmed { opacity: 0.35; filter: grayscale(0.5); }
    .pipeline-node.cascade-broken {
      border-color: #ef4444 !important; background: rgba(239, 68, 68, 0.12) !important;
      animation: pulseRed 1.8s infinite;
    }
    @keyframes pulseRed {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
    }

    .node-header { display: flex; justify-content: space-between; align-items: center; }
    .node-num { font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; }
    .node-role { font-size: 0.82rem; font-weight: 700; color: var(--text-main); }
    .node-state-pill {
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase; padding: 0.15rem 0.4rem; border-radius: 4px;
    }
    .state-supported { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .state-unknown { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
    .state-assumed { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .state-goal { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }

    .inspector-drawer {
      background: var(--bg-card-subtle); border: 1px solid var(--border-focus); border-radius: 10px;
      padding: 1.5rem; margin-top: 0.75rem; position: relative; animation: drawerSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes drawerSlide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

    .drawer-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;
      padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);
    }
    .drawer-title-group { display: flex; align-items: center; gap: 0.75rem; }
    .drawer-step-num {
      width: 28px; height: 28px; border-radius: 6px; background: var(--primary);
      color: white; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;
    }
    .drawer-title { font-size: 1.05rem; font-weight: 700; }

    .drawer-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-bottom: 1.25rem; }
    @media (max-width: 768px) { .drawer-grid { grid-template-columns: 1fr; } }

    .drawer-item {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
      padding: 1rem 1.15rem; display: flex; flex-direction: column; gap: 0.35rem;
    }
    .drawer-item-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); }
    .drawer-item-text { font-size: 0.9rem; color: var(--text-main); line-height: 1.45; }

    .cascade-alert {
      display: none; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35);
      border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; animation: fadeIn 0.2s ease;
    }
    .cascade-alert.active { display: block; }
    .cascade-alert-title { font-size: 0.85rem; font-weight: 700; color: #ef4444; text-transform: uppercase; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.45rem; }
    .cascade-alert-desc { font-size: 0.88rem; color: var(--text-main); line-height: 1.5; }

    .drawer-footer {
      display: flex; justify-content: space-between; align-items: center; padding-top: 1rem;
      border-top: 1px solid var(--border); flex-wrap: wrap; gap: 0.75rem;
    }
    .btn-stress { background: rgba(239, 68, 68, 0.12); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.35); }
    .btn-stress:hover { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; }
    .btn-stress.active { background: #ef4444; color: white; }

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

    /* Print Stylesheet */
    @media print {
      body { background: white !important; color: black !important; padding: 0; }
      .toolbar, .tab-nav, .filter-bar, .actions, .toast, .chain-toolbar, .btn-stress { display: none !important; }
      .main-layout { display: block !important; }
      .verdict-sidebar { position: static !important; margin-bottom: 2rem; }
      .tab-pane { display: block !important; margin-bottom: 1.5rem; }
      .verdict-card, .section-card, .alert-card, .action-hero, .inspector-drawer { border: 1px solid #ccc !important; box-shadow: none !important; background: white !important; color: black !important; }
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

      <!-- RIGHT COLUMN: Dedicated Reasoning Chain Inspector & Analytical Deep-Dive -->
      <section class="content-column">
        
        <!-- 1. DEDICATED REASONING CHAIN INSPECTOR (Always Visible) -->
        <div class="section-card">
          <div class="section-header">
            <div>
              <h2 class="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                Decision Reasoning Chain Inspector
              </h2>
              <p class="section-subtitle">Click any node to inspect evidence, assumptions, or stress-test downstream failure cascades</p>
            </div>
          </div>

          <!-- Chain Triage Toolbar -->
          <div class="chain-toolbar">
            <div class="chain-toggles">
              <button class="toggle-chip active" id="chip-all" onclick="setChainFilter('all')">All Links (6)</button>
              <button class="toggle-chip" id="chip-gaps" onclick="setChainFilter('gaps')">⚠️ Highlight Breaks</button>
            </div>
            <div class="chain-health-badge">
              <span>⚠️</span>
              <span>{{CHAIN_INTEGRITY_SUMMARY}}</span>
            </div>
          </div>

          <!-- Pipeline Track -->
          <div class="pipeline-track" id="pipelineTrack">
            {{PIPELINE_NODES_HTML}}
          </div>

          <!-- Dynamic Cascade Alert Banner -->
          <div class="cascade-alert" id="cascadeAlert">
            <div class="cascade-alert-title">Downstream Cascade Failure Detected!</div>
            <div class="cascade-alert-desc" id="cascadeDesc"></div>
          </div>

          <!-- Inspector Drawer -->
          <div class="inspector-drawer" id="inspectorDrawer">
            <div class="drawer-header">
              <div class="drawer-title-group">
                <div class="drawer-step-num" id="d-num">1</div>
                <div>
                  <div class="drawer-title" id="d-title">Node 1: Problem Observation</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);" id="d-subtitle">Status: Supported by Telemetry</div>
                </div>
              </div>
              <button class="btn btn-stress" id="btn-stress-toggle" onclick="toggleStressTest()">
                <span>⚡ Stress-Test: What If This Breaks?</span>
              </button>
            </div>

            <div class="drawer-grid">
              <div class="drawer-item">
                <span class="drawer-item-label">Stated Claim</span>
                <div class="drawer-item-text" id="d-claim">...</div>
              </div>
              <div class="drawer-item">
                <span class="drawer-item-label">Supporting Evidence & Source</span>
                <div class="drawer-item-text" id="d-evidence">...</div>
              </div>
              <div class="drawer-item">
                <span class="drawer-item-label">Inferential Leap / Risk Gap</span>
                <div class="drawer-item-text" id="d-gap">...</div>
              </div>
              <div class="drawer-item">
                <span class="drawer-item-label">Recommended Verification Action</span>
                <div class="drawer-item-text" id="d-action">...</div>
              </div>
            </div>

            <div class="drawer-footer">
              <div style="font-size: 0.82rem; color: var(--text-muted);" id="d-hint">Click on unverified steps to stress-test.</div>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn" onclick="navigateNode(-1)">← Previous</button>
                <button class="btn" onclick="navigateNode(1)">Next →</button>
              </div>
            </div>
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
    // Embedded chain registry populated dynamically by PTR
    const chainData = {{CHAIN_REGISTRY_JSON}};
    let currentNode = 1;
    let isStressTesting = false;

    function inspectNode(num) {
      currentNode = num;
      document.querySelectorAll('.pipeline-node').forEach(n => n.classList.remove('selected'));
      const el = document.getElementById('node-' + num);
      if (el) el.classList.add('selected');

      const data = chainData[num];
      if (!data) return;
      document.getElementById('d-num').textContent = data.num;
      document.getElementById('d-title').textContent = data.title;
      document.getElementById('d-subtitle').textContent = data.subtitle;
      document.getElementById('d-claim').textContent = data.claim;
      document.getElementById('d-evidence').textContent = data.evidence;
      document.getElementById('d-gap').textContent = data.gap;
      document.getElementById('d-action').textContent = data.action;
      document.getElementById('d-hint').textContent = data.hint;

      if (isStressTesting) toggleStressTest();
    }

    function navigateNode(dir) {
      let next = currentNode + dir;
      if (next < 1) next = 6;
      if (next > 6) next = 1;
      inspectNode(next);
    }

    function setChainFilter(type) {
      document.getElementById('chip-all').classList.toggle('active', type === 'all');
      document.getElementById('chip-gaps').classList.toggle('active', type === 'gaps');

      document.querySelectorAll('.pipeline-node').forEach((n, idx) => {
        const stepNum = idx + 1;
        if (type === 'gaps') {
          if (!chainData[stepNum] || !chainData[stepNum].isBroken) {
            n.classList.add('dimmed');
          } else {
            n.classList.remove('dimmed');
          }
        } else {
          n.classList.remove('dimmed');
        }
      });
    }

    function toggleStressTest() {
      isStressTesting = !isStressTesting;
      const btn = document.getElementById('btn-stress-toggle');
      const alertBox = document.getElementById('cascadeAlert');
      const desc = document.getElementById('cascadeDesc');
      const data = chainData[currentNode];

      if (isStressTesting) {
        btn.classList.add('active');
        btn.innerHTML = '<span>⚡ Revert Stress-Test Simulation</span>';
        alertBox.classList.add('active');
        desc.textContent = data.cascadeMessage || "Downstream failure: subsequent assumptions are invalidated.";

        for (let i = currentNode + 1; i <= 6; i++) {
          const el = document.getElementById('node-' + i);
          if (el) el.classList.add('cascade-broken');
        }
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<span>⚡ Stress-Test: What If This Breaks?</span>';
        alertBox.classList.remove('active');

        for (let i = 1; i <= 6; i++) {
          const el = document.getElementById('node-' + i);
          if (el) el.classList.remove('cascade-broken');
        }
      }
    }

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
