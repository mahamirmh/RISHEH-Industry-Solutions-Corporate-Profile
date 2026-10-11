# Design QA — Rooted Systems

final result: blocked

## Source visual truth

Selected direction: second displayed image from the 2026-10-11 ideation set, Rooted Systems.
Reference: `/workspace/scratch/11b505af293b/generated_images/exec-70e24114-f327-4cff-ab69-aa114c3c7536.png` (1513 × 1039 source pixels).

The user selected this direction. The generated tablet screenshot and mismatched project paragraph were explicitly identified as invalid and intentionally removed. The implementation uses real documented project narratives; the root motif is an original conceptual brand asset, not a product screenshot.

## Implementation evidence

Implementation: `docs/index.html`; local static production build completes.
Implementation screenshot: unavailable.
Viewport, density and state normalization: not performed because the rendered preview could not be opened in the required cloud browser.
Full-view comparison evidence: unavailable.
Focused region comparison evidence: unavailable.

The supported preview service started, but navigating to `http://terminal.local:4173/` returned `net::ERR_BLOCKED_BY_CLIENT`. One direct-route retry was rejected by the browser security policy. No alternative browser surface, raw browser command, public deployment or policy workaround was attempted.

## Findings

- [P1 / verification blocker] Browser-rendered visual and responsive evidence is missing. Do not declare visual QA passed, production-ready, or merge-ready.
- Static design review only: the source's navy/sage hero, serif editorial display, thin chapter rail and industry structure are represented in code, but rendered fidelity remains unverified.

## Required fidelity surfaces

- Fonts / typography: supplied Ravi Regular and Bold converted losslessly in glyph content to local WOFF containers, CSS weights 400/700. Persian direction and typography are specified. Actual glyph rendering and line breaks require browser verification.
- Spacing / layout: responsive CSS includes 480px, 800px and 1100px breakpoints. Overflow, tap reachability, hero label placement and sticky behavior require real rendering.
- Colors / tokens: navy #081e24, forest #174a3a, brand navy #12304a, paper #f5f3ec and sage #c4d6c4. Contrast and visual balance remain unverified in browser.
- Image quality: the actual generated root illustration was inspected, 1182 × 1330, converted to WebP (55,116 bytes). No fabricated product imagery is used. Crop and layout need browser inspection.
- Copy / content: all five featured project README blobs were verified at pinned commits. English and Persian catalog completeness tests pass. Reference versus production distinction is retained.

## Interaction status

Content/model tests passed; interaction implementation exists but has not been browser-tested. Needs verification: all five industry selections; hero industry jump; query-state persistence; both languages; mobile menu; dialog open, close, Escape, focus containment and focus restoration; publication links; root redirect; reduced-motion; console errors.

## Comparison history

No valid browser comparison took place. Build/content tests are not counted as visual-QA iterations.

## Implementation checklist before readiness

1. Open the built app in an independently available local browser.
2. Check 375, 390, 768, 1024 and 1440 CSS-pixel widths, both languages; include long AI project name.
3. Capture desktop hero and project story plus mobile menu, Persian hero and dialog.
4. Compare the actual desktop view and selected source together after normalizing width; document intentional removal of fake imagery.
5. Fix all P0/P1/P2 issues and repeat capture/comparison.
6. Check console errors, asset loads, keyboard focus, touch targets, no-JavaScript baseline and reduced-motion behavior.
7. Change `final result` to `passed` only after browser evidence supports it, then mark the PR ready.

## Follow-up polish

Cross-browser Safari and Firefox motion/typography checks should accompany preview acceptance. CSS view-timeline motion progressively enhances; the page remains visible without that feature.
