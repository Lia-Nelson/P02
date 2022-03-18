let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let width = 400;
let height = 70;
let space = 20;
let rows = 2;
let cols = 4;
let sh = 75;

let colWidth = width / cols;
let x = (slate.width - width) / 2;
let fullHeight = height + space;
let startY = (slate.height + space - rows * fullHeight) / 2;
let so = (height - sh) / 2;

function drawRows() {
  for (let row = 0; row < rows; row ++) {
    for (let col = 0; col < cols; col ++) {
      let y = startY + fullHeight * row;
      ctx.strokeRect(x + colWidth * col, y, colWidth, height);
    }
  }
}

function drawSlider(time) {
  let pos = time * rows;
  let rowPos = pos % 1;
  let row = pos - rowPos;
  ctx.strokeRect(x + rowPos * width, startY + fullHeight * row + so, 0, sh);
}
