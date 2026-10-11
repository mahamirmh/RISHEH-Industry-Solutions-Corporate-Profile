import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  messages,
  projects,
  getProject,
  normalizeLanguage,
  sourceUrl,
  repositoryUrl,
} from "../docs/content.js";
const html = await readFile(
  new URL("../docs/index.html", import.meta.url),
  "utf8",
);
test("Both language catalogs cover every visible and accessible translation key", () => {
  assert.deepEqual(
    Object.keys(messages.en).sort(),
    Object.keys(messages.fa).sort(),
  );
  for (const key of [...html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)].map(
    (m) => m[1],
  ))
    for (const lang of ["en", "fa"])
      assert.ok(messages[lang][key], `${lang}: ${key}`);
});
test("Each real project has complete bilingual stories and immutable source provenance", () => {
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map((p) => p.id)).size, 5);
  for (const p of projects) {
    assert.match(p.sourceCommit, /^[a-f0-9]{40}$/);
    assert.match(p.readmeSha, /^[a-f0-9]{40}$/);
    assert.match(repositoryUrl(p), /^https:\/\/github.com\/mahamirmh\//);
    assert.ok(sourceUrl(p).includes(`/blob/${p.sourceCommit}/README.md`));
    for (const lang of ["en", "fa"]) {
      for (const key of [
        "name",
        "headline",
        "description",
        "challenge",
        "direction",
        "question",
        "evidence",
      ])
        assert.ok(p[lang][key]?.trim());
      assert.ok(p[lang].narrative.length >= 2);
      assert.ok(p[lang].scope.length >= 3);
    }
  }
});
test("Unknown query parameters resolve safely to supported defaults", () => {
  assert.equal(getProject("<script>").id, "education");
  assert.equal(normalizeLanguage("fr"), "en");
  assert.equal(normalizeLanguage("fa"), "fa");
});
test("Repository evidence distinguishes reference infrastructure from production", () => {
  assert.match(getProject("ai").en.evidence, /reference\/local/);
  assert.match(getProject("ai").en.evidence, /not a production/);
});
test("Baseline navigation, publication links and project evidence exist without JS", () => {
  assert.match(
    html,
    /href="https:\/\/github.com\/mahamirmh\/RISHEH-Industry-Solutions-Corporate-Profile\/blob\/main\/Risheh_Industry_Profile_EN.pdf"/,
  );
  assert.match(
    html,
    /href="https:\/\/github.com\/mahamirmh\/myschoolplatform"/,
  );
  assert.match(html, /<noscript[\s>]/);
  assert.match(html, /aria-labelledby="dialog-title"/);
});
