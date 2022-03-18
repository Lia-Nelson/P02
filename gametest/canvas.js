let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let width = 400;
let height = 70;
let space = 20;
let rows = 2;
let cols = 4;

function drawRow(x, y, colWidth) {
  for (let col = 0; col < cols; col ++) {
    ctx.strokeRect(x + colWidth * col, y, colWidth, height);
  }
}

function drawRows() {
  let colWidth = width / cols;
  let x = (slate.width - width) / 2;
  let fullHeight = height + space;
  let startY = (slate.height + space - rows * fullHeight) / 2;
  for (let row = 0; row < rows; row ++) {
    drawRow(x, startY + fullHeight * row, colWidth);
  }
}
