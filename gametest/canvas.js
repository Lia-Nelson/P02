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

function drawThing(func, ptime, thingWidth, thingHeight) {
  let pos = ptime * rows;
  let rowPos = pos % 1;
  let row = pos - rowPos;
  let x = startX + width * rowPos - thingWidth / 2;
  let y = startY + fullHeight * row + (height - thingHeight) / 2;
  func(x, y, thingWidth, thingHeight);
}

function drawRows() {
  for (let row = 0; row < rows; row ++) {
    for (let col = 0; col < cols; col ++) {
      let y = startY + fullHeight * row;
      ctx.strokeRect(startX + colWidth * col, y, colWidth, height);
    }
  }
}

function sliderHelper(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function drawSlider(ptime) {
  drawThing(sliderHelper, ptime, sliderWidth, sliderHeight);
}

function drawImage(ptime, image) {
  function imageHelper(x, y, w, h) {
    ctx.drawImage(image, x, y, w, h);
  }
  drawThing(imageHelper, ptime, image.width, image.height);
}

function clear() {
  ctx.clearRect(0, 0, slate.width, slate.height);
}

function draw(time) {
  clear();
  drawRows();
  drawImage(0.3, quarterNote);
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
