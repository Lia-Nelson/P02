let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let boxWidth = 400;
let boxHeight = 70;
let space = 20;
let rows = 2;
let cols = 4;
let sliderHeight = 75;
let boxThick = 1;
let boxColor = "#000000";
let sliderWidth = 2;
let sliderColor = "#00d990";
let totalTime = 5000;

let colWidth = boxWidth / cols;
let startX = (slate.width - boxWidth) / 2;
let fullHeight = boxHeight + space;
let startY = (slate.height + space - rows * fullHeight) / 2;

ctx.lineWidth = boxThick;
ctx.strokeStyle = boxColor;
ctx.fillStyle = sliderColor;

function drawThing(func, ptime, thingWidth, thingHeight) {
  let pos = ptime * rows;
  let rowPos = pos % 1;
  let row = pos - rowPos;
  let x = startX + boxWidth * rowPos - thingWidth / 2;
  let y = startY + fullHeight * row + (boxHeight - thingHeight) / 2;
  func(x, y, thingWidth, thingHeight);
}

function drawRows() {
  for (let row = 0; row < rows; row ++) {
    for (let col = 0; col < cols; col ++) {
      let y = startY + fullHeight * row;
      ctx.strokeRect(startX + colWidth * col, y, colWidth, boxHeight);
    }
  }
}

function sliderHelper(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function drawSlider(ptime) {
  drawThing(sliderHelper, ptime, sliderWidth, sliderHeight);
}

function drawImage(ptime, image, imageHeight) {
  function imageHelper(x, y, w, h) {
    ctx.drawImage(image, x, y, w, h);
  }
  drawThing(imageHelper, ptime, imageHeight * image.width / image.height, imageHeight);
}

function clear() {
  ctx.clearRect(0, 0, slate.width, slate.height);
}

function draw(time) {
  clear();
  drawRows();
  drawImage(0.3, quarterNote, 50);
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
