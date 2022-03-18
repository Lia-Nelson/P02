let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscList = [];
let mainGainNode = null;

let keyboard = document.querySelector(".keyboard");
let wavePicker = document.querySelector("select[name='waveform']");
let volumeControl = document.querySelector("input[name='volume']");
