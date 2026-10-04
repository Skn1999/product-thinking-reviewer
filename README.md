# Product Decision Reviewer

## Overview

A product thinking and decision-support AI skill that helps product teams and solo vibe-coders evaluate product decisions using evidence, constraints, uncertainty, and risk.

## Problem

Product teams often jump from:

Problem identified → Solution built

without sufficiently evaluating:

- whether the problem is real
- whether evidence supports assumptions
- whether the solution is justified
- whether the rollout risk is acceptable

## Capabilities

The skill helps with:

✓ Problem validation
✓ Evidence assessment
✓ Solution evaluation
✓ Decision readiness
✓ Rollout strategy
✓ Interactive HTML Decision Reports (self-contained, offline-ready stakeholder dashboards)

## Output Format

Instead of dense markdown documents, the skill outputs a standalone, self-contained interactive HTML file (`product-decision-review.html`):

- **Desktop 2-Column (Left-Right) Layout**: Left sticky sidebar for the Main Verdict, Risk, Confidence, and Critical Uncertainty; right column for analytical body.
- **Interactive Reasoning Chain Inspector**: Permanently visible (moved out of tabs), mapping the 6-link logic chain (`Problem → Root Cause → Intervention → Behaviour → Outcome → Impact`) with clickable node inspection (Claims, Evidence, Risk Gaps) and interactive downstream failure cascade stress-testing.
- **Filterable Evidence Matrix**: Categorized into *Known*, *Believed*, *Assumed*, and *Unknown*.
- **Interactive Human Validation Gates**: Checkbox review tracker with live progress calculation and `localStorage` persistence for stakeholder alignment.
- **Offline & Export Ready**: Zero CDN dependencies, Dark/Light mode toggle, 1-click summary copy, and clean print/PDF stylesheet.

## Architecture

SKILL.md
↓
Decision routing
↓
Reference modules
↓
Interactive HTML Decision Report (`product-decision-review.html`)

## Limitations

This skill does not:

- conduct research
- perform market analysis
- design interfaces
- replace domain experts

## Installation

```bash
npx product-decision-reviewer
```

## Supported Environments

✓ Claude Code
✓ OpenAI Codex

## Limitations

This skill:
- does not perform market research
- does not design interfaces
- does not replace domain experts
