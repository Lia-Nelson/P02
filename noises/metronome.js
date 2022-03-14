// Defaults
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var timer, noteCount;
var curTime = 0.0;

// will be recieved from user
// beats per measure
var bpm = 4;
// tempo
var tempo = 100;

// seconds per beat
var spb = 60 / tempo;

// scheduler, run every .1 milliseconds
	function schedule() {
    while(curTime < context.currentTime) {
			// playNote(curTime);
      playNote(context.currentTime);
			updateTime();
		}

	}

  // Adds a beat worth to time and increase note count
  	function updateTime() {
  		curTime += spb;
  		noteCount++;
  	}

    // Plays note starting at time t
    	function playNote(t) {
    		var note = context.createOscillator();

        // sets noteCount to 0 when end of
        // measure reached
    		if (noteCount == bpm) {
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
    function metronomeOn() {
      console.log("starting");
      noteCount = 0;
      curTime = context.currentTime;
      timer = setInterval(schedule, .1);
    }

    // stops metronome by clearing interval
    function metronomeOff() {
      console.log("stopping");
      // console.log(timer);
      timer = clearInterval(timer);
      // console.log(timer);
    }
