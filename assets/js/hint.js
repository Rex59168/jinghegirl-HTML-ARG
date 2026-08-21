// hint.js — 周妤三段式提示系統。頁面需先設定 window.JH_HINTS = [tier1, tier2, tier3]
const JHHint = (() => {
  let revealed = 0;
  let idleTimer = null;

  function mount() {
    const hints = window.JH_HINTS;
    if (!hints || !hints.length) return;

    const btn = document.createElement("button");
    btn.id = "jh-hint-btn";
    btn.className = "jh-hint-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "問問周妤");
    btn.textContent = "周妤";

    const panel = document.createElement("div");
    panel.className = "jh-hint-panel";
    panel.id = "jh-hint-panel";
    panel.innerHTML = `
      <div class="jh-hint-header">
        <strong>周妤</strong>
        <button type="button" class="jh-hint-close" aria-label="關閉">✕</button>
      </div>
      <div class="jh-hint-msgs" id="jh-hint-msgs"></div>
      <button type="button" class="jh-hint-ask" id="jh-hint-ask">問問她</button>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    const msgs = panel.querySelector("#jh-hint-msgs");
    const askBtn = panel.querySelector("#jh-hint-ask");

    function addMsg(text) {
      const p = document.createElement("p");
      p.className = "jh-hint-msg";
      p.textContent = text;
      msgs.appendChild(p);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function reveal() {
      if (revealed >= hints.length) return;
      addMsg(hints[revealed]);
      revealed++;
      resetIdle();
      if (revealed >= hints.length) {
        askBtn.disabled = true;
        askBtn.textContent = "（沒有更多了）";
      }
    }

    function open() {
      panel.classList.add("open");
      if (revealed === 0) {
        addMsg("……怎麼了?卡住了嗎?");
      }
    }
    function close() {
      panel.classList.remove("open");
    }

    btn.addEventListener("click", open);
    panel.querySelector(".jh-hint-close").addEventListener("click", close);
    askBtn.addEventListener("click", reveal);

    // 卡關 3 分鐘,周妤主動傳第 1 層提示
    function resetIdle() {
      clearTimeout(idleTimer);
      if (revealed > 0) return; // 已經自己問過就不用主動推
      idleTimer = setTimeout(() => {
        if (revealed === 0) {
          open();
          reveal();
          btn.classList.add("jh-hint-nudge");
        }
      }, 180000);
    }

    ["click", "keydown", "touchstart", "scroll"].forEach((ev) =>
      window.addEventListener(ev, resetIdle, { passive: true })
    );
    resetIdle();
  }

  document.addEventListener("DOMContentLoaded", mount);
  return { mount };
})();
