let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let width = 400;
let height = 70;
let space = 20;
let rows = 2;
let cols = 4;

function drawRow(x, y, colWidth) {
  for (let i = 0; i < cols; i ++) {
    ctx.strokeRect(x + colWidth * i, y, colWidth, height);
  }
}

function drawRows() {
  let colWidth = width / cols;
  let x = (slate.width - width) / 2;
  let fullHeight = height + space;
  let startY = (slate.height + space - rows * fullHeight) / 2;
  for (let i = 0; i < rows; i ++) {
    drawRow(x, startY + fullHeight * i, colWidth);
  }
}
