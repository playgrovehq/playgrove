import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/grove.js", import.meta.url));

function run(...args) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });
}

const help = run("--help");
assert.equal(help.status, 0);
assert.match(help.stdout, /^PlayGrove CLI 0\.0\.1/m);
assert.match(help.stdout, /Usage:/);
assert.equal(help.stderr, "");

const version = run("--version");
assert.equal(version.status, 0);
assert.equal(version.stdout, "0.0.1\n");
assert.equal(version.stderr, "");

const unknown = run("make-game");
assert.equal(unknown.status, 2);
assert.equal(unknown.stdout, "");
assert.match(unknown.stderr, /^Unknown argument: make-game/m);

console.log("PASS help, version, and unknown-argument refusal");
