import { copyFile, writeFile } from "node:fs/promises";
import { URL } from "node:url";
await copyFile(
  new URL("../dist/index.html", import.meta.url),
  new URL("../dist/404.html", import.meta.url),
);
await writeFile(new URL("../dist/.nojekyll", import.meta.url), "");
