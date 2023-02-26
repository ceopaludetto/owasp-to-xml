import fs from "node:fs/promises";
import { resolve } from "node:path";
import { ElementCompact, js2xml } from "xml-js";
import { endOfMonth, format } from "date-fns";

async function createOwaspSuppressions() {
  const reg = /\([^,]*/;
  const content = await fs.readFile(resolve("input.txt"), "utf-8");

  const lines = content.split("\n");

  const xml = {
    _declaration: {
      _attributes: {
        version: "1.0",
        encoding: "UTF-8",
      },
    },
    suppressions: {
      _attributes: {
        xmlns: "https://jeremylong.github.io/DependencyCheck/dependency-suppression.1.3.xsd",
      },
      suppress: [] as ElementCompact[],
    },
  } satisfies ElementCompact;

  for (const line of lines) {
    const res = reg.exec(line);

    const [, cveStr] = line.split(/\)[\s]*\:/);
    const cves = cveStr.split(",").map((item) => item.trim());

    if (!res?.[0]) continue; // ignore the line

    const pkg = res[0].replace("(", "").replace(/\./g, "\\.");

    xml.suppressions.suppress.push({
      _attributes: {
        until: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      },
      packageUrl: {
        _attributes: {
          regex: true,
        },
        _text: ["^", pkg, "$"].join(""),
      },
      cve: cves.map((item) => ({ _text: item })),
    });
  }

  await fs.writeFile(resolve("output.xml"), js2xml(xml, { compact: true, spaces: "\t" }), "utf-8");
}

createOwaspSuppressions().catch(console.error);
