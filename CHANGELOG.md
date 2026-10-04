# Changelog

## v1.1.1

- Studio UI Design Standards (Anti-AI-Slop): Refined typography with 1-level thinner font weights (`font-weight: 600` for titles, `500` for subtitles/badges), `letter-spacing: -0.025em` (`tracking-tight`) on headings.
- Bespoke Onyx Dark Mode: Elevated dark palette (`#08090d`), hairline card borders (`rgba(255,255,255,0.08)`), subtle card highlights, and soft contrast.
- Custom Input Controls: Custom engineered checkboxes with smooth SVG checkmark transitions and `localStorage` persistence (no default browser checkboxes).
- Vector Lucide Icons: Upgraded all icons to 1.5 stroke width inline Lucide SVGs; replaced gradient icon box with a clean monospace monogram badge (`PTR`) with tight tracking.

## v1.1.0
 
- Interactive HTML Decision Report output: generates a self-contained, responsive dashboard (`product-decision-review.html`) instead of static markdown.
- Interactive Reasoning Chain Inspector: dedicated, permanent 6-node pipeline track with step-by-step inspector drawer (Claims, Evidence, Risk Gaps, Verification Actions).
- Downstream Cascade Stress-Tester: interactive simulation demonstrating failure cascades across downstream links if an assumption breaks.
- Desktop 2-column layout: sticky left sidebar with verdict, risk, and critical uncertainty; right column for analytical evaluation.
- Interactive filterable evidence matrix (`Known`, `Believed`, `Assumed`, `Unknown`).
- Interactive human validation & stakeholder review checklist with real-time progress bar.
- Offline-ready design system with dark/light mode toggle, 1-click summary copy, and clean print/PDF stylesheet.
- Added reference template in `skill/references/interactive-html-output.md` and interactive examples in `examples/`.

## v1.0.0

Initial release.

Features:

- Problem validation module
- Solution evaluation module
- Decision readiness module
- Rollout risk module

## Future

- Add product experiment evaluation
- Add decision history tracking
