// Defaults
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var timer, noteCount;
var curTime = 0.0;

// will be recieved from user
// beats per measure
var bpm = 4;
var tempo = 100;
// seconds per beat
var spb = 60 / tempo;

//Scheduler
	function schedule() {
		while(curTime < context.currentTime + 0.1) {
			playNote(curTime);
			updateTime();
		}

	}

  // Adds a beat worth to time and increase note count
  	function updateTime() {
  		curTime += spb;
  		noteCount++;
  	}

    // Play note on a delayed interval of t
    	function playNote(t) {
    		var note = context.createOscillator();

        // fix
    		if(noteCount == bpm) {
          noteCount = 0;
          note.frequency.value = 392.00;
          console.log("starting measure");
        } else {
    			note.frequency.value = 261.63;
    		}

    		note.connect(context.destination);

        console.log("playing note");
    		note.start(t);
    		note.stop(t + 0.05);

    	}

    function metronomeOn() {
      console.log("starting");
      curTime = context.currentTime;
      timer = setInterval(schedule, .1);
    }

    function metronomeOff() {
      console.log("stopping");
      // console.log(timer);
      timer = clearInterval(timer);
      // console.log(timer);
    }
