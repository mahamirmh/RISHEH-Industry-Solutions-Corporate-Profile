# RISHEH interactive portfolio

The portfolio is a dependency-free static website, not a service requiring a database or API. This branch does not change hosting settings or deploy.

## Existing entry points

- `/docs/index.html` is the main app. Use relative assets; it works under a GitHub Pages repository prefix.
- Root `index.html` forwards to `docs/index.html`, preserving the query and anchor. With JavaScript disabled it provides a visible link. This fixes the root showing a rendered README when Pages serves the repository root.
- If Pages is configured to serve `main /docs`, the main app is already that directory's index. Both layouts are supported.
- Corporate HTML/PDF publications remain byte-for-byte unchanged at repository root. For `/docs`-only Pages hosting, publication URLs must use the GitHub file viewer, since root files are outside that published directory. The app links to the original GitHub publication files for compatibility with either hosting configuration.

## Verify before merge or deployment

Use Node 20.11+ (Node 22 recommended). No package installation is needed.

```bash
npm test
npm run build
python3 -m http.server 4173 --directory dist
```

Open `/docs/index.html`. Verify English and Persian, every industry, the story dialog and keyboard focus, menu at phone widths, publications, reduced motion, and the root redirect. Inspect `design-qa.md` for the current verification status. A build or content test alone does not establish visual QA or production verification.

## Language and project links

`?lang=fa&industry=health#work` opens Persian with Entekhab selected. Supported industries: education, health, operations, ai, career. Unsupported values use safe defaults. Language preference persists when browser storage is available. Copy comes from `content.js`; immutable README sources are linked from each story.

## Hosting

No GitHub Actions workflow is required or added. Existing branch-based Pages can publish the verified code after an intentional merge. Do not change Pages configuration while preview verification is pending.

## Rollback

Revert the redesign commit. No migrations or customer data changes are involved; original publications are untouched. Restore the previous hosting configuration only if it was separately changed.
