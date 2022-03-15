let ctx = slate.getContext("2d");
let TAU = Math.PI * 2;
let TILT = - Math.PI / 8;

function quarterNote(e) {
  console.log("printing note");
  ctx.beginPath();
  ctx.ellipse(e.offsetX, e.offsetY, 10, 8, TILT, 0, TAU);
  ctx.fill();
  ctx.fillRect(e.offsetX + 8, e.offsetY + 2, 1.5, -50);
}

function halfNote(e) {
  console.log("printing note");
  ctx.beginPath();
  ctx.ellipse(e.offsetX, e.offsetY, 10, 8, TILT, 0, TAU);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillRect(e.offsetX + 8, e.offsetY + 2, 1.5, -50);
}

slate.addEventListener("click", halfNote);
