let slate = document.getElementById("slate");
let ctx = slate.getContext("2d");
let boxWidth = 400;
let boxHeight = 70;
let space = 20;
let rows = 2;
let cols = 4;
let sliderPheight = 1.07;
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

function drawRows() {
  for (let row = 0; row < rows; row ++) {
    for (let col = 0; col < cols; col ++) {
      let y = startY + fullHeight * row;
      ctx.strokeRect(startX + colWidth * col, y, colWidth, boxHeight);
    }
  }
}

function clear() {
  ctx.clearRect(0, 0, slate.width, slate.height);
}

function drawThing(func, ptime, width, pheight, whereX, whereY) {
  let height = boxHeight * pheight;
  let pos = ptime * rows;
  let rowPos = pos % 1;
  let row = pos - rowPos;
  let x = startX + boxWidth * rowPos - width * whereX;
  let y = startY + fullHeight * row + (boxHeight - height) / 2 + (whereY - 0.5) * boxHeight;
  func(x, y, width, height);
}

function sliderHelper(x, y, width, height) {
  ctx.fillRect(x, y, width, height);
}

function drawSlider(ptime) {
  ctx.fillStyle = sliderColor;
  drawThing(sliderHelper, ptime, sliderWidth, sliderPheight, 0.5, 0.5);
}

function drawImage(ptime, image, pheight, whereX, whereY) {
  function imageHelper(x, y, width, height) {
    ctx.drawImage(image, x, y, width, height);
  }
  let width = boxHeight * pheight * image.width / image.height;
  drawThing(imageHelper, ptime, width, pheight, whereX, whereY);
}

function dotHelper(x, y, width, height) {
  ctx.beginPath();
  let radius = height / 2;
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();
}

function drawDot(ptime, psize, whereY) {
  drawThing(dotHelper, ptime, boxHeight * psize, psize, 0.5, whereY);
}

function drawNote(ptime, note) {
  if (note.duration == 1) {
    drawImage(ptime, wholeNote, 0.18, 0.5, 0.75);
  }
  else if (note.duration == 1/2) {
    drawImage(ptime, halfNote, 0.7, 0.5, 0.5);
  }
  else if (note.duration == 1/4) {
    drawImage(ptime, quarterNote, 0.7, 0.5, 0.5);
  }
  else if (note.duration == 1/8) {
    drawImage(ptime, eighthNote, 0.7, 0.3, 0.5);
  }
  else if (note.duration == 1/16) {
    drawImage(ptime, sixteenthNote, 0.7, 0.3, 0.5);
  }
}

function draw(time) {
  clear();
  drawRows();
  drawNote(0.3, {duration: 1/4});
  drawNote(0.7, {duration: 1/2});
  drawNote(0.6, {duration: 1/16});
  drawNote(0.4, {duration: 1});
  drawNote(0.45, {duration: 1/8});
  drawDot(0.8, 0.1, 0.75);
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
