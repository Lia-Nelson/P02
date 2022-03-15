let ctx = slate.getContext("2d");
let TAU = Math.PI * 2;

function drawMusicNote(e) {
  console.log("printing note");
  ctx.beginPath();
  ctx.ellipse(e.offsetX, e.offsetY, 10, 8, - Math.PI / 8, 0, TAU);
  ctx.fill();
  ctx.fillRect(e.offsetX + 8, e.offsetY + 2, 1.5, -50);
}

slate.addEventListener("click", drawMusicNote);
