// Doink!
// SoftDev pd1
// P02

// let loginClick = function(){
//   display("Error");
// }

let instructions ="Register an account then login in. You will be able to see your username and the high score you've gotten. (Which should be a 0 if you haven't started). More instructions on the home page.";

let displayInstruction = function(){
  console.log("Button pressed");
  display(instructions)
}

let display = function(n){
  let text = document.getElementById("instruction");
  text.innerHTML = n;
}

let login = document.getElementById("instruction");
login.addEventListener('click', displayInstruction);
