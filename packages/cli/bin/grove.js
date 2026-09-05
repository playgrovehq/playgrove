#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const help = `PlayGrove CLI ${packageJson.version}

Usage:
  grove --help
  grove --version
  grove assets run <graph.json>
  grove assets view <asset.ts> [...]
  grove assets verify <asset.ts> [...]
  grove assets search [query] [--pack pack-id] [--limit 10] [--offset 0] [--catalog path-or-https-url]
                      [--source kenney|quaternius|poly-haven|playgrove] [--type model|texture|hdri]

Installed search reads the public GitHub catalog. In a full checkout it uses local assets.
The run, view and verify commands require the converter/viewer source checkout.

PlayGrove is an open-source, AI-native game creation platform and universal asset library.
Project: https://github.com/playgrovehq/playgrove
`;

const args = process.argv.slice(2);

if (args.length === 0 || (args.length === 1 && ["--help", "-h"].includes(args[0]))) {
  process.stdout.write(help);
} else if (args.length === 1 && ["--version", "-v"].includes(args[0])) {
  process.stdout.write(`${packageJson.version}\n`);
} else if (args[0] === "assets") {
  if (args[1] === "search") {
    const { searchCommand } = await import("../src/search.js");
    process.exitCode = await searchCommand(args.slice(2));
  } else if (args[1] === "view") {
    if (!existsSync(new URL("../../../viewer/view.js",import.meta.url))) {
      process.stderr.write("Asset viewing requires the full PlayGrove viewer checkout. Search works with this installed package.\n");
      process.exitCode=1;
    } else {
      const { viewCommand } = await import("../../../viewer/view.js");
      process.exitCode = await viewCommand(args.slice(2));
    }
  } else {
    if (!existsSync(new URL("../../../converter/cli.js",import.meta.url))) {
      process.stderr.write("Asset conversion requires the full PlayGrove converter checkout. Search works with this installed package.\n");
      process.exitCode=1;
    } else {
      const { assetsCommand } = await import("../../../converter/cli.js");
      process.exitCode = await assetsCommand(args.slice(1));
    }
  }
} else {
  process.stderr.write(`Unknown argument: ${args.join(" ")}\nRun 'grove --help' for usage.\n`);
  process.exitCode = 2;
}
