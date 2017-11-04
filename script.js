var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


    context.fillRect(200, 200, 50, 50);

    // Init 
    var osc = new Tone.Oscillator(440, "sine").toMaster().start();

    $(document).on('mousemove', function(event) {
      var x = event.pageX;
      console.log('event', x);
      osc.frequency.value = x;
      //the ration between the bpm and the frequency will be maintained

    });
