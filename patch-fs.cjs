/**
 * macOS (Darwin 25+) で Node.js の fs 操作が EPERM になる問題への対処。
 * - renameSync: shell mv にフォールバック
 * - writeFileSync: 一時ファイルに書いてから shell mv でアトミック上書き
 */
const fs = require("fs");
const { execSync } = require("child_process");

// --- renameSync patch ---
const _renameSync = fs.renameSync.bind(fs);
fs.renameSync = function (src, dst) {
  try {
    return _renameSync(src, dst);
  } catch (e) {
    if (e.errno === -1 || e.code === "EPERM") {
      execSync(`/bin/mv -- "${src}" "${dst}"`);
    } else {
      throw e;
    }
  }
};

// --- writeFileSync patch ---
const _writeFileSync = fs.writeFileSync.bind(fs);
fs.writeFileSync = function (filePath, data, options) {
  try {
    return _writeFileSync(filePath, data, options);
  } catch (e) {
    if (e.errno === -1 || e.code === "EPERM") {
      // 新規一時ファイルに書いてから shell mv で上書き
      const tmp = filePath + ".tmp." + process.pid + "." + Date.now();
      _writeFileSync(tmp, data, options);
      execSync(`/bin/mv -- "${tmp}" "${filePath}"`);
    } else {
      throw e;
    }
  }
};
