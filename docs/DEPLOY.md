# RISHEH interactive portfolio — GitHub Pages

Static, build-free, bilingual (EN/FA) editorial portfolio.

## Publish without GitHub Actions

1. Merge PR #1 (README and brand visual redesign), then merge this site PR.
2. In **Settings → Pages → Build and deployment**, select **Deploy from a branch**.
3. Select **main** and **/docs**; save.
4. GitHub Pages will serve `docs/index.html` at the repository Pages address, normally `https://mahamirmh.github.io/RISHEH-Industry-Solutions-Corporate-Profile/`. This URL is **not confirmed live** until Pages settings and publication succeed.

> This path uses GitHub Pages' branch publishing process rather than a custom Actions build. Platform Pages publishing status still depends on GitHub account/repository availability.

## Files

- `index.html` — standalone, responsive HTML/CSS/JS; no external JS/CDN/dependencies.
- `.nojekyll` — instructs Pages not to run Jekyll transformations.

## Ravi typography

The Persian UI contains `@font-face` declarations for `docs/assets/Ravi-Regular.woff2` and `docs/assets/Ravi-Bold.woff2`, with local fallbacks. **Those font files are not present in the public repository.** Publish only properly licensed optimized WOFF2 files when distribution permission is confirmed. The previously generated Persian PDF has its own embedded font and is unchanged. Do not commit private or unlicensed font binaries.

## Verification checklist

- Open the landing page on mobile and desktop.
- Test EN/FA toggle, sector filters, reduced-motion preferences, and PDF/repository links.
- Verify GitHub Pages configuration and HTTPS.
- Review product copy and rights to reference the linked projects.
- Replace abstract product art only with approved, authentic screenshots; current previews are conceptual.

## Notes

- Does not claim every documented repository feature is production verified.
- All interactive features run locally in the browser; no tracking, account, or server is required.
