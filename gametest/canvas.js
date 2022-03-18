let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let width = 400;
let height = 70;
let space = 20;
let rows = 2;
let cols = 4;
let sliderHeight = 75;
let boxWidth = 1;
let boxColor = "#000000";
let sliderWidth = 2;
let sliderColor = "#00d990";

let colWidth = width / cols;
let x = (slate.width - width) / 2;
let fullHeight = height + space;
let startY = (slate.height + space - rows * fullHeight) / 2;
let ssy = startY + (height - sliderHeight) / 2;

ctx.lineWidth = boxWidth;

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
  console.log(x + width * rowPos);
  console.log(ssy + fullHeight * row);
  ctx.fillRect(x + width * rowPos, ssy + fullHeight * row, sliderWidth, sliderHeight);
}
