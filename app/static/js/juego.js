let slate = document.getElementById("screen");
let bpm = parseInt(document.getElementById("bpm").innerHTML);
let beatNote = parseInt(document.getElementById("beatNote").innerHTML);
let notes = JSON.parse(document.getElementById("notes").innerHTML);
let notas = notes.map(note => Object.assign({}, note));
let scoreElement = document.getElementById("score");
let livesElement = document.getElementById("lives");
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

let clickCooldown = 0;
let goodColorTime = 0;
let badColorTime = 0;

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
  if (goodColorTime > 0) {
    ctx.fillStyle = "#00ff00";
  }
  else if (badColorTime > 0){
    ctx.fillStyle = "#FF0000";
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
  if (clickCooldown <= 0){
    clickCooldown = 1;
    if (currentNota.note) {
      scoreElement.innerHTML ++;
      currentNota.note = false;
      goodColorTime = 3;
    }
    else {
      livesElement.innerHTML --;
      badColorTime = 3;
    }
  }
}

let currentNota;
let alreadyOn = false;

function draw(time) {
  clear();
  drawRows();
  drawNotes();
  drawDot(0.8, 0.1, 0.75);
  let ptime = time / totalTime;
  console.log(livesElement.innerHTML <= 0);
  if (ptime >= 1 || livesElement.innerHTML <= 0) {
    endGame();
  }
  currentNota = getCurrentNota(ptime);
  if (currentNota.note && !alreadyOn){
    metronomeOn();
    alreadyOn = true;
  }
  else if (!currentNota.note && alreadyOn){
    metronomeOff();
    alreadyOn = false;
  }
  drawSlider(ptime);
}

let startTime;
let requestID;

function dibujar(timestamp) {
  window.cancelAnimationFrame(requestID);
  if (startTime === undefined) {
    startTime = timestamp;
  }
  if (clickCooldown > 0){
    clickCooldown--;
  }
  if (goodColorTime > 0){
    goodColorTime--;
  }
  if (badColorTime > 0){
    badColorTime--;
  }
  time = timestamp - startTime;
  draw(time);
  let ptime = time / totalTime;
  if (!(ptime >= 1 || livesElement.innerHTML <= 0))
    requestID = window.requestAnimationFrame(dibujar);
}

function stopIt(){
  window.cancelAnimationFrame(requestID);
  console.log("stopping animation");
}

function endGame() {
  window.cancelAnimationFrame(requestID);
  window.location.replace("/endgame/" + scoreElement.innerHTML + "/" + livesElement.innerHTML);
}

slate.addEventListener("click", click);

setTimeout(function(){
  clear();
  drawRows();
  drawNotes();
  drawDot(0.8, 0.1, 0.75);
},1);

setTimeout(function(){
  tiem = document.getElementById("timer")
  tiem.innerHTML--;
},200);

setTimeout(function(){
  tiem = document.getElementById("timer")
  tiem.innerHTML--;
},400);

setTimeout(function(){
  tiem = document.getElementById("timer")
  tiem.innerHTML--;
},600);
setTimeout(function(){
  tiem = document.getElementById("timer")
  tiem.innerHTML--;
},800);

setTimeout(function(){
  tiem = document.getElementById("timer")
  tiem.innerHTML--;
},100);

setTimeout(function(){
  // metronomeOn();
  dibujar();
},1000);


// Defaults
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var timer, noteCount;
var curTime = 0.0;

// scheduler, run every .1 milliseconds
function schedule() {
	// console.log("Tempo: " + tempo)
	// console.log("Bpm: " + bpm)
  while(curTime < context.currentTime) {
		// playNote(curTime);
    playNote(context.currentTime);
		updateTime();
	}
}

// Adds a beat worth to time and increase note count
function updateTime() {
	// seconds per beat
	var spb = bpm * 1000;
  curTime += spb;
  noteCount+=10;
}

// Plays note starting at time t
function playNote(t) {
	var note = context.createOscillator();
  // sets noteCount to 0 when end of
  // measure reached
  if (noteCount >= 1) {
    noteCount = 0;
  }
	// if first note in measure, plays
  // higher frequency
  if (noteCount == 0) {
    note.frequency.value = 392.00;
    console.log("starting measure");
  }
	// else plays lower frequency
	else {
  	note.frequency.value = 261.63;
    console.log("other note");
  }
  // connects oscillator for notes
  // to destination for audio context
  note.connect(context.destination);
  console.log("noteCount = " + noteCount);
  console.log("playing note");
  // plays frequency of oscilator for 0.05
  // seconds
  note.start(t);
  note.stop(t + 0.05);
}

// starts metronome by setting interval for
// schedule,, setting the current time in
// program and setting the noteCount to 0
// tempo gives beats per minute
// bpm gives beats per measure
function metronomeOn() {
	console.log("starting");
  noteCount = 0;
  curTime = context.currentTime;
  timer = setInterval(schedule, .01);
}

// stops metronome by clearing interval
function metronomeOff() {
  console.log("stopping");
  // console.log(timer);
  timer = clearInterval(timer);
  // console.log(timer);
}
