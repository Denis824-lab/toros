import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { URL } from "node:url";
import cascadeLayers from "@csstools/postcss-cascade-layers";
import postcss from "postcss";

const dist = new URL("../dist/", import.meta.url);
const index = new URL("index.html", dist);
const html = await readFile(index, "utf8");
const stylesheet = html.match(
  /<link rel="stylesheet"[^>]* href="([^"]*\/assets\/index-[\w-]+\.css)">/,
);
if (!stylesheet) throw new Error("Could not find the main stylesheet");

const [stylesheetTag, stylesheetPath] = stylesheet;
const filename = stylesheetPath.slice(stylesheetPath.lastIndexOf("/") + 1);
const css = await readFile(new URL(`assets/${filename}`, dist), "utf8");

// Convert the complete bundle so the plugin can see both layers and unlayered rules.
const legacy = await postcss([cascadeLayers()]).process(css, { from: undefined });
const hash = createHash("sha256").update(legacy.css).digest("hex").slice(0, 12);
const legacyFilename = `index-legacy-${hash}.css`;
const legacyPath = stylesheetPath.replace(filename, legacyFilename);
await writeFile(new URL(`assets/${legacyFilename}`, dist), legacy.css);

const selectStylesheet = `<script>if (!("CSSLayerBlockRule" in window)) document.currentScript.previousElementSibling.href = ${JSON.stringify(legacyPath)};</script>`;
const page = html.replace(stylesheetTag, `${stylesheetTag}\n  ${selectStylesheet}`);
await Promise.all([
  writeFile(index, page),
  writeFile(new URL("404.html", dist), page),
  writeFile(new URL(".nojekyll", dist), ""),
]);
