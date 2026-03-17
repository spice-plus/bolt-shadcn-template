/**
 * クロスプラットフォーム対応の Vite 起動スクリプト。
 *
 * macOS arm64 (Darwin 25+):
 *   ESBUILD_BINARY_PATH を esbuild-wrapper.sh に設定し、patch-fs.cjs を適用して Vite を起動。
 *   (Node.js 25 + macOS Darwin 25 環境での esbuild サービス起動問題の回避)
 *
 * その他の環境 (Linux / Bolt WebContainer など):
 *   Vite を直接起動（ESBUILD_BINARY_PATH 不要）。
 */
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2).join(" ");
const cwd = path.resolve(__dirname);

let cmd;
if (os.platform() === "darwin" && os.arch() === "arm64") {
  const wrapper = path.join(cwd, "esbuild-wrapper.sh");
  const patch = path.join(cwd, "patch-fs.cjs");
  const vite = path.join(cwd, "node_modules/vite/bin/vite.js");
  cmd = `ESBUILD_BINARY_PATH="${wrapper}" node --require "${patch}" "${vite}" ${args}`;
} else {
  const vite = path.join(cwd, "node_modules/.bin/vite");
  cmd = `"${vite}" ${args}`;
}

execSync(cmd, { stdio: "inherit", cwd });
