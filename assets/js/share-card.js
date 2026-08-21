// share-card.js — 終幕分享卡:純前端 canvas 產生,不含任何謎題答案
const JHShareCard = (() => {
  function formatElapsed(ms) {
    const totalSeconds = Math.round(ms / 1000);
    if (totalSeconds < 60) return `${totalSeconds} 秒`;
    const totalMinutes = Math.round(totalSeconds / 60);
    if (totalMinutes < 60) return `${totalMinutes} 分鐘`;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m > 0 ? `${h} 小時 ${m} 分鐘` : `${h} 小時`;
  }

  function draw(canvas, { elapsedMs, nickname, siteHost }) {
    const W = 1080, H = 1350;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#050505");
    grad.addColorStop(1, "#151515");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.textAlign = "center";

    ctx.fillStyle = "#8a8a8a";
    ctx.font = "32px -apple-system, 'PingFang TC', sans-serif";
    ctx.fillText("靖河市協尋案", W / 2, 160);

    ctx.fillStyle = "#555";
    ctx.font = "24px -apple-system, 'PingFang TC', sans-serif";
    ctx.fillText("xun-lin-xi", W / 2, 205);

    // 檔案卡片
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(120, 420, W - 240, 340);

    ctx.fillStyle = "#e8e8e8";
    ctx.font = "bold 56px 'SFMono-Regular', Consolas, monospace";
    ctx.fillText("013.txt", W / 2, 500);

    ctx.fillStyle = "#9fc7ff";
    ctx.font = "30px -apple-system, 'PingFang TC', sans-serif";
    ctx.fillText("我花了", W / 2, 590);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 64px -apple-system, 'PingFang TC', sans-serif";
    ctx.fillText(formatElapsed(elapsedMs), W / 2, 665);

    ctx.fillStyle = "#777";
    ctx.font = "26px -apple-system, 'PingFang TC', sans-serif";
    const nickLine = nickname ? `暱稱:${nickname}` : "";
    if (nickLine) ctx.fillText(nickLine, W / 2, 720);

    ctx.fillStyle = "#666";
    ctx.font = "24px -apple-system, 'PingFang TC', sans-serif";
    wrapText(ctx, "你以為網路上的陌生人不了解你。", W / 2, 850, W - 200, 34);

    ctx.fillStyle = "#444";
    ctx.font = "20px -apple-system, 'PingFang TC', sans-serif";
    ctx.fillText("虛構創作・如遇類似狀況請撥打 110 / 113", W / 2, H - 130);
    if (siteHost) {
      ctx.fillStyle = "#555";
      ctx.font = "22px -apple-system, 'PingFang TC', sans-serif";
      ctx.fillText(siteHost, W / 2, H - 90);
    }
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split("");
    let line = "";
    let lines = [];
    chars.forEach((c) => {
      const test = line + c;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = c;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
  }

  function download(canvas, filename) {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "013.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }, "image/png");
  }

  return { draw, download, formatElapsed };
})();
