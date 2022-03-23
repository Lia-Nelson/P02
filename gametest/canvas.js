let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let width = 400;
let height = 70;
let space = 20;
let rows = 2;
let cols = 4;
let sliderHeight = 75;
let noteHeight = 60;
let boxWidth = 1;
let boxColor = "#000000";
let sliderWidth = 2;
let sliderColor = "#00d990";
let totalTime = 5000;

let colWidth = width / cols;
let startX = (slate.width - width) / 2;
let fullHeight = height + space;
let startY = (slate.height + space - rows * fullHeight) / 2;
let ssy = (height - sliderHeight) / 2;

ctx.lineWidth = boxWidth;
ctx.strokeStyle = boxColor;
ctx.fillStyle = sliderColor;

function getxy(ptime, thingWidth, thingHeight) {
  let pos = ptime * rows;
  let rowPos = pos % 1;
  let row = pos - rowPos;
  return {
    x: startX + width * rowPos - thingWidth / 2,
    y: startY + fullHeight * row + (height - thingHeight) / 2
  }
}

function drawRows() {
  for (let row = 0; row < rows; row ++) {
    for (let col = 0; col < cols; col ++) {
      let y = startY + fullHeight * row;
      ctx.strokeRect(startX + colWidth * col, y, colWidth, height);
    }
  }
}

function drawSlider(ptime) {
  let place = getxy(ptime, sliderWidth, sliderHeight);
  ctx.fillRect(place.x, place.y, sliderWidth, sliderHeight);
}

function clear() {
  ctx.clearRect(0, 0, slate.width, slate.height);
}

function draw(time) {
  clear();
  drawRows();
  drawSlider(time / totalTime);
}

let startTime;

function dibujar(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  draw(timestamp - startTime);
  requestID = window.requestAnimationFrame(dibujar);
}
