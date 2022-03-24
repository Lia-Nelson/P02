let slate = document.getElementById("screen");
let bpm = parseInt(document.getElementById("bpm").innerHTML);
let beatNote = parseInt(document.getElementById("beatNote").innerHTML);
let notes = JSON.parse(document.getElementById("notes").innerHTML);
let notas = notes.map(note => Object.assign({}, note));
let scoreElement = document.getElementById("score");
let ctx = slate.getContext("2d");
let boxWidth = 800;
let boxHeight = 50;
let space = 20;
let rows = 2;
let cols = 4;
let sliderPheight = 1.07;
let boxThick = 1;
let boxColor = "#000000";
let sliderWidth = 2;
let sliderColor = "#00d990";
let totalTime = 20000;

let colWidth = boxWidth / cols;
let startX = (slate.width - boxWidth) / 2;
let fullHeight = boxHeight + space;
let startY = (slate.height + space - rows * fullHeight) / 2;
let measureLength = bpm / beatNote;
let totalPlace = rows * cols * measureLength;

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
  if (currentNota.note) {
    ctx.fillStyle = "#00ff00";
  }
  else {
    ctx.fillStyle = "#808080";
  }
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

function drawDot(ptime, psize, whereX, whereY) {
  drawThing(dotHelper, ptime, boxHeight * psize, psize, whereX, whereY);
}

function drawNote(ptime, note) {
  if (note.duration == 1 || note.duration == 3/2) {
    if (note.note) {
      drawImage(ptime, wholeNote, 0.18, 0, 0.75);
    }
    else {
      drawImage(ptime, wholeRest, 1.2, 0, 0.9);
    }
  }
  else if (note.duration == 1/2 || note.duration == 3/4) {
    if (note.note) {
      drawImage(ptime, halfNote, 0.7, 0, 0.5);
    }
    else {
      drawImage(ptime, halfRest, 1.2, 0, 0.9);
    }
  }
  else if (note.duration == 1/4 || note.duration == 3/8) {
    if (note.note) {
      drawImage(ptime, quarterNote, 0.7, 0, 0.5);
    }
    else {
      drawImage(ptime, quarterRest, 0.7, 0, 0.6);
    }
  }
  else if (note.duration == 1/8 || note.duration == 3/16) {
    if (note.note) {
      drawImage(ptime, eighthNote, 0.7, 0, 0.5);
    }
    else {
      drawImage(ptime, eighthRest, 0.45, 0, 0.6);
    }
  }
  else if (note.duration == 1/16) {
    if (note.note) {
      drawImage(ptime, sixteenthNote, 0.7, 0, 0.5);
    }
    else {
      drawImage(ptime, sixteenthRest, 0.45, 0, 0.6);
    }
  }
  if (note.duration == 3/2 || note.duration == 3/4 || note.duration == 3/8 || note.duration == 3/16) {
    drawDot(ptime, 0.1, -3.5, 0.75);
  }
}

function drawNotes() {
  let place = 0;
  for (let note of notes) {
    drawNote(place / totalPlace, note);
    place += note.duration;
  }
}

function getCurrentNota(ptime) {
  let place = ptime * totalPlace;
  let index = 0;
  while (place > notas[index].duration) {
    place -= notas[index].duration;
    index ++;
  }
  return notas[index];
}

function click() {
  if (currentNota.note) {
    scoreElement.innerHTML ++;
    currentNota.note = false;
  }
}

let currentNota;

function draw(time) {
  clear();
  drawRows();
  drawNotes();
  drawDot(0.8, 0.1, 0.75);
  currentNota = getCurrentNota(time / totalTime);
  drawSlider(time / totalTime);
}

let startTime;

function dibujar(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  draw(timestamp - startTime);
  window.requestAnimationFrame(dibujar);
}

dibujar();
