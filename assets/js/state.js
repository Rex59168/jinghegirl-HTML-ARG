// state.js — localStorage 存取層,key 前綴 jh_
const JH = (() => {
  const PREFIX = "jh_";

  function get(key, fallback = null) {
    try {
      const v = localStorage.getItem(PREFIX + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* localStorage 不可用時靜默失敗,不影響劇情閱讀 */
    }
  }

  function has(key) {
    return localStorage.getItem(PREFIX + key) !== null;
  }

  async function sha256(text) {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(text)
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // 標準化輸入：去除頭尾空白、統一全形冒號/井號
  function normalize(text) {
    return String(text || "")
      .trim()
      .replace(/[：]/g, ":")
      .replace(/[＃]/g, "#");
  }

  async function checkAnswer(text, expectedHash) {
    const hash = await sha256(normalize(text));
    return hash === expectedHash;
  }

  return { get, set, has, sha256, normalize, checkAnswer, PREFIX };
})();
