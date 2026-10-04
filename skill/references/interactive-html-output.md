# Interactive HTML Output Reference

## Purpose

This reference defines the HTML5 architecture, responsive design system, inline CSS, and vanilla JavaScript for generating the standalone interactive HTML decision report (`product-decision-review.html`).

The goal is to produce a self-contained, visually intuitive, and interactive artifact that product managers, designers, founders, and stakeholders can immediately open in any browser, explore interactively, share, and print to PDF without external dependencies.

---

## Key Design Principles & Studio UI Architecture (Anti-AI-Slop)

To ensure generated HTML decision reviews look like handcrafted, top-tier engineering artifacts (in the refined style of Linear, Stripe, and Vercel) rather than generic, sloppy AI-generated web pages:

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
2. **Interactive Reasoning Chain Inspector**:
   - **Pipeline Track**: 6 interconnected nodes (`Problem → Root Cause → Intervention → Behaviour → Outcome → Impact`) with status pills (`Supported`, `Unknown`, `Assumed`, `Goal`).
   - **Triage Filter Toolbar**: `All Links` vs `Highlight Breaks` chip filters. Clicking `Highlight Breaks` dims verified steps and shines a spotlight on unverified gaps.
   - **Inspector Drawer**: Clicking any node opens a synchronized drawer directly underneath showing:
     - *Stated Claim*
     - *Supporting Evidence & Source*
     - *Inferential Leap / Risk Gap*
     - *Recommended Verification Action*
   - **Downstream Cascade Stress-Tester**: Clicking `⚡ Stress-Test: What If This Breaks?` simulates the failure of that link, triggers a warning cascade through downstream nodes (turning them red/pulsing), and displays a cascade impact alert explaining the domino effect of the assumption failure.
3. **Typography & Hierarchy (One Level Thinner & Tight Tracking)**:
   - Font weight must be **one level thinner** than usual: Bold becomes Semibold (`font-weight: 600`), Semibold becomes Medium (`font-weight: 500`), body is Normal (`400`). This avoids heavy, clumsy, template-like headings.
   - Titles and headings above 20px must use `letter-spacing: -0.025em;` (`tracking-tight`).
   - Clean, modern system font stack (`ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`).
4. **Subtle Contrast & Bespoke Palette (Dark Mode Default)**:
   - Default dark theme: Onyx background (`#08090d`), card background (`#0f121a`), hairline borders (`rgba(255, 255, 255, 0.08)`), and soft off-white text (`#f3f4f6`).
   - Subtle top-edge light reflection on cards (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04)`).
   - Crisp, subtle dividers and outlines. No harsh pure white text or loud multi-color gradients.
5. **Lucide SVG Icons (1.5 Stroke Width Everywhere)**:
   - All inline icons must use crisp vector SVGs with `stroke-width="1.5"` and `stroke-linecap="round"` `stroke-linejoin="round"`.
   - Avoid gradient containers for icons.
   - Brand logo must use letters only with tight tracking (e.g., monospace monogram badge `PTR` with `letter-spacing: -0.05em;`).
6. **Custom Engineered Controls (Zero Default Browser Checkboxes)**:
   - Checkboxes, switches, and toggles must be custom-styled. Validation gates must use custom indicator boxes with animated checkmarks, not raw default browser `<input type="checkbox">` elements.
7. **No Floating Action Clutter**:
   - Avoid a bottom-right floating download button. Keep actions consolidated cleanly in the top navigation toolbar.
8. **100% Self-Contained & Offline-Ready**:
   - Zero external CDN dependencies (no Google Fonts, Bootstrap, React, Tailwind CDN). Works completely offline and in secure air-gapped corporate environments.
9. **Interactive Evidence & Validation Controls**:
   - Filterable evidence matrix (`All`, `Known`, `Believed`, `Assumed`, `Unknown`).
   - Interactive human validation checklist with dynamic progress bar and `localStorage` persistence.
   - Dark / Light mode toggle with system preference auto-detection.
   - 1-click "Copy Summary" to clipboard with toast feedback.
   - Clean `@media print` layout for PDF export.
10. **Machine-Readable Metadata**:
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
      --bg: #08090d;
      --bg-card: #0f121a;
      --bg-card-subtle: #141824;
      --bg-hover: #191f30;
      --border: rgba(255, 255, 255, 0.08);
      --border-focus: rgba(255, 255, 255, 0.18);
      --border-subtle: rgba(255, 255, 255, 0.04);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
      --primary: #3b82f6;
      --primary-glow: rgba(59, 130, 246, 0.18);
      --stage-problem: #38bdf8;
      --stage-problem-bg: rgba(56, 189, 248, 0.1);
      --stage-solution: #a855f7;
      --stage-solution-bg: rgba(168, 85, 247, 0.1);
      --stage-readiness: #f59e0b;
      --stage-readiness-bg: rgba(245, 158, 11, 0.1);
      --stage-rollout: #10b981;
      --stage-rollout-bg: rgba(16, 185, 129, 0.1);
      --status-proceed: #10b981;
      --status-validate: #f59e0b;
      --status-stop: #ef4444;
      --confidence-high: #10b981;
      --confidence-med: #f59e0b;
      --confidence-low: #ef4444;
      --font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    [data-theme="light"] {
      --bg: #f9fafb;
      --bg-card: #ffffff;
      --bg-card-subtle: #f3f4f6;
      --bg-hover: #e5e7eb;
      --border: rgba(0, 0, 0, 0.08);
      --border-focus: rgba(0, 0, 0, 0.18);
      --border-subtle: rgba(0, 0, 0, 0.04);
      --text-main: #111827;
      --text-muted: #4b5563;
      --text-dim: #9ca3af;
      --primary-glow: rgba(59, 130, 246, 0.08);
      --stage-problem-bg: rgba(56, 189, 248, 0.12);
      --stage-solution-bg: rgba(168, 85, 247, 0.12);
      --stage-readiness-bg: rgba(245, 158, 11, 0.12);
      --stage-rollout-bg: rgba(16, 185, 129, 0.12);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font);
      background-color: var(--bg);
      color: var(--text-main);
      line-height: 1.6;
      padding: 1.5rem 1rem 3.5rem 1rem;
      transition: background-color 0.2s ease, color 0.2s ease;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container { max-width: 1320px; margin: 0 auto; }

    /* Top Navigation / Toolbar */
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.75rem;
      padding-bottom: 1.1rem;
      border-bottom: 1px solid var(--border);
    }

    .brand { display: flex; align-items: center; gap: 0.75rem; }
    .brand-monogram {
      width: 32px; height: 32px;
      background: var(--bg-card-subtle);
      border: 1px solid var(--border);
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-weight: 600; font-size: 0.78rem; letter-spacing: -0.05em;
      color: var(--text-main);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    .brand-title { font-size: 0.9375rem; font-weight: 600; letter-spacing: -0.015em; color: var(--text-main); }
    .brand-subtitle { font-size: 0.75rem; color: var(--text-muted); }
    .actions { display: flex; align-items: center; gap: 0.5rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.42rem 0.85rem; font-size: 0.8125rem; font-weight: 500;
      border-radius: 6px; border: 1px solid var(--border);
      background: var(--bg-card); color: var(--text-main); cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .btn:hover { background: var(--bg-hover); border-color: var(--border-focus); }

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
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.04);
    }
    .verdict-card::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #38bdf8, #818cf8, #f59e0b);
    }

    .badge-row { display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; margin-bottom: 1.25rem; }
    .badge {
      display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.65rem;
      border-radius: 9999px; font-size: 0.7rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em;
    }
    .badge-stage { background: var(--stage-problem-bg); color: var(--stage-problem); border: 1px solid rgba(56, 189, 248, 0.25); }

    .verdict-banner {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .verdict-tag { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); }
    .verdict-status { font-size: 1rem; font-weight: 600; color: var(--status-validate); letter-spacing: -0.01em; }

    .decision-title {
      font-size: 1.35rem;
      font-weight: 600;
      line-height: 1.35;
      margin-bottom: 0.85rem;
      letter-spacing: -0.025em; /* tracking-tight */
    }
    .decision-summary { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.55; }

    .meta-list {
      display: flex; flex-direction: column; gap: 0.65rem; padding-top: 1rem; border-top: 1px solid var(--border);
    }
    .meta-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem; }
    .meta-label { color: var(--text-dim); font-weight: 500; }
    .meta-val { font-weight: 500; color: var(--text-main); }

    .alert-card {
      background: rgba(245, 158, 11, 0.06);
      border: 1px solid rgba(245, 158, 11, 0.22);
      border-left: 3px solid var(--status-validate);
      border-radius: 8px;
      padding: 1.15rem;
    }
    .alert-title {
      display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem; font-weight: 600;
      color: var(--status-validate); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.35rem;
    }
    .alert-content { font-size: 0.875rem; color: var(--text-main); line-height: 1.5; }

    /* RIGHT COLUMN: Analytical Body */
    .content-column { display: flex; flex-direction: column; gap: 1.75rem; }

    .section-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
      padding: 1.75rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.04);
    }
    .section-title {
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: -0.015em;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .section-subtitle { font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.2rem; margin-bottom: 1rem; }

    /* CHAIN INSPECTOR STYLES */
    .chain-toolbar {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;
      margin-bottom: 1.25rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--border);
    }
    .chain-toggles { display: flex; gap: 0.4rem; }
    .toggle-chip {
      padding: 0.35rem 0.75rem; font-size: 0.75rem; font-weight: 500; border-radius: 6px;
      border: 1px solid var(--border); background: var(--bg-card-subtle); color: var(--text-muted); cursor: pointer;
      transition: all 0.15s ease;
    }
    .toggle-chip.active { background: var(--text-main); color: var(--bg); border-color: var(--text-main); font-weight: 600; }
    .toggle-chip:hover:not(.active) { background: var(--bg-hover); color: var(--text-main); }

    .chain-health-badge {
      font-size: 0.75rem; font-weight: 500; padding: 0.25rem 0.65rem; border-radius: 9999px;
      background: rgba(245, 158, 11, 0.1); color: var(--confidence-med); border: 1px solid rgba(245, 158, 11, 0.22);
      display: flex; align-items: center; gap: 0.4rem;
    }

    .pipeline-track {
      display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; position: relative; margin-bottom: 1.25rem;
    }
    @media (max-width: 900px) { .pipeline-track { grid-template-columns: 1fr; } }

    .pipeline-node {
      background: var(--bg-card-subtle); border: 1px solid var(--border); border-radius: 8px;
      padding: 0.85rem 0.75rem; cursor: pointer; transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex; flex-direction: column; gap: 0.4rem; position: relative; user-select: none;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }
    .pipeline-node:hover {
      border-color: var(--border-focus); background: var(--bg-hover); transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    .pipeline-node.selected {
      border-color: var(--primary); background: rgba(59, 130, 246, 0.08);
      box-shadow: 0 0 0 1px var(--primary), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    .pipeline-node.selected::after {
      content: ""; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
      border-width: 7px 7px 0; border-style: solid; border-color: var(--primary) transparent transparent;
      display: block; width: 0;
    }
    @media (max-width: 900px) { .pipeline-node.selected::after { display: none; } }

    .pipeline-node.dimmed { opacity: 0.35; filter: grayscale(0.5); }
    .pipeline-node.cascade-broken {
      border-color: #ef4444 !important; background: rgba(239, 68, 68, 0.1) !important;
      animation: pulseRed 1.8s infinite;
    }
    @keyframes pulseRed {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      50% { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0); }
    }

    .node-header { display: flex; justify-content: space-between; align-items: center; }
    .node-num { font-size: 0.68rem; font-weight: 600; color: var(--text-dim); text-transform: uppercase; }
    .node-role { font-size: 0.8125rem; font-weight: 600; color: var(--text-main); }
    .node-state-pill {
      font-size: 0.65rem; font-weight: 500; text-transform: uppercase; padding: 0.12rem 0.4rem; border-radius: 4px;
    }
    .state-supported { background: rgba(16, 185, 129, 0.12); color: #10b981; }
    .state-unknown { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
    .state-assumed { background: rgba(168, 85, 247, 0.12); color: #c084fc; }
    .state-goal { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .state-broken { background: rgba(239, 68, 68, 0.12); color: #ef4444; }

    .inspector-drawer {
      background: var(--bg-card-subtle); border: 1px solid var(--border-focus); border-radius: 10px;
      padding: 1.5rem; margin-top: 0.75rem; position: relative; animation: drawerSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }
    @keyframes drawerSlide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

    .drawer-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;
      padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);
    }
    .drawer-title-group { display: flex; align-items: center; gap: 0.75rem; }
    .drawer-step-num {
      width: 26px; height: 26px; border-radius: 5px; background: var(--primary);
      color: white; font-weight: 600; display: flex; align-items: center; justify-content: center; font-size: 0.8125rem;
    }
    .drawer-title { font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; }

    .drawer-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-bottom: 1.25rem; }
    @media (max-width: 768px) { .drawer-grid { grid-template-columns: 1fr; } }

    .drawer-item {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
      padding: 1rem 1.15rem; display: flex; flex-direction: column; gap: 0.35rem;
    }
    .drawer-item-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
    .drawer-item-text { font-size: 0.875rem; color: var(--text-main); line-height: 1.45; }

    .cascade-alert {
      display: none; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.28);
      border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; animation: fadeIn 0.2s ease;
    }
    .cascade-alert.active { display: block; }
    .cascade-alert-title {
      font-size: 0.8125rem; font-weight: 600; color: #ef4444; text-transform: uppercase;
      letter-spacing: 0.04em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.45rem;
    }
    .cascade-alert-desc { font-size: 0.875rem; color: var(--text-main); line-height: 1.5; }

    .drawer-footer {
      display: flex; justify-content: space-between; align-items: center; padding-top: 1rem;
      border-top: 1px solid var(--border); flex-wrap: wrap; gap: 0.75rem;
    }
    .btn-stress {
      background: rgba(239, 68, 68, 0.08); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.25);
    }
    .btn-stress:hover { background: rgba(239, 68, 68, 0.16); border-color: rgba(239, 68, 68, 0.4); color: #fca5a5; }
    .btn-stress.active { background: #ef4444; color: white; border-color: #ef4444; }

    /* Action Hero */
    .action-hero {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05));
      border: 1px solid rgba(59, 130, 246, 0.22); border-radius: 10px; padding: 1.35rem 1.5rem; margin-bottom: 1.25rem;
    }
    .action-hero-label {
      font-size: 0.7rem; font-weight: 600; color: var(--primary); text-transform: uppercase;
      letter-spacing: 0.06em; margin-bottom: 0.35rem;
    }
    .action-hero-title {
      font-size: 1.125rem; font-weight: 600; margin-bottom: 0.45rem; color: var(--text-main); letter-spacing: -0.015em;
    }
    .action-hero-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; }

    /* Tabs */
    .tab-nav { display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border); margin-bottom: 1.25rem; overflow-x: auto; }
    .tab-btn {
      padding: 0.55rem 0.95rem; background: none; border: none; color: var(--text-muted); font-size: 0.85rem;
      font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s ease; white-space: nowrap;
    }
    .tab-btn:hover { color: var(--text-main); }
    .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); font-weight: 500; }
    .tab-pane { display: none; }
    .tab-pane.active { display: block; animation: fadeIn 0.18s ease-in-out; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }

    /* Custom Checkbox Components */
    .checklist { display: flex; flex-direction: column; gap: 0.65rem; }
    .custom-check-item {
      display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.85rem 1rem;
      background: var(--bg-card-subtle); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;
      transition: all 0.15s ease; user-select: none;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
    }
    .custom-check-item:hover { background: var(--bg-hover); border-color: var(--border-focus); }
    .custom-check-item input[type="checkbox"] {
      position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none;
    }
    .custom-checkbox-box {
      width: 18px; height: 18px; min-width: 18px; margin-top: 2px;
      border-radius: 4px; border: 1px solid var(--border-focus);
      background: rgba(255, 255, 255, 0.03);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .custom-checkbox-box svg {
      width: 11px; height: 11px; stroke: white; opacity: 0;
      transform: scale(0.6); transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .custom-check-item input[type="checkbox"]:checked + .custom-checkbox-box {
      background: var(--primary); border-color: var(--primary);
    }
    .custom-check-item input[type="checkbox"]:checked + .custom-checkbox-box svg {
      opacity: 1; transform: scale(1);
    }
    .custom-check-item input[type="checkbox"]:focus-visible + .custom-checkbox-box {
      box-shadow: 0 0 0 2px var(--primary-glow);
    }
    .check-label { flex: 1; }
    .check-role { font-weight: 500; font-size: 0.875rem; color: var(--text-main); }
    .check-desc { font-size: 0.8rem; color: var(--text-muted); }

    .progress-bar-container { margin-bottom: 1.25rem; }
    .progress-header { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.35rem; }
    .progress-track { height: 5px; background: var(--border); border-radius: 9999px; overflow: hidden; }
    .progress-fill { height: 100%; background: var(--primary); width: 0%; transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

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
        <div class="brand-monogram">PTR</div>
        <div>
          <div class="brand-title">Product Decision Reviewer</div>
          <div class="brand-subtitle">Evidence-aware decision evaluation</div>
        </div>
      </div>
      <div class="actions">
        <button class="btn" onclick="copyExecutiveSummary()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy Summary
        </button>
        <button class="btn" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / PDF
        </button>
        <button class="btn" onclick="toggleTheme()" id="themeBtn" aria-label="Toggle theme">
          <svg id="themeIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>
      </div>
    </header>

    <!-- 2-COLUMN MAIN LAYOUT -->
    <main class="main-layout">

      <!-- LEFT COLUMN: Main Verdict Block & Critical Uncertainty -->
      <aside class="verdict-sidebar">
        <div class="verdict-card">
          <div class="badge-row">
            <span class="badge badge-stage">{{DECISION_STAGE_LABEL}}</span>
            <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: var(--confidence-med); border: 1px solid rgba(245, 158, 11, 0.22);">Conf: {{CONFIDENCE_LEVEL}}</span>
            <span class="badge" style="background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.22);">Risk: {{DECISION_RISK}}</span>
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
          <div class="alert-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Critical Uncertainty
          </div>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>
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
            <div class="cascade-alert-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              Downstream Cascade Failure Detected
            </div>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                <span id="btn-stress-text">Stress-Test: What If This Breaks?</span>
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
              <div style="font-size: 0.8125rem; color: var(--text-muted);" id="d-hint">Click on unverified steps to stress-test.</div>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn" onclick="navigateNode(-1)">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  Previous
                </button>
                <button class="btn" onclick="navigateNode(1)">
                  Next
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
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
              <h4 style="font-size: 0.9375rem; font-weight: 500; margin-bottom: 0.45rem; color: var(--text-main);">Recommendation Rationale</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.55;">{{RATIONALE_SUMMARY}}</p>
            </div>
            <div>
              <h4 style="font-size: 0.9375rem; font-weight: 500; margin-bottom: 0.45rem; color: var(--text-main);">What Could Change This Advice?</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.55;">{{CHANGE_CONDITIONS}}</p>
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

          <!-- Tab: Human Validation (Custom Checkboxes) -->
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
              <!-- Each gate item uses custom styled checkboxes:
              <label class="custom-check-item">
                <input type="checkbox" onchange="updateProgress()" data-gate="pm">
                <span class="custom-checkbox-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <div class="check-label">
                  <div class="check-role">Product Manager</div>
                  <div class="check-desc">Action description...</div>
                </div>
              </label>
              -->
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
      const themeBtn = document.getElementById('themeBtn');
      if (next === 'light') {
        themeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
      } else {
        themeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
      }
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
