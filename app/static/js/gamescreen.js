let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
let tau = Math.PI * 2;
let tilt = - Math.PI / 8;

let height = canvas.height;
let width = canvas.width;
let bottomRoom = height / 10;
let score = document.getElementById("score");
let lives = document.getElementById("lives");

let tempoTop = document.getElementById("upper");
let tempoBot = document.getElementById("lower");
let tempo = tempoTop.innerHTML / tempoBot.innerHTML;

let printScore = function(){
  let s = score.innerHTML;
  console.log(s);
}
let printLives = function(){
  let l = lives.innerHTML;
  console.log(l);
}

let roomError = 20;
let currentTime;
let maxTime = width;

let newAni;
let badAni;
let cooldown;
let cooldownPeriod = 40;
var requestID;

let tempList = [200, 400, 600, 800];

let createNotes = function(){
  let number = (width - 100) / tempo;
  number /= 4;
  let list = [];
  for (let i = 50; i <= width - 50; i += number){
    list.push(i);
  }
  return list;
}

let listNotes = createNotes();

let inRange = function(time){
  return roomError > Math.abs(time - currentTime);
}

let stopIt = () => {
  console.log("stopIt invoked...")
  window.cancelAnimationFrame(requestID);
};

let printQuarterNote = function(xcoord){
  let ycoord = height - bottomRoom;
  ctx.beginPath();
  ctx.ellipse(xcoord, ycoord, 10, 8, tilt, 0, tau);
  ctx.fill();
  ctx.fillRect(xcoord + 8, ycoord + 2, 1.5, -50);
}

let react = function(e){
  console.log("registered click at time: " + currentTime);
  if (!(cooldown > 0)){
    console.log("off cooldown on : " + currentTime);
    let possible = false;
    for (let i = 0; i < listNotes.length; i++){
      if (inRange(listNotes[i])){
        possible = true;
      }
    }
    if (possible){
      console.log("good click at : " + currentTime);
      score.innerHTML++;
      newAni = cooldownPeriod;
    }
    else{
      console.log("bad click at : " + currentTime);
      lives.innerHTML--;
      badAni = cooldownPeriod;
    }
    cooldown = cooldownPeriod;
  }
}

let drawCircle = function(e){
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, e.offsetX + 2, e.offsetY + 2);
  ctx.strokeStyle = "green";
  ctx.stroke();
} //useless currently

let drawBack = function(){
  drawHorizontal(height - bottomRoom)
  drawNotes()
}

let drawHorizontal = function(ycoord){
  ctx.beginPath();
  ctx.moveTo(0, ycoord);
  ctx.lineTo(width, ycoord);
  ctx.strokeStyle = "black";
  ctx.stroke();
}
//draws horizontal line at the y coordinate

let drawNotes = function(){
  for (let i = 0; i < listNotes.length; i++){
    printQuarterNote(listNotes[i]);
  }
}

let drawSlider = function(time){
  ctx.beginPath()
  coordx = time;
  ctx.moveTo(coordx, 0);
  ctx.lineTo(coordx, width - bottomRoom);
  ctx.stroke();
}

let printCooldown = function(){
  console.log(cooldown);
}

let animateLines = function(){
  window.cancelAnimationFrame(requestID);
  if (currentTime >= maxTime || lives.innerHTML <= 0){
    endGame();
    // break;
  }
  wipeCanvas();
  if (currentTime == undefined || currentTime >= maxTime)
    currentTime = 0;
  currentTime++;
  drawBack();
  if (newAni > 0){
    newAni--;
    ctx.strokeStyle = "green";
  }
  else if (badAni > 0){
    badAni--;
    ctx.strokeStyle = "red";
  }
  else {
    ctx.strokeStyle = "black";
  }
  drawSlider(currentTime);
  cooldown--;
  if (!(currentTime >= maxTime || lives.innerHTML <= 0))
    requestID = window.requestAnimationFrame(animateLines);
}

let endGame = function(){
  window.location.replace("/endgame/" + score.innerHTML + "/" + lives.innerHTML);
  stopIt();
}

let wipeCanvas = function(e){
  // console.log("clear invoked...")
  ctx.clearRect(0, 0, width, height);
};

canvas.addEventListener("click", react);
let end = document.getElementById("end");
end.addEventListener('click', endGame);
