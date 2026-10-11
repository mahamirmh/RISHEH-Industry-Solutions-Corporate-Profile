import { mkdir, copyFile, cp, rm, readFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "docs/index.html"), "utf8");
for (const match of html.matchAll(/(?:src|href)="(\.\.?\/[^"#?]+)"/g)) {
  await readFile(resolve(root, "docs", match[1]));
}
await rm(resolve(root, "dist"), { force: true, recursive: true });
await mkdir(resolve(root, "dist"), { recursive: true });
for (const file of [
  "index.html",
  "Risheh_Industry_Profile_EN.pdf",
  "Risheh_Industry_Profile_EN.html",
  "Risheh_Business_Sectors_FA_Ravi.pdf",
  "Risheh_Business_Sectors_FA_Ravi.html",
])
  await copyFile(resolve(root, file), resolve(root, "dist", file));
await cp(resolve(root, "docs"), resolve(root, "dist/docs"), {
  recursive: true,
});
console.log(
  "Static production bundle built; all HTML local dependencies resolved.",
);
