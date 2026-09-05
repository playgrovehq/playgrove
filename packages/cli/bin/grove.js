#!/usr/bin/env node

import { readFileSync } from "node:fs";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const help = `PlayGrove CLI ${packageJson.version}

Usage:
  grove --help
  grove --version

PlayGrove is an open-source, AI-native game creation platform and universal asset library.
Project: https://github.com/playgrovehq/playgrove
`;

const args = process.argv.slice(2);

if (args.length === 0 || (args.length === 1 && ["--help", "-h"].includes(args[0]))) {
  process.stdout.write(help);
} else if (args.length === 1 && ["--version", "-v"].includes(args[0])) {
  process.stdout.write(`${packageJson.version}\n`);
} else {
  process.stderr.write(`Unknown argument: ${args.join(" ")}\nRun 'grove --help' for usage.\n`);
  process.exitCode = 2;
}
