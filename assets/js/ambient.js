// ambient.js — 恐怖層 #1:離開分頁 30 秒以上,分頁標題偷偷變成「還在嗎？」
(function () {
  const ORIGINAL_TITLE = document.title;
  let hiddenSince = null;
  let revertTimer = null;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hiddenSince = Date.now();
    } else {
      if (hiddenSince && Date.now() - hiddenSince >= 30000) {
        document.title = "還在嗎?";
        clearTimeout(revertTimer);
        revertTimer = setTimeout(() => {
          document.title = ORIGINAL_TITLE;
        }, 4000);
      }
      hiddenSince = null;
    }
  });

  // 頁面隱藏期間也直接改標題,讓分頁列表本身就顯示異狀
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) return;
    setTimeout(() => {
      if (document.hidden) document.title = "還在嗎?";
    }, 30000);
  });
})();
