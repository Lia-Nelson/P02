let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");

function drawRow(x, y, colWidth, height, cols) {
  for (let i = 0; i < cols; i ++) {
    ctx.strokeRect(x + colWidth * i, y, colWidth, height);
  }
}

function drawRows(width, height, space, rows, cols) {
  let colWidth = width / cols;
  let x = (slate.width - width) / 2;
  let fullHeight = height + space;
  let startY = (slate.height + space - rows * fullHeight) / 2;
  for (let i = 0; i < rows; i ++) {
    drawRow(x, startY + fullHeight * i, colWidth, height, cols);
  }
}
