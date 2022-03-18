let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");

function drawRow(x, y, width, height, cols) {
  let colWidth = width / cols;
  for (let i = 0; i < cols; i ++) {
    ctx.strokeRect(x + colWidth * i, y, colWidth, height);
  }
}

function drawRows(width, height, space, number, cols) {
  let x = (slate.width - width) / 2;
  let fullHeight = height + space;
  let startY = (slate.height + space - number * fullHeight) / 2;
  for (let i = 0; i < number; i ++) {
    drawRow(x, startY + fullHeight * i, width, height, cols);
  }
}
